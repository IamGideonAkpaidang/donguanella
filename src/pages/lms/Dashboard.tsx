import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Video, Award, LogOut, Settings, ExternalLink } from "lucide-react";

const Dashboard = () => {
  const { user, profile, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/lms/login");
  }, [loading, user, navigate]);

  const { data: enrollments } = useQuery({
    queryKey: ["my-enrollments", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*, courses(*)")
        .eq("user_id", user!.id)
        .order("enrolled_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: certificates } = useQuery({
    queryKey: ["my-certificates", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*, courses(title)")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data;
    },
  });

  const { data: upcomingLessons } = useQuery({
    queryKey: ["upcoming-lessons", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      // Get lessons from enrolled courses
      const { data: enrolledCourseIds } = await supabase
        .from("enrollments")
        .select("course_id")
        .eq("user_id", user!.id)
        .in("status", ["active"]);

      if (!enrolledCourseIds?.length) return [];

      const courseIds = enrolledCourseIds.map((e) => e.course_id);
      const { data: modules } = await supabase
        .from("modules")
        .select("id")
        .in("course_id", courseIds);

      if (!modules?.length) return [];

      const moduleIds = modules.map((m) => m.id);
      const { data, error } = await supabase
        .from("lessons")
        .select("*, modules!inner(title, courses(title))")
        .in("module_id", moduleIds)
        .gte("scheduled_at", new Date().toISOString())
        .order("scheduled_at", { ascending: true })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-warm">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-serif text-xl font-bold">Don Guannella</Link>
            <span className="text-primary-foreground/50">|</span>
            <span className="text-sm text-primary-foreground/70">Learning Portal</span>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/lms/admin"><Settings size={16} /> Admin</Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut size={16} /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}!
          </h1>
          <p className="text-muted-foreground mt-1">Here's your learning overview.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">{enrollments?.filter((e) => e.status === "active").length || 0}</p>
              <p className="text-xs text-muted-foreground">Active Courses</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <Calendar className="mx-auto h-8 w-8 text-secondary mb-2" />
              <p className="text-2xl font-bold">{upcomingLessons?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Upcoming Classes</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <Award className="mx-auto h-8 w-8 text-accent mb-2" />
              <p className="text-2xl font-bold">{certificates?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Certificates</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-2xl font-bold">{enrollments?.filter((e) => e.status === "completed").length || 0}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-xl font-semibold mb-4">My Courses</h2>
            {enrollments?.length === 0 ? (
              <Card className="border-border/50 p-8 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
                <Button asChild className="mt-4"><Link to="/lms/courses">Browse Courses</Link></Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {enrollments?.map((enrollment) => (
                  <Card key={enrollment.id} className="border-border/50">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                        <BookOpen className="h-8 w-8 text-primary-foreground/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{enrollment.courses?.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={enrollment.status === "active" ? "default" : enrollment.status === "completed" ? "secondary" : "outline"} className="text-xs">
                            {enrollment.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/lms/courses/${enrollment.courses?.slug}`}>View</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Lessons */}
            <div>
              <h2 className="font-serif text-xl font-semibold mb-4">Upcoming Classes</h2>
              {!upcomingLessons?.length ? (
                <Card className="border-border/50 p-6 text-center">
                  <p className="text-sm text-muted-foreground">No upcoming classes</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {upcomingLessons.map((lesson) => (
                    <Card key={lesson.id} className="border-border/50">
                      <CardContent className="p-3">
                        <p className="font-medium text-sm">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {lesson.scheduled_at && new Date(lesson.scheduled_at).toLocaleString()}
                        </p>
                        {lesson.zoom_link && (
                          <a
                            href={lesson.zoom_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
                          >
                            <ExternalLink size={12} /> Join on Zoom
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Certificates */}
            {certificates && certificates.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-semibold mb-4">My Certificates</h2>
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <Card key={cert.id} className="border-border/50">
                      <CardContent className="p-3 flex items-center gap-3">
                        <Award className="h-8 w-8 text-secondary shrink-0" />
                        <div>
                          <p className="font-medium text-sm">{cert.courses?.title}</p>
                          <p className="text-xs text-muted-foreground">#{cert.certificate_number}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <Button asChild variant="outline" className="w-full">
              <Link to="/lms/courses">Browse More Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
