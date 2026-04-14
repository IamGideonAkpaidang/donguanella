import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Shield, CheckCircle } from "lucide-react";

const Payment = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/lms/login");
  }, [authLoading, user, navigate]);

  const { data: course } = useQuery({
    queryKey: ["course-payment", courseId],
    enabled: !!courseId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handlePayment = async () => {
    if (!user || !course) return;
    setPaying(true);

    try {
      // Create enrollment (pending)
      const { data: enrollment, error: enrollError } = await supabase
        .from("enrollments")
        .insert({
          user_id: user.id,
          course_id: course.id,
          status: "pending",
        })
        .select()
        .single();

      if (enrollError) throw enrollError;

      // Create payment record
      const reference = `DNG-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const { error: payError } = await supabase.from("payments").insert({
        user_id: user.id,
        course_id: course.id,
        enrollment_id: enrollment.id,
        amount: Number(course.price),
        currency: course.currency,
        paystack_reference: reference,
        status: "pending",
      });

      if (payError) throw payError;

      // Initialize Paystack payment
      const { data: paystackData, error: paystackError } = await supabase.functions.invoke(
        "paystack-initialize",
        {
          body: {
            email: user.email,
            amount: Number(course.price) * 100, // kobo
            reference,
            metadata: {
              course_id: course.id,
              enrollment_id: enrollment.id,
              user_id: user.id,
              course_title: course.title,
            },
            callback_url: `${window.location.origin}/lms/payment/verify?reference=${reference}`,
          },
        }
      );

      if (paystackError) throw paystackError;

      if (paystackData?.data?.authorization_url) {
        window.location.href = paystackData.data.authorization_url;
      } else {
        throw new Error("Could not initialize payment");
      }
    } catch (error: any) {
      toast({
        title: "Payment failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      setPaying(false);
    }
  };

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-2xl font-bold text-primary">Donguanella</Link>
        </div>
        <Card className="shadow-elegant border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-xl">Complete Enrollment</CardTitle>
            <CardDescription>Secure payment via Paystack</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium">{course.title}</h3>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">
                  {course.currency} {Number(course.price).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><CheckCircle size={12} className="text-accent" /> Instant access after payment</p>
              <p className="flex items-center gap-2"><CheckCircle size={12} className="text-accent" /> Live Zoom classes included</p>
              <p className="flex items-center gap-2"><CheckCircle size={12} className="text-accent" /> Certificate on completion</p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={paying}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              size="lg"
            >
              <CreditCard size={16} />
              {paying ? "Processing..." : `Pay ${course.currency} ${Number(course.price).toLocaleString()}`}
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Shield size={12} /> Secured by Paystack
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
