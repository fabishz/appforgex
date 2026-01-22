import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, GraduationCap, Heart, Zap, Globe, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';

const positions = [
  {
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote / San Francisco',
    type: 'Full-time',
    experience: '5+ years',
  },
  {
    title: 'Machine Learning Engineer',
    department: 'AI/ML',
    location: 'Remote / San Francisco',
    type: 'Full-time',
    experience: '3+ years',
  },
  {
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote / San Francisco',
    type: 'Full-time',
    experience: '3+ years',
  },
  {
    title: 'Technical Trainer',
    department: 'Training',
    location: 'Remote',
    type: 'Full-time',
    experience: '5+ years',
  },
  {
    title: 'Mobile Developer (React Native)',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
  },
];

const benefits = [
  {
    icon: Briefcase,
    title: 'Competitive Salary',
    description: 'Top-market compensation with equity options',
  },
  {
    icon: Heart,
    title: 'Health Benefits',
    description: 'Comprehensive medical, dental, and vision coverage',
  },
  {
    icon: Zap,
    title: 'Learning Budget',
    description: '$2,500 annual budget for courses and conferences',
  },
  {
    icon: Globe,
    title: 'Remote First',
    description: 'Work from anywhere with flexible hours',
  },
  {
    icon: Coffee,
    title: 'Work-Life Balance',
    description: 'Unlimited PTO and mental health days',
  },
  {
    icon: GraduationCap,
    title: 'Career Growth',
    description: 'Clear advancement paths and mentorship programs',
  },
];

const Careers = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6 animate-fade-in-up opacity-0">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              Build Your <span className="gradient-text">Career</span> With Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0 stagger-2">
              Join a team of passionate technologists building the future of software
              development and training.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`text-center animate-fade-in-up opacity-0 stagger-${index + 1}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 mx-auto flex items-center justify-center mb-3 text-primary">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{benefit.title}</h4>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Open Positions"
            title="Find Your Next Role"
            description="We're always looking for talented individuals to join our growing team."
            className="mb-16"
          />

          <div className="space-y-4">
            {positions.map((position, index) => (
              <div
                key={position.title}
                className={`p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-200 animate-fade-in-up opacity-0 stagger-${(index % 6) + 1}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
                        {position.location}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
                        {position.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
                        {position.experience}
                      </span>
                    </div>
                  </div>
                  <Link to="/contact">
                    <Button className="glow-effect">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                badge="Internships"
                title="Launch Your Career"
                description="Our internship program offers hands-on experience with real projects and mentorship from industry experts."
                align="left"
                className="mb-8"
              />
              <ul className="space-y-4 mb-8">
                {[
                  'Work on production projects',
                  'Mentorship from senior engineers',
                  'Competitive stipend',
                  'Potential for full-time offer',
                  'Flexible remote options',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button size="lg" className="glow-effect hover:glow-effect-strong">
                  Apply for Internship
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="gradient-border p-8 rounded-2xl bg-background glow-effect">
              <h4 className="text-lg font-semibold mb-4">Training-to-Hire Program</h4>
              <p className="text-muted-foreground mb-6">
                Not quite ready for a full-time role? Our training-to-hire program
                helps you build skills while earning, with a guaranteed interview
                upon completion.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Web Development', 'Mobile Apps', 'AI/ML', 'DevOps'].map((track) => (
                  <div
                    key={track}
                    className="p-3 rounded-lg bg-card border border-border text-center text-sm"
                  >
                    {track}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
