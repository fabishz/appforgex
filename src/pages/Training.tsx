import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Clock, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';

const programs = [
  {
    title: 'Web Development Bootcamp',
    level: 'Beginner to Advanced',
    duration: '12 weeks',
    description: 'Master modern web development with React, Node.js, and cloud technologies.',
    topics: ['HTML/CSS/JavaScript', 'React & Next.js', 'Node.js & Express', 'Database Design', 'Cloud Deployment'],
    price: '$2,499',
  },
  {
    title: 'Mobile App Development',
    level: 'Intermediate',
    duration: '10 weeks',
    description: 'Build native and cross-platform mobile applications for iOS and Android.',
    topics: ['React Native', 'Flutter', 'Swift Basics', 'Kotlin Basics', 'App Store Publishing'],
    price: '$2,299',
  },
  {
    title: 'AI & Machine Learning',
    level: 'Intermediate to Advanced',
    duration: '14 weeks',
    description: 'Deep dive into AI, ML, and data science with hands-on projects.',
    topics: ['Python for Data Science', 'Machine Learning', 'Deep Learning', 'NLP', 'MLOps'],
    price: '$3,499',
  },
  {
    title: 'UI/UX Design Mastery',
    level: 'Beginner to Intermediate',
    duration: '8 weeks',
    description: 'Create stunning user experiences with industry-standard design tools.',
    topics: ['Design Thinking', 'Figma Advanced', 'Prototyping', 'User Research', 'Design Systems'],
    price: '$1,999',
  },
  {
    title: 'DevOps Engineering',
    level: 'Intermediate',
    duration: '10 weeks',
    description: 'Master CI/CD, containers, and cloud infrastructure automation.',
    topics: ['Docker & Kubernetes', 'CI/CD Pipelines', 'AWS/GCP/Azure', 'Terraform', 'Monitoring'],
    price: '$2,799',
  },
  {
    title: 'Cybersecurity Professional',
    level: 'Intermediate to Advanced',
    duration: '12 weeks',
    description: 'Become a security expert with comprehensive cybersecurity training.',
    topics: ['Network Security', 'Penetration Testing', 'Security Auditing', 'Incident Response', 'Compliance'],
    price: '$3,299',
  },
];

const benefits = [
  {
    icon: BookOpen,
    title: 'Project-Based Learning',
    description: 'Learn by building real-world projects that you can add to your portfolio.',
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of hands-on experience.',
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Earn recognized certifications upon successful completion.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedules',
    description: 'Choose from full-time, part-time, or self-paced learning options.',
  },
  {
    icon: CheckCircle,
    title: 'Job Support',
    description: 'Career coaching, resume review, and interview preparation.',
  },
  {
    icon: Zap,
    title: 'Lifetime Access',
    description: 'Access course materials and updates forever after enrollment.',
  },
];

const Training = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6 animate-fade-in-up opacity-0">
              Training Programs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              Launch Your <span className="gradient-text">Tech Career</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0 stagger-2">
              Industry-leading training programs designed to transform beginners into
              professionals and keep experts ahead of the curve.
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

      {/* Programs */}
      <section className="section-padding" id="programs">
        <div className="container-custom">
          <SectionHeader
            badge="All Programs"
            title="Choose Your Learning Path"
            description="Comprehensive training programs designed for various skill levels and career goals."
            className="mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div
                key={program.title}
                className={`p-6 rounded-2xl bg-card border border-border card-hover animate-fade-in-up opacity-0 stagger-${(index % 6) + 1}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {program.level}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                    {program.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                <ul className="space-y-2 mb-6">
                  {program.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-2xl font-bold gradient-text">{program.price}</span>
                  <Link to="/contact">
                    <Button size="sm" className="glow-effect">
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Training */}
      <section className="section-padding bg-card" id="corporate">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                badge="Corporate Training"
                title="Upskill Your Team"
                description="Customized training solutions designed for organizations of all sizes."
                align="left"
                className="mb-8"
              />
              <ul className="space-y-4 mb-8">
                {[
                  'Custom curricula tailored to your tech stack',
                  'On-site or remote training options',
                  'Dedicated account manager',
                  'Progress tracking and assessments',
                  'Flexible scheduling around your business needs',
                  'Volume discounts for larger teams',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button size="lg" className="glow-effect hover:glow-effect-strong">
                  Request a Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="gradient-border p-8 rounded-2xl bg-background glow-effect">
              <h4 className="text-lg font-semibold mb-6">Trusted by Industry Leaders</h4>
              <div className="grid grid-cols-2 gap-4">
                {['Tech Startups', 'Financial Services', 'Healthcare', 'E-commerce', 'Manufacturing', 'Government'].map((industry) => (
                  <div
                    key={industry}
                    className="p-4 rounded-lg bg-card border border-border text-center text-sm text-muted-foreground"
                  >
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Start Your <span className="gradient-text">Learning Journey</span> Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who have transformed their careers with AppforgeX training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto glow-effect hover:glow-effect-strong">
                  Enroll Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Download Syllabus
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Training;
