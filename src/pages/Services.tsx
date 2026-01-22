import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Brain, Shield, Database, Palette, Cog, Boxes, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';

const services = [
  {
    id: 'web',
    icon: Code,
    title: 'Web Development',
    description: 'Scalable, high-performance web applications built with modern frameworks and best practices.',
    details: [
      'Custom web application development',
      'Progressive Web Apps (PWA)',
      'E-commerce platforms',
      'Enterprise portals and dashboards',
      'API development and integration',
      'Performance optimization',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Application Development',
    description: 'Native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.',
    details: [
      'Native iOS development (Swift)',
      'Native Android development (Kotlin)',
      'Cross-platform solutions (React Native, Flutter)',
      'Mobile app UI/UX design',
      'App Store optimization',
      'Mobile backend development',
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase'],
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces designed with user experience at the forefront.',
    details: [
      'User research and analysis',
      'Wireframing and prototyping',
      'Visual design and branding',
      'Design systems creation',
      'Usability testing',
      'Accessibility compliance',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer'],
  },
  {
    id: '3d',
    icon: Boxes,
    title: '3D Modeling & Visualization',
    description: 'Immersive 3D experiences and visualizations for products, architecture, and interactive media.',
    details: [
      'Product visualization',
      'Architectural rendering',
      'Interactive 3D experiences',
      'AR/VR development',
      'Game assets creation',
      '3D animation',
    ],
    technologies: ['Blender', 'Unity', 'Unreal Engine', 'Three.js', 'WebGL'],
  },
  {
    id: 'devops',
    icon: Cog,
    title: 'DevOps Engineering',
    description: 'Streamlined CI/CD pipelines and infrastructure automation for faster, reliable deployments.',
    details: [
      'CI/CD pipeline setup',
      'Cloud infrastructure (AWS, GCP, Azure)',
      'Container orchestration (Kubernetes)',
      'Infrastructure as Code',
      'Monitoring and logging',
      'Security automation',
    ],
    technologies: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions'],
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Agents Development',
    description: 'Intelligent AI agents and automation solutions that transform business operations.',
    details: [
      'Custom AI chatbots',
      'Autonomous agents',
      'Process automation',
      'Natural language processing',
      'Intelligent document processing',
      'AI-powered decision systems',
    ],
    technologies: ['OpenAI', 'LangChain', 'Python', 'TensorFlow', 'Hugging Face'],
  },
  {
    id: 'ml',
    icon: Bot,
    title: 'Machine Learning Engineering',
    description: 'Data-driven ML solutions that unlock insights and automate complex decision-making.',
    details: [
      'Predictive analytics',
      'Computer vision solutions',
      'Recommendation systems',
      'Anomaly detection',
      'Model training and optimization',
      'MLOps and deployment',
    ],
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'MLflow'],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Cybersecurity Solutions',
    description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
    details: [
      'Security assessments and audits',
      'Penetration testing',
      'Security architecture design',
      'Incident response planning',
      'Compliance consulting (GDPR, SOC2)',
      'Security training',
    ],
    technologies: ['OWASP', 'Burp Suite', 'Nessus', 'Splunk', 'CrowdStrike'],
  },
  {
    id: 'database',
    icon: Database,
    title: 'Database Design & Development',
    description: 'Robust, scalable database solutions optimized for performance and reliability.',
    details: [
      'Database architecture design',
      'Data modeling',
      'Migration and optimization',
      'High availability solutions',
      'Data warehousing',
      'Database administration',
    ],
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Snowflake'],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6 animate-fade-in-up opacity-0">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              End-to-End <span className="gradient-text">Technology Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0 stagger-2">
              From concept to deployment, we provide comprehensive services that
              transform your ideas into powerful digital products.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`scroll-mt-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className={`animate-fade-in-up opacity-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center glow-effect">
                        <service.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact">
                      <Button className="glow-effect hover:glow-effect-strong">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>

                  <div className={`animate-fade-in-up opacity-0 stagger-1 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="p-8 rounded-2xl bg-card border border-border">
                      <h4 className="text-sm font-medium text-muted-foreground mb-4">Technologies we use</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {index < services.length - 1 && (
                  <div className="border-b border-border mt-16" />
                )}
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
              Ready to Build Something <span className="gradient-text">Amazing</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss your project requirements and create a solution that
              exceeds your expectations.
            </p>
            <Link to="/contact">
              <Button size="lg" className="glow-effect hover:glow-effect-strong">
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
