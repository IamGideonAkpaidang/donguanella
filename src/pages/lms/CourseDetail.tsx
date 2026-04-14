import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Clock, Calendar, Users, CheckCircle, ChevronDown, ChevronRight, Video } from "lucide-react";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [enrolling, setEnrolling] = useState(false);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: modules } = useQuery({
    queryKey: ["course-modules", course?.id],
    enabled: !!course?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("modules")
        .select("*, lessons(*)")
        .eq("course_id", course!.id)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: enrollment } = useQuery({
    queryKey: ["enrollment", course?.id, user?.id],
    enabled: !!course?.id && !!user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("enrollments")
        .select("*")
        .eq("course_id", course!.id)
        .eq("user_id", user!.id)
        .single();
      return data;
    },
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleEnrol = async () => {
    if (!user) {
      navigate("/lms/login");
      return;
    }
    if (!course) return;

    if (Number(course.price) === 0) {
      // Free course — enrol directly
      setEnrolling(true);
      const { error } = await supabase.from("enrollments").insert({
        user_id: user.id,
        course_id: course.id,
        status: "active",
      });
      setEnrolling(false);
      if (error) {
        toast({ title: "Enrollment failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Enrolled successfully!" });
        navigate("/lms/dashboard");
      }
    } else {
      // Paid course — redirect to payment
      navigate(`/lms/payment/${course.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 container mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-1/2" />
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 container mx-auto px-6 text-center">
          <h1 className="font-serif text-2xl">Course not found</h1>
          <Button asChild className="mt-4"><Link to="/lms/courses">Browse Courses</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const isEnrolled = enrollment?.status === "active" || enrollment?.status === "completed";
  const totalLessons = modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20">
        {/* Hero */}
        <div className="bg-gradient-primary text-primary-foreground py-16">
          <div className="container mx-auto px-6">
            <p className="label-style text-secondary mb-4">Course</p>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-primary-foreground/80 max-w-2xl mb-6">
              {course.short_description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/70">
              {course.duration_weeks && (
                <span className="flex items-center gap-1"><Clock size={14} /> {course.duration_weeks} weeks</span>
              )}
              {totalLessons > 0 && (
                <span className="flex items-center gap-1"><Video size={14} /> {totalLessons} lessons</span>
              )}
              {course.start_date && (
                <span className="flex items-center gap-1"><Calendar size={14} /> Starts {new Date(course.start_date).toLocaleDateString()}</span>
              )}
              {course.max_students && (
                <span className="flex items-center gap-1"><Users size={14} /> Max {course.max_students} students</span>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-12 grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {course.description && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">About This Course</h2>
                <p className="text-muted-foreground whitespace-pre-line">{course.description}</p>
              </div>
            )}

            {/* Modules */}
            {modules && modules.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">Course Curriculum</h2>
                <div className="space-y-3">
                  {modules.map((mod) => (
                    <Card key={mod.id} className="border-border/50">
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full text-left p-4 flex items-center justify-between hover:bg-muted/30 transition-colors rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {expandedModules.has(mod.id) ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                          <span className="font-medium">{mod.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {mod.lessons?.length || 0} lesson{(mod.lessons?.length || 0) !== 1 ? "s" : ""}
                        </span>
                      </button>
                      {expandedModules.has(mod.id) && mod.lessons && (
                        <div className="px-4 pb-4 space-y-2">
                          {mod.lessons
                            .sort((a, b) => a.sort_order - b.sort_order)
                            .map((lesson) => (
                              <div key={lesson.id} className="flex items-center gap-3 text-sm text-muted-foreground pl-8 py-1">
                                <Video size={14} className="shrink-0" />
                                <span>{lesson.title}</span>
                                {lesson.duration_minutes && (
                                  <span className="text-xs ml-auto">{lesson.duration_minutes} min</span>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-28 shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">
                  {Number(course.price) === 0 ? (
                    <span className="text-accent">Free</span>
                  ) : (
                    <span>{course.currency} {Number(course.price).toLocaleString()}</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEnrolled ? (
                  <>
                    <Badge className="bg-accent text-accent-foreground w-full justify-center py-2">
                      <CheckCircle size={14} className="mr-1" /> Enrolled
                    </Badge>
                    <Button asChild className="w-full">
                      <Link to="/lms/dashboard">Go to Dashboard</Link>
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleEnrol}
                    disabled={enrolling}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="lg"
                  >
                    <BookOpen size={16} />
                    {enrolling ? "Enrolling..." : Number(course.price) === 0 ? "Enrol for Free" : "Enrol Now"}
                  </Button>
                )}
                <div className="text-xs text-muted-foreground space-y-2">
                  <p className="flex items-center gap-2"><Video size={12} /> Live Zoom classes</p>
                  <p className="flex items-center gap-2"><CheckCircle size={12} /> Certificate on completion</p>
                  {course.duration_weeks && (
                    <p className="flex items-center gap-2"><Clock size={12} /> {course.duration_weeks} weeks program</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;
