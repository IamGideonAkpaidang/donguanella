import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import img1 from "@/assets/gallery/img1.jpg";
import img2 from "@/assets/gallery/img2.jpg";
import img3 from "@/assets/gallery/img3.jpg";
import img4 from "@/assets/gallery/img4.jpg";
import img5 from "@/assets/gallery/img5.jpg";
import img6 from "@/assets/gallery/img6.jpg";
import img7 from "@/assets/gallery/img7.jpg";
import img8 from "@/assets/gallery/img8.jpg";
import img9 from "@/assets/gallery/img9.jpg";
import img10 from "@/assets/gallery/img10.jpg";
import img11 from "@/assets/gallery/img11.jpg";

const categories = ["All", "Centres", "Children", "Activities", "Events"] as const;

const galleryItems = [
  { src: img1, title: "Moments of Care", category: "Children", desc: "Caregivers and children sharing a moment at our rehabilitation centre." },
  { src: img2, title: "Daily Life", category: "Activities", desc: "Everyday activities that nurture growth and dignity." },
  { src: img3, title: "Together in Learning", category: "Activities", desc: "Engaged learning sessions tailored to each child's needs." },
  { src: img4, title: "Joyful Smiles", category: "Children", desc: "Bright smiles that capture the spirit of our community." },
  { src: img5, title: "Community Gathering", category: "Events", desc: "A gathering that celebrates inclusion and belonging." },
  { src: img6, title: "Inside Our Centre", category: "Centres", desc: "A glimpse inside one of our rehabilitation facilities." },
  { src: img7, title: "Centre Life", category: "Centres", desc: "Daily life at our Don Guanella centre." },
  { src: img8, title: "Hope in Action", category: "Events", desc: "Outreach moments that bring hope to children and families." },
  { src: img9, title: "Caring Hands", category: "Children", desc: "Compassionate care given to every child in our centre." },
  { src: img10, title: "Shared Joy", category: "Activities", desc: "Bonding through shared activities and play." },
  { src: img11, title: "Our Community", category: "Events", desc: "Coming together as one Don Guanella family." },
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
