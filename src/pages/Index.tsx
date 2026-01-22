import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Brain, Shield, Database, Palette, Cog, Boxes, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceCard } from '@/components/ui/service-card';
import { StatCard } from '@/components/ui/stat-card';
import { FeatureCard } from '@/components/ui/feature-card';
import heroBg from '@/assets/hero-bg.jpg';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Scalable, high-performance web applications built with modern frameworks and best practices.',
    featured: true,
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions powered by cutting-edge AI and ML technologies to automate and optimize.',
    featured: true,
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed with user experience at the forefront.',
  },
  {
    icon: Cog,
    title: 'DevOps Engineering',
    description: 'Streamlined CI/CD pipelines and infrastructure automation for faster, reliable deployments.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
    featured: true,
  },
];

const stats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Enterprise Clients' },
  { value: '15+', label: 'Years Experience' },
  { value: '5000+', label: 'Professionals Trained' },
];

const whyUsFeatures = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security protocols and compliance standards.',
  },
  {
    icon: Boxes,
    title: 'Scalable Solutions',
    description: 'Architecture designed to grow with your business needs.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Certified professionals with deep industry expertise.',
  },
  {
    icon: Database,
    title: 'Modern Stack',
    description: 'Latest technologies for optimal performance.',
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Content */}
        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up opacity-0">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
                Enterprise Technology Solutions & Training
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              Build the Future with{' '}
              <span className="gradient-text">AppforgeX</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0 stagger-2">
              We deliver cutting-edge software solutions and professional training
              that empower businesses to thrive in the digital age.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0 stagger-3">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto glow-effect hover:glow-effect-strong text-lg px-8 py-6">
                  Get a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                className={`animate-fade-in-up opacity-0 stagger-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Our Services"
            title="Comprehensive Technology Solutions"
            description="From concept to deployment, we provide end-to-end services that transform your ideas into powerful digital products."
            className="mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                featured={service.featured}
                className={`animate-fade-in-up opacity-0 stagger-${(index % 6) + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why AppforgeX Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left opacity-0">
              <SectionHeader
                badge="Why AppforgeX"
                title="Your Trusted Technology Partner"
                description="We combine technical excellence with industry expertise to deliver solutions that drive real business value."
                align="left"
                className="mb-8"
              />

              <div className="grid sm:grid-cols-2 gap-6">
                {whyUsFeatures.map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>

              <div className="mt-8">
                <Link to="/why-us">
                  <Button size="lg">
                    Learn More About Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-slide-in-right opacity-0">
              <div className="gradient-border glow-effect rounded-2xl p-8 bg-background">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-sm text-muted-foreground">Delivering excellence since 2010</span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <p className="text-primary">// Our commitment</p>
                    <p className="text-muted-foreground">const mission = {`{`}</p>
                    <p className="text-foreground pl-4">quality: "Enterprise-grade",</p>
                    <p className="text-foreground pl-4">innovation: "Cutting-edge",</p>
                    <p className="text-foreground pl-4">support: "24/7 dedicated",</p>
                    <p className="text-foreground pl-4">delivery: "On-time, always"</p>
                    <p className="text-muted-foreground">{`}`};</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Training Programs"
            title="Empower Your Career with Expert Training"
            description="Industry-leading training programs designed to transform beginners into professionals and keep experts ahead of the curve."
            className="mb-16"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Beginner Tracks',
                description: 'Start your tech journey with foundational courses in programming, design, and more.',
                features: ['Web Development Basics', 'Programming Fundamentals', 'UI/UX Essentials'],
              },
              {
                title: 'Advanced Programs',
                description: 'Deep-dive into specialized technologies with expert-led advanced training.',
                features: ['AI & Machine Learning', 'Cloud Architecture', 'Cybersecurity Pro'],
              },
              {
                title: 'Corporate Training',
                description: 'Tailored training solutions for teams and organizations of all sizes.',
                features: ['Custom Curricula', 'On-site Training', 'Team Assessments'],
              },
            ].map((program, index) => (
              <div
                key={program.title}
                className={`p-8 rounded-2xl bg-card border border-border card-hover animate-fade-in-up opacity-0 stagger-${index + 1}`}
              >
                <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                <p className="text-muted-foreground mb-6">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/training">
              <Button size="lg" className="glow-effect hover:glow-effect-strong">
                Explore Training Programs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-b from-card to-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how AppforgeX can help you achieve your technology goals. Get in touch today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto glow-effect hover:glow-effect-strong text-lg px-8 py-6">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/training">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                  Enroll in Training
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
