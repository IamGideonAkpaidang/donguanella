import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import img12 from "@/assets/gallery/img12.jpg";
import img13 from "@/assets/gallery/img13.jpg";
import img14 from "@/assets/gallery/img14.jpg";
import img15 from "@/assets/gallery/img15.jpg";
import img16 from "@/assets/gallery/img16.jpg";
import img17 from "@/assets/gallery/img17.jpg";
import img18 from "@/assets/gallery/img18.jpg";
import img19 from "@/assets/gallery/img19.jpg";
import img20 from "@/assets/gallery/img20.jpg";
import img21 from "@/assets/gallery/img21.jpg";
import img22 from "@/assets/gallery/img22.jpg";
import img23 from "@/assets/gallery/img23.jpg";
import img24 from "@/assets/gallery/img24.jpg";
import img25 from "@/assets/gallery/img25.jpg";
import img26 from "@/assets/gallery/img26.jpg";
import img27 from "@/assets/gallery/img27.jpg";
import img28 from "@/assets/gallery/img28.jpg";
import img29 from "@/assets/gallery/img29.jpg";
import img30 from "@/assets/gallery/img30.jpg";
import img31 from "@/assets/gallery/img31.jpg";
import img32 from "@/assets/gallery/img32.jpg";
import img33 from "@/assets/gallery/img33.jpg";
import img34 from "@/assets/gallery/img34.jpg";
import img35 from "@/assets/gallery/img35.jpg";
import img36 from "@/assets/gallery/img36.jpg";
import img37 from "@/assets/gallery/img37.jpg";
import img38 from "@/assets/gallery/img38.jpg";
import img39 from "@/assets/gallery/img39.jpg";
import img40 from "@/assets/gallery/img40.jpg";
import img41 from "@/assets/gallery/img41.jpg";
import img42 from "@/assets/gallery/img42.jpg";
import img43 from "@/assets/gallery/img43.jpg";
import img44 from "@/assets/gallery/img44.jpg";
import img45 from "@/assets/gallery/img45.jpg";
import img46 from "@/assets/gallery/img46.jpg";
import img47 from "@/assets/gallery/img47.jpg";
import img48 from "@/assets/gallery/img48.jpg";
import img49 from "@/assets/gallery/img49.jpg";
import img50 from "@/assets/gallery/img50.jpg";
import img51 from "@/assets/gallery/img51.jpg";
import img52 from "@/assets/gallery/img52.jpg";
import img53 from "@/assets/gallery/img53.jpg";
import img54 from "@/assets/gallery/img54.jpg";
import img55 from "@/assets/gallery/img55.jpg";
import img56 from "@/assets/gallery/img56.jpg";
import img57 from "@/assets/gallery/img57.jpg";
import img58 from "@/assets/gallery/img58.jpg";
import img59 from "@/assets/gallery/img59.jpg";
import img60 from "@/assets/gallery/img60.jpg";
import img61 from "@/assets/gallery/img61.jpg";
import img62 from "@/assets/gallery/img62.jpg";
import img63 from "@/assets/gallery/img63.jpg";

const categories = ["All", "Centres", "Children", "Activities", "Events"] as const;

const galleryItems = [
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
  { src: img12, title: "Joyful Smiles", category: "Children", desc: "Bright smiles that capture the spirit of our community." },
  { src: img13, title: "Daily Life", category: "Activities", desc: "Everyday activities that nurture growth and dignity." },
  { src: img14, title: "Community Gathering", category: "Events", desc: "A gathering that celebrates inclusion and belonging." },
  { src: img15, title: "Together in Learning", category: "Activities", desc: "Engaged learning sessions tailored to each child's needs." },
  { src: img16, title: "Caring Hands", category: "Children", desc: "Compassionate care given to every child in our centre." },
  { src: img17, title: "Hope in Action", category: "Events", desc: "Outreach moments that bring hope to children and families." },
  { src: img18, title: "Inside Our Centre", category: "Centres", desc: "A glimpse inside one of our rehabilitation facilities." },
  { src: img19, title: "Shared Joy", category: "Activities", desc: "Bonding through shared activities and play." },
  { src: img20, title: "Moments of Care", category: "Children", desc: "Caregivers and children sharing a moment at our rehabilitation centre." },
  { src: img21, title: "Learning Through Play", category: "Activities", desc: "Playful activities that build skills and confidence." },
  { src: img22, title: "Our Community", category: "Events", desc: "Coming together as one Don Guanella family." },
  { src: img23, title: "Creative Time", category: "Activities", desc: "Hands-on activities that spark creativity and joy." },
  { src: img24, title: "Little Moments", category: "Children", desc: "Tender everyday moments with the children in our care." },
  { src: img25, title: "A Day of Celebration", category: "Events", desc: "Celebrating milestones with our children, staff, and friends." },
  { src: img26, title: "Centre Life", category: "Centres", desc: "Daily life at our Don Guanella centre." },
  { src: img27, title: "Daily Life", category: "Activities", desc: "Everyday activities that nurture growth and dignity." },
  { src: img28, title: "Growing Together", category: "Children", desc: "Children growing in confidence, friendship, and joy." },
  { src: img29, title: "Together in Learning", category: "Activities", desc: "Engaged learning sessions tailored to each child's needs." },
  { src: img30, title: "Special Moments", category: "Events", desc: "Memorable occasions shared with our community." },
  { src: img31, title: "Shared Joy", category: "Activities", desc: "Bonding through shared activities and play." },
  { src: img32, title: "Joyful Smiles", category: "Children", desc: "Bright smiles that capture the spirit of our community." },
  { src: img33, title: "Community Gathering", category: "Events", desc: "A gathering that celebrates inclusion and belonging." },
  { src: img34, title: "Our Home of Care", category: "Centres", desc: "The welcoming environment of our rehabilitation centre." },
  { src: img35, title: "Learning Through Play", category: "Activities", desc: "Playful activities that build skills and confidence." },
  { src: img36, title: "Caring Hands", category: "Children", desc: "Compassionate care given to every child in our centre." },
  { src: img37, title: "Creative Time", category: "Activities", desc: "Hands-on activities that spark creativity and joy." },
  { src: img38, title: "Hope in Action", category: "Events", desc: "Outreach moments that bring hope to children and families." },
  { src: img39, title: "Daily Life", category: "Activities", desc: "Everyday activities that nurture growth and dignity." },
  { src: img40, title: "Moments of Care", category: "Children", desc: "Caregivers and children sharing a moment at our rehabilitation centre." },
  { src: img41, title: "Our Community", category: "Events", desc: "Coming together as one Don Guanella family." },
  { src: img42, title: "Inside Our Centre", category: "Centres", desc: "A glimpse inside one of our rehabilitation facilities." },
  { src: img43, title: "Together in Learning", category: "Activities", desc: "Engaged learning sessions tailored to each child's needs." },
  { src: img44, title: "Little Moments", category: "Children", desc: "Tender everyday moments with the children in our care." },
  { src: img45, title: "Shared Joy", category: "Activities", desc: "Bonding through shared activities and play." },
  { src: img46, title: "A Day of Celebration", category: "Events", desc: "Celebrating milestones with our children, staff, and friends." },
  { src: img47, title: "Learning Through Play", category: "Activities", desc: "Playful activities that build skills and confidence." },
  { src: img48, title: "Growing Together", category: "Children", desc: "Children growing in confidence, friendship, and joy." },
  { src: img49, title: "Special Moments", category: "Events", desc: "Memorable occasions shared with our community." },
  { src: img50, title: "Centre Life", category: "Centres", desc: "Daily life at our Don Guanella centre." },
  { src: img51, title: "Creative Time", category: "Activities", desc: "Hands-on activities that spark creativity and joy." },
  { src: img52, title: "Joyful Smiles", category: "Children", desc: "Bright smiles that capture the spirit of our community." },
  { src: img53, title: "Daily Life", category: "Activities", desc: "Everyday activities that nurture growth and dignity." },
  { src: img54, title: "Community Gathering", category: "Events", desc: "A gathering that celebrates inclusion and belonging." },
  { src: img55, title: "Together in Learning", category: "Activities", desc: "Engaged learning sessions tailored to each child's needs." },
  { src: img56, title: "Caring Hands", category: "Children", desc: "Compassionate care given to every child in our centre." },
  { src: img57, title: "Hope in Action", category: "Events", desc: "Outreach moments that bring hope to children and families." },
  { src: img58, title: "Our Home of Care", category: "Centres", desc: "The welcoming environment of our rehabilitation centre." },
  { src: img59, title: "Shared Joy", category: "Activities", desc: "Bonding through shared activities and play." },
  { src: img60, title: "Moments of Care", category: "Children", desc: "Caregivers and children sharing a moment at our rehabilitation centre." },
  { src: img61, title: "Learning Through Play", category: "Activities", desc: "Playful activities that build skills and confidence." },
  { src: img62, title: "Our Community", category: "Events", desc: "Coming together as one Don Guanella family." },
  { src: img63, title: "Creative Time", category: "Activities", desc: "Hands-on activities that spark creativity and joy." },
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
