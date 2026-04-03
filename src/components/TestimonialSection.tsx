import { Quote } from "lucide-react";
import impact2 from "@/assets/impact-2.jpg";
import impact3 from "@/assets/impact-3.jpg";

const testimonials = [
  {
    image: impact2,
    alt: "Children learning in a special education classroom",
    quote: "Since joining Donguanella, my son has learned to communicate, make friends, and smile every day. They gave our family hope.",
    author: "A grateful parent",
  },
  {
    image: impact3,
    alt: "Young person learning vocational skills",
    quote: "The vocational training programme helped me discover my talents. I now create beautiful crafts and feel proud of what I can do.",
    author: "A young beneficiary",
  },
];

const TestimonialSection = () => (
  <section className="section-padding bg-muted relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold-light/40 blur-[150px] -translate-y-1/2" />

    <div className="container mx-auto px-6 relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="label-style">Stories of Hope</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 tracking-tight">
          Lives <span className="text-gradient-gold">Transformed</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <div key={t.author} className="group rounded-3xl overflow-hidden bg-card border border-border/50 hover-lift">
            <div className="relative h-64 overflow-hidden">
              <img
                src={t.image}
                alt={t.alt}
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>
            <div className="p-8 relative">
              <Quote className="w-8 h-8 text-secondary/30 mb-4" />
              <p className="text-foreground text-lg italic leading-[1.8] mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                  <span className="text-secondary font-serif font-bold text-sm">
                    {t.author.charAt(2).toUpperCase()}
                  </span>
                </div>
                <p className="font-semibold text-foreground text-sm">— {t.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;
