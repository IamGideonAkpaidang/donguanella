
The user reports the admin dashboard isn't functional for creating/updating courses. Let me investigate.

Looking at the current state:
- `AdminDashboard.tsx` exists but I need to check what it does
- RLS policies for `courses` table look correct (admin can insert/update via `has_role`)
- The `handle_new_user` trigger assigns 'student' role by default — so there's NO admin user yet
- The user likely registered but has no admin role assigned

Let me check AdminDashboard.tsx to confirm course CRUD exists.
