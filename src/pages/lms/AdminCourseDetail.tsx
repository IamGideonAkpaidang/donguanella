import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Plus, Pencil, Trash2, GripVertical, Video } from "lucide-react";

const AdminCourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && !isAdmin) navigate("/lms/dashboard");
  }, [loading, isAdmin, navigate]);

  const { data: course } = useQuery({
    queryKey: ["admin-course", courseId],
    enabled: !!courseId && isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").eq("id", courseId).single();
      if (error) throw error;
      return data;
    },
  });

  const { data: modules } = useQuery({
    queryKey: ["admin-modules", courseId],
    enabled: !!courseId && isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("modules")
        .select("*, lessons(*)")
        .eq("course_id", courseId!)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  // Module form
  const [moduleDialog, setModuleDialog] = useState(false);
  const [editModule, setEditModule] = useState<any>(null);
  const [moduleForm, setModuleForm] = useState({ title: "", description: "" });

  const saveModule = useMutation({
    mutationFn: async () => {
      if (editModule) {
        const { error } = await supabase.from("modules").update({
          title: moduleForm.title, description: moduleForm.description || null,
        }).eq("id", editModule.id);
        if (error) throw error;
      } else {
        const maxOrder = modules?.reduce((max, m) => Math.max(max, m.sort_order), -1) ?? -1;
        const { error } = await supabase.from("modules").insert({
          course_id: courseId!, title: moduleForm.title,
          description: moduleForm.description || null, sort_order: maxOrder + 1,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-modules", courseId] });
      setModuleDialog(false);
      toast({ title: editModule ? "Module updated" : "Module added" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  // Lesson form
  const [lessonDialog, setLessonDialog] = useState(false);
  const [editLesson, setEditLesson] = useState<any>(null);
  const [lessonModuleId, setLessonModuleId] = useState("");
  const [lessonForm, setLessonForm] = useState({
    title: "", description: "", zoom_link: "", scheduled_at: "", duration_minutes: "60", recording_url: "",
  });

  const saveLesson = useMutation({
    mutationFn: async () => {
      const payload = {
        title: lessonForm.title,
        description: lessonForm.description || null,
        zoom_link: lessonForm.zoom_link || null,
        scheduled_at: lessonForm.scheduled_at || null,
        duration_minutes: parseInt(lessonForm.duration_minutes) || 60,
        recording_url: lessonForm.recording_url || null,
      };

      if (editLesson) {
        const { error } = await supabase.from("lessons").update(payload).eq("id", editLesson.id);
        if (error) throw error;
      } else {
        const mod = modules?.find((m) => m.id === lessonModuleId);
        const maxOrder = mod?.lessons?.reduce((max: number, l: any) => Math.max(max, l.sort_order), -1) ?? -1;
        const { error } = await supabase.from("lessons").insert({
          ...payload, module_id: lessonModuleId, sort_order: maxOrder + 1,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-modules", courseId] });
      setLessonDialog(false);
      toast({ title: editLesson ? "Lesson updated" : "Lesson added" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteModule = async (id: string) => {
    if (!confirm("Delete this module and all its lessons?")) return;
    await supabase.from("modules").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["admin-modules", courseId] });
  };

  const deleteLesson = async (id: string) => {
    if (!confirm("Delete this lesson?")) return;
    await supabase.from("lessons").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["admin-modules", courseId] });
  };

  if (loading || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!course) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-4">
          <Link to="/lms/admin" className="flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground">
            <ChevronLeft size={16} /> Back to Admin
          </Link>
          <h1 className="font-serif text-xl font-bold mt-2">{course.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-xl font-semibold">Modules & Lessons</h2>
          <Button onClick={() => { setEditModule(null); setModuleForm({ title: "", description: "" }); setModuleDialog(true); }}>
            <Plus size={14} /> Add Module
          </Button>
        </div>

        <div className="space-y-6">
          {modules?.map((mod) => (
            <Card key={mod.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{mod.title}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      setEditModule(mod);
                      setModuleForm({ title: mod.title, description: mod.description || "" });
                      setModuleDialog(true);
                    }}><Pencil size={12} /></Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      setEditLesson(null);
                      setLessonModuleId(mod.id);
                      setLessonForm({ title: "", description: "", zoom_link: "", scheduled_at: "", duration_minutes: "60", recording_url: "" });
                      setLessonDialog(true);
                    }}><Plus size={12} /> Lesson</Button>
                    <Button variant="outline" size="sm" onClick={() => deleteModule(mod.id)} className="text-destructive hover:text-destructive">
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>

                {mod.lessons && mod.lessons.length > 0 && (
                  <div className="space-y-2 ml-4">
                    {mod.lessons
                      .sort((a: any, b: any) => a.sort_order - b.sort_order)
                      .map((lesson: any) => (
                        <div key={lesson.id} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Video size={14} className="text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{lesson.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {lesson.scheduled_at ? new Date(lesson.scheduled_at).toLocaleString() : "Not scheduled"}
                                {lesson.duration_minutes && ` • ${lesson.duration_minutes} min`}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => {
                              setEditLesson(lesson);
                              setLessonModuleId(mod.id);
                              setLessonForm({
                                title: lesson.title, description: lesson.description || "",
                                zoom_link: lesson.zoom_link || "",
                                scheduled_at: lesson.scheduled_at ? lesson.scheduled_at.slice(0, 16) : "",
                                duration_minutes: String(lesson.duration_minutes || 60),
                                recording_url: lesson.recording_url || "",
                              });
                              setLessonDialog(true);
                            }}><Pencil size={12} /></Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteLesson(lesson.id)} className="text-destructive hover:text-destructive">
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Module Dialog */}
      <Dialog open={moduleDialog} onOpenChange={setModuleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editModule ? "Edit Module" : "Add Module"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={moduleForm.title} onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={moduleForm.description} onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })} />
            </div>
            <Button onClick={() => saveModule.mutate()} disabled={!moduleForm.title || saveModule.isPending} className="w-full">
              {saveModule.isPending ? "Saving..." : editModule ? "Update" : "Add Module"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lesson Dialog */}
      <Dialog open={lessonDialog} onOpenChange={setLessonDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editLesson ? "Edit Lesson" : "Add Lesson"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={lessonForm.description} onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Zoom Link</Label>
              <Input value={lessonForm.zoom_link} onChange={(e) => setLessonForm({ ...lessonForm, zoom_link: e.target.value })} placeholder="https://zoom.us/j/..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Scheduled At</Label>
                <Input type="datetime-local" value={lessonForm.scheduled_at} onChange={(e) => setLessonForm({ ...lessonForm, scheduled_at: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Duration (min)</Label>
                <Input type="number" value={lessonForm.duration_minutes} onChange={(e) => setLessonForm({ ...lessonForm, duration_minutes: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Recording URL (after class)</Label>
              <Input value={lessonForm.recording_url} onChange={(e) => setLessonForm({ ...lessonForm, recording_url: e.target.value })} placeholder="https://..." />
            </div>
            <Button onClick={() => saveLesson.mutate()} disabled={!lessonForm.title || saveLesson.isPending} className="w-full">
              {saveLesson.isPending ? "Saving..." : editLesson ? "Update" : "Add Lesson"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourseDetail;
