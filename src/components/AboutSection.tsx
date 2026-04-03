import impact1 from "@/assets/impact-1.jpg";

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <p className="text-sm font-semibold tracking-widest text-secondary uppercase mb-4">Who We Are</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            A Mission Rooted in Compassion
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Donguanella Rehabilitation Centres is a faith-based organization inspired by the mission of the Servants of Charity. We provide holistic care, rehabilitation, and education for children and young persons with disabilities including Down syndrome, autism, cerebral palsy, and intellectual disabilities.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Founded on the belief that every life has inherent value, our centres across Nigeria serve as beacons of hope — offering professional therapy, education, and the nurturing environment every child deserves.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src={impact1} alt="Child receiving therapy at Donguanella" width={800} height={600} loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
