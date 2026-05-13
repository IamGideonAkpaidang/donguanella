import impact1 from "@/assets/impact-1.jpg";

const AboutSection = () => (
  <section id="about" className="section-padding bg-background relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold-light/40 blur-[120px] -translate-y-1/2 translate-x-1/3" />

    <div className="container mx-auto px-6 relative">
      <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <span className="label-style">Who We Are</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-8 leading-[1.05] tracking-tight">
            A Mission Rooted
            <br />
            in <span className="text-gradient-gold">Compassion and </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-[1.8] mb-6">
            Donguanella Rehabilitation Centres is a faith-based organization
            inspired by the mission of the Servants of Charity. We provide
            holistic care, rehabilitation, and education for children and young
            persons with disabilities including Down syndrome, autism, cerebral
            palsy, and intellectual disabilities.
          </p>
          <p className="text-muted-foreground leading-[1.8]">
            Founded on the belief that every life has inherent value, our
            centres across Nigeria serve as beacons of hope — offering
            professional therapy, education, and the nurturing environment
            every child deserves.
          </p>
          <div className="mt-10 flex items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold font-serif text-gradient-primary">25+</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-wide">Years</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold font-serif text-gradient-primary">6</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-wide">Centres</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold font-serif text-gradient-primary">3K+</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-wide">Lives</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-3xl blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src={impact1}
              alt="Child receiving therapy at Donguanella"
              width={800}
              height={600}
              loading="lazy"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
          {/* Floating accent card */}
          <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-5 shadow-elegant max-w-[220px]">
            <div className="text-2xl font-bold font-serif text-gradient-gold mb-1">100%</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dedicated to restoring dignity through compassionate care
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
