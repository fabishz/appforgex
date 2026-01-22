import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Award, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay ahead of the curve, embracing new technologies and methodologies to deliver cutting-edge solutions.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Quality is non-negotiable. We deliver enterprise-grade solutions that exceed expectations.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with our clients, treating their goals as our own and building lasting partnerships.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'Transparency and honesty guide every interaction. We build trust through consistent, ethical practices.',
  },
];

const team = [
  { role: 'Engineering', count: '40+' },
  { role: 'Design', count: '15+' },
  { role: 'AI/ML', count: '12+' },
  { role: 'DevOps', count: '10+' },
  { role: 'Security', count: '8+' },
  { role: 'Training', count: '20+' },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6 animate-fade-in-up opacity-0">
              About AppforgeX
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              Building the <span className="gradient-text">Digital Future</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0 stagger-2">
              We are a team of passionate technologists dedicated to empowering businesses
              with innovative solutions and world-class training programs.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="gradient-border p-8 md:p-12 rounded-2xl bg-card animate-fade-in-up opacity-0">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6 glow-effect">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses and individuals with cutting-edge technology solutions
                and comprehensive training programs that drive innovation, growth, and
                digital transformation across industries.
              </p>
            </div>

            <div className="gradient-border p-8 md:p-12 rounded-2xl bg-card animate-fade-in-up opacity-0 stagger-1">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6 glow-effect">
                <Eye className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the global leader in technology services and training, recognized
                for our commitment to excellence, innovation, and the success of every
                client and learner we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                badge="Our Story"
                title="From Vision to Global Impact"
                align="left"
                className="mb-8"
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2010, AppforgeX started with a simple vision: to bridge the gap
                  between cutting-edge technology and practical business applications. What
                  began as a small team of passionate developers has grown into a global
                  technology powerhouse.
                </p>
                <p>
                  Over the years, we've expanded our services to cover the full spectrum of
                  digital solutions—from web and mobile development to AI, cybersecurity, and
                  beyond. Our training division has empowered thousands of professionals to
                  advance their careers.
                </p>
                <p>
                  Today, we serve clients across 30+ countries, helping startups and Fortune
                  500 companies alike to innovate, scale, and succeed in the digital economy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {team.map((member, index) => (
                <div
                  key={member.role}
                  className={`p-6 rounded-xl bg-background border border-border text-center card-hover animate-fade-in-up opacity-0 stagger-${index + 1}`}
                >
                  <div className="text-3xl font-bold gradient-text mb-1">{member.count}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Our Values"
            title="What Drives Us Forward"
            description="Our core values shape everything we do, from how we build solutions to how we train the next generation of tech professionals."
            className="mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`p-6 rounded-2xl bg-card border border-border card-hover text-center animate-fade-in-up opacity-0 stagger-${index + 1}`}
              >
                <div className="w-14 h-14 rounded-xl bg-secondary mx-auto flex items-center justify-center mb-4 text-primary">
                  <value.icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Join Our Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're looking to transform your business or advance your career,
              AppforgeX is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto glow-effect">
                  Work With Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/careers">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Careers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
