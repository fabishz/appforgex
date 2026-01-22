import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Award, Users, Clock, HeartHandshake, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';

const advantages = [
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'Bank-level security protocols and compliance standards including GDPR, SOC2, and HIPAA.',
  },
  {
    icon: Zap,
    title: 'Cutting-Edge Technology',
    description: 'We leverage the latest technologies and frameworks to build future-proof solutions.',
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description: '200+ successful projects delivered across 30+ countries with consistent 5-star ratings.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: '100+ certified professionals with expertise spanning the full technology spectrum.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: '98% on-time delivery rate with transparent project management and communication.',
  },
  {
    icon: HeartHandshake,
    title: '24/7 Support',
    description: 'Dedicated support team available around the clock to address any concerns.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on measurable outcomes that drive real business value and ROI.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Continuous R&D investment to stay ahead of industry trends and technologies.',
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We dive deep into understanding your business, goals, and technical requirements.',
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Our experts craft a comprehensive roadmap and architecture for your solution.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'Agile development with regular updates, demos, and feedback integration.',
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'Seamless deployment followed by ongoing maintenance and optimization.',
  },
];

const certifications = [
  'AWS Certified Solutions Architect',
  'Google Cloud Professional',
  'Microsoft Azure Expert',
  'Certified Kubernetes Administrator',
  'PMP Certified',
  'CISSP Security Professional',
  'Certified Scrum Master',
  'ISO 27001 Compliant',
];

const WhyUs = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6 animate-fade-in-up opacity-0">
              Why AppforgeX
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              Your Trusted <span className="gradient-text">Technology Partner</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0 stagger-2">
              We combine technical excellence with industry expertise to deliver
              solutions that drive real business value.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Our Advantages"
            title="What Sets Us Apart"
            description="We don't just build software—we build partnerships that drive your success."
            className="mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className={`p-6 rounded-2xl bg-card border border-border card-hover animate-fade-in-up opacity-0 stagger-${(index % 4) + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <advantage.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">{advantage.title}</h4>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            badge="Our Process"
            title="How We Work"
            description="A proven methodology that delivers results every time."
            className="mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div
                key={step.step}
                className={`relative animate-fade-in-up opacity-0 stagger-${index + 1}`}
              >
                <div className="text-6xl font-bold gradient-text opacity-30 mb-4">
                  {step.step}
                </div>
                <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                <p className="text-muted-foreground">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 w-1/2 border-t-2 border-dashed border-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Certifications"
            title="Industry-Recognized Expertise"
            description="Our team holds certifications from leading technology organizations."
            className="mb-16"
          />

          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-6 py-3 rounded-full bg-card border border-border text-sm font-medium hover:border-primary/50 hover:text-primary transition-all duration-200"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Experience the <span className="gradient-text">AppforgeX Difference</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let us show you why leading companies choose us as their technology partner.
            </p>
            <Link to="/contact">
              <Button size="lg" className="glow-effect hover:glow-effect-strong">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyUs;
