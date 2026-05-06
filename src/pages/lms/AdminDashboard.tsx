import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen, Users, CreditCard, Award, Plus, Pencil, Trash2, LogOut, Eye,
  Settings, LayoutDashboard, ChevronLeft,
} from "lucide-react";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/lms/dashboard");
  }, [loading, user, isAdmin, navigate]);

  // ---- DATA ----
  const { data: courses } = useQuery({
    queryKey: ["admin-courses"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Helper to attach profile info (no FK between these tables and profiles)
  const attachProfiles = async <T extends { user_id: string }>(rows: T[]) => {
    const userIds = Array.from(new Set(rows.map((r) => r.user_id)));
    if (userIds.length === 0) return rows.map((r) => ({ ...r, profiles: null }));
    const { data: profs } = await supabase
      .from("profiles")
      .select("user_id, full_name, email")
      .in("user_id", userIds);
    const map = new Map((profs || []).map((p) => [p.user_id, p]));
    return rows.map((r) => ({ ...r, profiles: map.get(r.user_id) || null }));
  };

  const { data: enrollments } = useQuery({
    queryKey: ["admin-enrollments"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*, courses(title)")
        .order("enrolled_at", { ascending: false });
      if (error) throw error;
      return attachProfiles(data || []);
    },
  });

  const { data: payments } = useQuery({
    queryKey: ["admin-payments"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*, courses(title)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return attachProfiles(data || []);
    },
  });

  const { data: certificates } = useQuery({
    queryKey: ["admin-certificates"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*, courses(title)")
        .order("issued_at", { ascending: false });
      if (error) throw error;
      return attachProfiles(data || []);
    },
  });

  // ---- COURSE FORM ----
  const [courseDialog, setCourseDialog] = useState(false);
  const [editCourse, setEditCourse] = useState<any>(null);
  const [courseForm, setCourseForm] = useState({
    title: "", slug: "", description: "", short_description: "", price: "0",
    currency: "NGN", duration_weeks: "", start_date: "", end_date: "",
    max_students: "", is_published: false, thumbnail_url: "",
  });

  const openNewCourse = () => {
    setEditCourse(null);
    setCourseForm({
      title: "", slug: "", description: "", short_description: "", price: "0",
      currency: "NGN", duration_weeks: "", start_date: "", end_date: "",
      max_students: "", is_published: false, thumbnail_url: "",
    });
    setCourseDialog(true);
  };

  const openEditCourse = (c: any) => {
    setEditCourse(c);
    setCourseForm({
      title: c.title, slug: c.slug, description: c.description || "",
      short_description: c.short_description || "", price: String(c.price),
      currency: c.currency, duration_weeks: c.duration_weeks ? String(c.duration_weeks) : "",
      start_date: c.start_date || "", end_date: c.end_date || "",
      max_students: c.max_students ? String(c.max_students) : "",
      is_published: c.is_published, thumbnail_url: c.thumbnail_url || "",
    });
    setCourseDialog(true);
  };

  const saveCourse = useMutation({
    mutationFn: async () => {
      const payload = {
        title: courseForm.title,
        slug: courseForm.slug || courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: courseForm.description || null,
        short_description: courseForm.short_description || null,
        price: parseFloat(courseForm.price) || 0,
        currency: courseForm.currency,
        duration_weeks: courseForm.duration_weeks ? parseInt(courseForm.duration_weeks) : null,
        start_date: courseForm.start_date || null,
        end_date: courseForm.end_date || null,
        max_students: courseForm.max_students ? parseInt(courseForm.max_students) : null,
        is_published: courseForm.is_published,
        thumbnail_url: courseForm.thumbnail_url || null,
      };

      if (editCourse) {
        const { error } = await supabase.from("courses").update(payload).eq("id", editCourse.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("courses").insert({ ...payload, created_by: user!.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      setCourseDialog(false);
      toast({ title: editCourse ? "Course updated" : "Course created" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteCourse = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await supabase.from("courses").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    toast({ title: "Course deleted" });
  };

  // ---- CERTIFICATE ISSUING ----
  const [certDialog, setCertDialog] = useState(false);
  const [certForm, setCertForm] = useState({ user_id: "", course_id: "", enrollment_id: "" });

  const issueCertificate = useMutation({
    mutationFn: async () => {
      const certNumber = `DNG-CERT-${Date.now().toString(36).toUpperCase()}`;
      const { error } = await supabase.from("certificates").insert({
        user_id: certForm.user_id,
        course_id: certForm.course_id,
        enrollment_id: certForm.enrollment_id || null,
        certificate_number: certNumber,
        issued_by: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      setCertDialog(false);
      toast({ title: "Certificate issued!" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  // Stats
  const totalRevenue = payments?.filter((p) => p.status === "success").reduce((a, p) => a + Number(p.amount), 0) || 0;
  const activeStudents = enrollments?.filter((e) => e.status === "active").length || 0;

  if (loading || !user || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/lms/dashboard" className="flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground">
              <ChevronLeft size={16} /> Dashboard
            </Link>
            <span className="text-primary-foreground/30">|</span>
            <span className="font-serif font-bold">Admin Panel</span>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <LogOut size={16} />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="p-4 text-center">
            <BookOpen className="mx-auto h-6 w-6 text-primary mb-1" />
            <p className="text-xl font-bold">{courses?.length || 0}</p>
            <p className="text-xs text-muted-foreground">Courses</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <Users className="mx-auto h-6 w-6 text-accent mb-1" />
            <p className="text-xl font-bold">{activeStudents}</p>
            <p className="text-xs text-muted-foreground">Active Students</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <CreditCard className="mx-auto h-6 w-6 text-secondary mb-1" />
            <p className="text-xl font-bold">₦{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <Award className="mx-auto h-6 w-6 text-primary mb-1" />
            <p className="text-xl font-bold">{certificates?.length || 0}</p>
            <p className="text-xs text-muted-foreground">Certificates</p>
          </CardContent></Card>
        </div>

        <Tabs defaultValue="courses">
          <TabsList className="mb-6">
            <TabsTrigger value="courses"><BookOpen size={14} className="mr-1" /> Courses</TabsTrigger>
            <TabsTrigger value="students"><Users size={14} className="mr-1" /> Students</TabsTrigger>
            <TabsTrigger value="payments"><CreditCard size={14} className="mr-1" /> Payments</TabsTrigger>
            <TabsTrigger value="certificates"><Award size={14} className="mr-1" /> Certificates</TabsTrigger>
          </TabsList>

          {/* COURSES TAB */}
          <TabsContent value="courses">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-xl font-semibold">Manage Courses</h2>
              <Button onClick={openNewCourse}><Plus size={14} /> New Course</Button>
            </div>
            <div className="space-y-3">
              {courses?.map((c) => (
                <Card key={c.id} className="border-border/50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{c.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={c.is_published ? "default" : "outline"}>
                          {c.is_published ? "Published" : "Draft"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {c.currency} {Number(c.price).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditCourse(c)}>
                        <Pencil size={14} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/lms/admin/courses/${c.id}`)}>
                        <Eye size={14} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteCourse(c.id)} className="text-destructive hover:text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* STUDENTS TAB */}
          <TabsContent value="students">
            <h2 className="font-serif text-xl font-semibold mb-4">Enrolled Students</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2">Student</th>
                    <th className="pb-2">Course</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Enrolled</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments?.map((e) => (
                    <tr key={e.id} className="border-b border-border/30">
                      <td className="py-3">
                        <p className="font-medium">{(e as any).profiles?.full_name}</p>
                        <p className="text-xs text-muted-foreground">{(e as any).profiles?.email}</p>
                      </td>
                      <td className="py-3">{e.courses?.title}</td>
                      <td className="py-3">
                        <Badge variant={e.status === "active" ? "default" : "outline"}>{e.status}</Badge>
                      </td>
                      <td className="py-3 text-muted-foreground">{new Date(e.enrolled_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* PAYMENTS TAB */}
          <TabsContent value="payments">
            <h2 className="font-serif text-xl font-semibold mb-4">Payment History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2">Student</th>
                    <th className="pb-2">Course</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Reference</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments?.map((p) => (
                    <tr key={p.id} className="border-b border-border/30">
                      <td className="py-3">
                        <p className="font-medium">{(p as any).profiles?.full_name}</p>
                      </td>
                      <td className="py-3">{p.courses?.title}</td>
                      <td className="py-3 font-medium">{p.currency} {Number(p.amount).toLocaleString()}</td>
                      <td className="py-3">
                        <Badge variant={p.status === "success" ? "default" : p.status === "failed" ? "destructive" : "outline"}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground font-mono">{p.paystack_reference}</td>
                      <td className="py-3 text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* CERTIFICATES TAB */}
          <TabsContent value="certificates">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-xl font-semibold">Certificates</h2>
              <Dialog open={certDialog} onOpenChange={setCertDialog}>
                <DialogTrigger asChild>
                  <Button><Plus size={14} /> Issue Certificate</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Issue Certificate</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Select Student (from enrollments)</Label>
                      <select
                        className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={`${certForm.user_id}|${certForm.course_id}|${certForm.enrollment_id}`}
                        onChange={(e) => {
                          const [uid, cid, eid] = e.target.value.split("|");
                          setCertForm({ user_id: uid, course_id: cid, enrollment_id: eid });
                        }}
                      >
                        <option value="||">Select an enrollment...</option>
                        {enrollments
                          ?.filter((e) => e.status === "active" || e.status === "completed")
                          .map((e) => (
                            <option key={e.id} value={`${e.user_id}|${e.course_id}|${e.id}`}>
                              {(e as any).profiles?.full_name} — {e.courses?.title}
                            </option>
                          ))}
                      </select>
                    </div>
                    <Button
                      onClick={() => issueCertificate.mutate()}
                      disabled={!certForm.user_id || issueCertificate.isPending}
                      className="w-full"
                    >
                      {issueCertificate.isPending ? "Issuing..." : "Issue Certificate"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2">Student</th>
                    <th className="pb-2">Course</th>
                    <th className="pb-2">Certificate #</th>
                    <th className="pb-2">Issued</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates?.map((c) => (
                    <tr key={c.id} className="border-b border-border/30">
                      <td className="py-3 font-medium">{(c as any).profiles?.full_name}</td>
                      <td className="py-3">{c.courses?.title}</td>
                      <td className="py-3 font-mono text-xs">{c.certificate_number}</td>
                      <td className="py-3 text-muted-foreground">{new Date(c.issued_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* COURSE DIALOG */}
      <Dialog open={courseDialog} onOpenChange={setCourseDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editCourse ? "Edit Course" : "Create Course"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={courseForm.slug}
                onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                placeholder="auto-generated from title"
              />
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Input value={courseForm.short_description} onChange={(e) => setCourseForm({ ...courseForm, short_description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Full Description</Label>
              <Textarea value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="number" value={courseForm.price} onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Input value={courseForm.currency} onChange={(e) => setCourseForm({ ...courseForm, currency: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (weeks)</Label>
                <Input type="number" value={courseForm.duration_weeks} onChange={(e) => setCourseForm({ ...courseForm, duration_weeks: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Max Students</Label>
                <Input type="number" value={courseForm.max_students} onChange={(e) => setCourseForm({ ...courseForm, max_students: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" value={courseForm.start_date} onChange={(e) => setCourseForm({ ...courseForm, start_date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" value={courseForm.end_date} onChange={(e) => setCourseForm({ ...courseForm, end_date: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Thumbnail URL</Label>
              <Input value={courseForm.thumbnail_url} onChange={(e) => setCourseForm({ ...courseForm, thumbnail_url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={courseForm.is_published} onCheckedChange={(v) => setCourseForm({ ...courseForm, is_published: v })} />
              <Label>Published</Label>
            </div>
            <Button onClick={() => saveCourse.mutate()} disabled={!courseForm.title || saveCourse.isPending} className="w-full">
              {saveCourse.isPending ? "Saving..." : editCourse ? "Update Course" : "Create Course"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
