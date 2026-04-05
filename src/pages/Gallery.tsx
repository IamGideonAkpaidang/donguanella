import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const categories = ["All", "Centres", "Children", "Activities", "Events"] as const;

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", title: "Learning Together", category: "Children", desc: "Children engaged in collaborative learning at our Owerri centre." },
  { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80", title: "Classroom Session", category: "Activities", desc: "An interactive classroom session focused on cognitive development." },
  { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80", title: "Nnebukwu Centre", category: "Centres", desc: "The Don Guanella Rehabilitation Centre, Nnebukwu — our first and largest facility." },
  { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", title: "Community Outreach", category: "Events", desc: "Annual community awareness event promoting inclusion and dignity." },
  { src: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=80", title: "Creative Arts Therapy", category: "Activities", desc: "Art-based therapy sessions that spark creativity and self-expression." },
  { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80", title: "Joyful Moments", category: "Children", desc: "Moments of pure joy during recreational time at our centres." },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80", title: "Abuja Centre", category: "Centres", desc: "Our Don Guanella Centre in the heart of Abuja, FCT." },
  { src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80", title: "Spiritual Formation", category: "Events", desc: "Chapel gathering for spiritual growth and communal prayer." },
  { src: "https://images.unsplash.com/photo-1587654780292-39c6c1b3583c?w=800&q=80", title: "Physical Therapy", category: "Activities", desc: "Guided physiotherapy sessions to improve mobility and motor skills." },
  { src: "https://images.unsplash.com/photo-1560541919-eb5c3a31b01c?w=800&q=80", title: "Ibadan Centre", category: "Centres", desc: "Don Guanella Centre, Ibadan — expanding our reach in South-West Nigeria." },
  { src: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80", title: "Outdoor Play", category: "Children", desc: "Children enjoying supervised outdoor play and social interaction." },
  { src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80", title: "Annual Conference", category: "Events", desc: "Training conference for caregivers and special education professionals." },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-primary overflow-hidden">
        <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-[5%] w-72 h-72 rounded-full bg-accent/8 blur-[100px]" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <span className="label-style text-secondary/80">Gallery</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mt-4 tracking-tight leading-[1.05]">
              Our <span className="text-gradient-gold">Impact</span> in Pictures
            </h1>
            <p className="text-lg text-primary-foreground/70 mt-6 leading-relaxed max-w-2xl">
              A glimpse into the lives we touch — moments of growth, joy, and transformation across our rehabilitation centres.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-border bg-background sticky top-[64px] z-30">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer hover-lift bg-card border border-border/50"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs font-semibold tracking-wider uppercase text-secondary">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-primary-foreground mt-1">{item.title}</h3>
                    <p className="text-sm text-primary-foreground/70 mt-1 line-clamp-2">{item.desc}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <ZoomIn className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border/50 rounded-2xl">
          {selectedImage && (
            <div>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain bg-foreground/5"
              />
              <div className="p-6">
                <span className="text-xs font-semibold tracking-wider uppercase text-secondary">
                  {selectedImage.category}
                </span>
                <h3 className="text-xl font-bold text-foreground mt-1">{selectedImage.title}</h3>
                <p className="text-muted-foreground mt-2">{selectedImage.desc}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;
