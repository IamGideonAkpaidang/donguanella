import impact2 from "@/assets/impact-2.jpg";
import impact3 from "@/assets/impact-3.jpg";

const TestimonialSection = () => (
  <section className="py-20 md:py-28 bg-muted">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-4">Stories of Hope</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Lives Transformed</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="rounded-lg overflow-hidden shadow-md">
          <img src={impact2} alt="Children learning in a special education classroom" width={800} height={600} loading="lazy" className="w-full h-56 object-cover" />
          <div className="bg-card p-6">
            <p className="text-muted-foreground italic leading-relaxed mb-4">
              "Since joining Donguanella, my son has learned to communicate, make friends, and smile every day. They gave our family hope."
            </p>
            <p className="font-semibold text-foreground text-sm">— A grateful parent</p>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md">
          <img src={impact3} alt="Young person learning vocational skills" width={800} height={600} loading="lazy" className="w-full h-56 object-cover" />
          <div className="bg-card p-6">
            <p className="text-muted-foreground italic leading-relaxed mb-4">
              "The vocational training programme helped me discover my talents. I now create beautiful crafts and feel proud of what I can do."
            </p>
            <p className="font-semibold text-foreground text-sm">— A young beneficiary</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialSection;
