import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Courses = () => {
  const { user } = useAuth();
  const { data: courses, isLoading } = useQuery({
    queryKey: ["published-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-primary text-primary-foreground pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <p className="label-style text-secondary mb-4">Our Courses</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
            Explore Our Programs
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Enrol in our transformative courses designed to empower and build capacity.
            All classes are conducted via Zoom for maximum accessibility.
          </p>
        </div>
      </div>
      <div className="pt-16 pb-20">
        <div className="container mx-auto px-6">

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardContent className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : courses?.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4" />
              <h3 className="font-serif text-xl text-muted-foreground">No courses available yet</h3>
              <p className="text-muted-foreground/60 mt-2">Check back soon for new programs.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses?.map((course) => (
                <Card key={course.id} className="overflow-hidden hover-lift border-border/50">
                  <div className="h-48 bg-gradient-primary relative">
                    {course.thumbnail_url ? (
                      <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen className="h-16 w-16 text-primary-foreground/30" />
                      </div>
                    )}
                    <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                      {course.currency} {Number(course.price).toLocaleString()}
                    </Badge>
                  </div>
                  <CardHeader>
                    <h3 className="font-serif text-lg font-semibold line-clamp-2">{course.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.short_description || course.description}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {course.duration_weeks && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {course.duration_weeks} weeks
                        </span>
                      )}
                      {course.start_date && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> Starts {new Date(course.start_date).toLocaleDateString()}
                        </span>
                      )}
                      {course.max_students && (
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {course.max_students} spots
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to={`/lms/courses/${course.slug}`}>View Details & Enrol</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {!user && (
            <div className="text-center mt-16 glass rounded-3xl p-10 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl font-semibold mb-3">Ready to start learning?</h3>
              <p className="text-muted-foreground mb-6">
                Create a free account to enrol, track your progress, and earn certificates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/lms/register">Create Account</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/lms/login">Sign In</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
