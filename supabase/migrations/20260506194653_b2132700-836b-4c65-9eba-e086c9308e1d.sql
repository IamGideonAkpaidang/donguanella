
-- 1. Profiles: restrict SELECT to own profile + admins
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Certificates: remove public-read-all policy; add safe verification function
DROP POLICY IF EXISTS "Anyone can verify certificates" ON public.certificates;

CREATE OR REPLACE FUNCTION public.verify_certificate(_certificate_number text)
RETURNS TABLE (
  certificate_number text,
  issued_at timestamptz,
  course_title text,
  recipient_name text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.certificate_number,
    c.issued_at,
    co.title AS course_title,
    p.full_name AS recipient_name
  FROM public.certificates c
  LEFT JOIN public.courses co ON co.id = c.course_id
  LEFT JOIN public.profiles p ON p.user_id = c.user_id
  WHERE c.certificate_number = _certificate_number
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.verify_certificate(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_certificate(text) TO anon, authenticated;

-- 3. Enrollments: prevent users from self-granting active/completed status (allow active only for free courses)
DROP POLICY IF EXISTS "Users can create own enrollment" ON public.enrollments;

CREATE POLICY "Users can create own enrollment"
  ON public.enrollments FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND (
      status = 'pending'::enrollment_status
      OR (
        status = 'active'::enrollment_status
        AND EXISTS (
          SELECT 1 FROM public.courses
          WHERE id = course_id AND price = 0
        )
      )
    )
  );
