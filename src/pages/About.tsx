import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Eye, Star, Users, BookOpen, HandHeart } from "lucide-react";

const values = [
  { icon: Heart, title: "Human Dignity", desc: "Promotion of the human dignity of every person created in God's image." },
  { icon: Users, title: "Tolerance & Equality", desc: "Tolerance, equality of opportunity and empathy for all." },
  { icon: Star, title: "Individual Respect", desc: "Individual respect for every person, their values and dignity." },
  { icon: HandHeart, title: "Collaboration", desc: "Collaboration with lay people, understanding of rights and responsibilities in the community." },
  { icon: BookOpen, title: "Charity & Love", desc: "Charity, Love, Hospitality and Family Spirit at the core of everything." },
];

const About = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero Banner */}
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-primary overflow-hidden">
      <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-secondary/10 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl">
          <span className="label-style text-secondary/80">About Us</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mt-4 tracking-tight leading-[1.05]">
            Who <span className="text-gradient-gold">We Are</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mt-6 leading-relaxed max-w-2xl">
            A faith-based congregation dedicated to the care, rehabilitation, and education of persons with disabilities across Nigeria and Africa.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>

    {/* History */}
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="label-style">Our History</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
              The Congregation of the <span className="text-gradient-gold">Servants of Charity</span>
            </h2>
          </div>
          <div className="space-y-6 text-muted-foreground leading-[1.9]">
            <p>
              The Congregation of the Servants of Charity is a Religious Congregation of Priests and Brothers, a Clerical Institute of Pontifical Right founded in Italy by St. Louis Guanella at the end of the 19th century.
            </p>
            <p>
              In 1989, the first Guanellian missionaries led by the then Provincial Superior of the Sacred Heart Province, Northern Italy, Don Maurizio Bianchi visited Owerri with Don Wladimiro Bogoni. The then Catholic Bishop of Owerri Diocese, Most Rev. Dr. Mark Unegbu received and hosted these early missionaries.
            </p>
            <p>
              This visit was subsequently followed by other visits, all in preparation for the definitive arrival of the Congregation in Africa in 1992 to start the Rehabilitation institution for the disabled and mentally challenged persons in Nnebukwu, Oguta, Imo State.
            </p>
            <p>
              Today, these early modest beginnings have borne great fruits in offering rehabilitative and assistance services through facilities in Abuja, Imo, Lagos and Oyo States, and has extended to Ghana (1997), Democratic Republic of Congo (1996), and Tanzania (2016).
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section-padding bg-gradient-warm relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group bg-card rounded-3xl p-10 md:p-14 border border-border/50 hover-lift">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">Mission Statement</h3>
            <p className="text-muted-foreground leading-[1.9] text-lg">
              Promoting the human dignity who is created in the image and likeness of God, to a full realization of the human self in the physical, social, political and spiritual reality at large.
            </p>
          </div>
          <div className="group bg-card rounded-3xl p-10 md:p-14 border border-border/50 hover-lift">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Heart className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">Vision Statement</h3>
            <p className="text-muted-foreground leading-[1.9] text-lg">
              Making Charity the heart of the world.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="label-style">Our Foundation</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4 tracking-tight">
            Core <span className="text-gradient-gold">Values</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`group bg-card rounded-3xl p-8 border border-border/50 hover-lift ${i === values.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3 tracking-tight">{v.title}</h3>
              <p className="text-muted-foreground leading-[1.8] text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Apostolate */}
    <section className="section-padding bg-gradient-primary relative overflow-hidden">
      <div className="absolute top-1/3 left-[10%] w-72 h-72 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="label-style text-secondary/80">Our Apostolate</span>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mt-4 tracking-tight">
            Rooted in the Gospel
          </h2>
          <p className="text-primary-foreground/70 mt-8 text-lg leading-[1.9]">
            The mission of the Servants of Charity is strongly rooted in the gospel, real practical life and in the teachings of our founder St. Louis Guanella. In the real practical life, the apostolate is exercised among children with special needs, the old people, young people who are disoriented especially the most abandoned.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>

    {/* Priests & Religious */}
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-style">Priests & Religious</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 tracking-tight">
                Servants of <span className="text-gradient-gold">Charity</span>
              </h2>
              <p className="text-muted-foreground mt-6 leading-[1.9]">
                This is a religious congregation that trains priests and religious who are the principal promoters of the welfare of these children with special needs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card rounded-3xl p-8 border border-border/50 text-center hover-lift">
                <span className="block font-serif text-4xl font-bold text-gradient-primary">59</span>
                <span className="text-sm text-muted-foreground mt-2 block">Nigerian Priests</span>
              </div>
              <div className="bg-card rounded-3xl p-8 border border-border/50 text-center hover-lift">
                <span className="block font-serif text-4xl font-bold text-gradient-gold">73</span>
                <span className="text-sm text-muted-foreground mt-2 block">Seminarians</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
