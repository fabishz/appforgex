import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';

const projects = [
  {
    title: 'FinTech Trading Platform',
    category: 'Web Development',
    description: 'A high-frequency trading platform handling millions of transactions daily with real-time analytics.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    image: 'linear-gradient(135deg, hsl(199 89% 48% / 0.3), hsl(262 83% 58% / 0.3))',
    results: ['99.99% uptime', '50ms latency', '$2B+ daily volume'],
  },
  {
    title: 'Healthcare Patient Portal',
    category: 'Mobile App',
    description: 'HIPAA-compliant mobile app connecting patients with healthcare providers for telemedicine.',
    technologies: ['React Native', 'Firebase', 'WebRTC', 'Node.js'],
    image: 'linear-gradient(135deg, hsl(160 84% 40% / 0.3), hsl(199 89% 48% / 0.3))',
    results: ['500K+ users', '4.8★ rating', '40% cost reduction'],
  },
  {
    title: 'AI Customer Support Bot',
    category: 'AI/ML',
    description: 'Intelligent chatbot with natural language understanding for 24/7 customer support.',
    technologies: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
    image: 'linear-gradient(135deg, hsl(262 83% 58% / 0.3), hsl(330 80% 50% / 0.3))',
    results: ['80% automation', '2s response time', '95% satisfaction'],
  },
  {
    title: 'E-commerce Marketplace',
    category: 'Full Stack',
    description: 'Scalable multi-vendor marketplace with real-time inventory and payment processing.',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Elasticsearch'],
    image: 'linear-gradient(135deg, hsl(45 93% 50% / 0.3), hsl(30 95% 55% / 0.3))',
    results: ['$50M+ GMV', '100K+ products', '99.9% availability'],
  },
  {
    title: 'Smart Building IoT System',
    category: 'IoT/DevOps',
    description: 'IoT platform for smart building management with real-time monitoring and automation.',
    technologies: ['Python', 'MQTT', 'InfluxDB', 'Kubernetes', 'Grafana'],
    image: 'linear-gradient(135deg, hsl(199 89% 48% / 0.3), hsl(160 84% 40% / 0.3))',
    results: ['30% energy savings', '500+ sensors', 'Real-time alerts'],
  },
  {
    title: 'Cybersecurity Dashboard',
    category: 'Security',
    description: 'Enterprise security monitoring platform with threat detection and incident response.',
    technologies: ['React', 'Python', 'Elasticsearch', 'Kafka'],
    image: 'linear-gradient(135deg, hsl(0 84% 60% / 0.3), hsl(262 83% 58% / 0.3))',
    results: ['99.7% detection rate', '<5min response', 'SOC2 compliant'],
  },
];

const Portfolio = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6 animate-fade-in-up opacity-0">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              Projects That <span className="gradient-text">Make an Impact</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0 stagger-2">
              Explore our portfolio of successful projects across various industries
              and technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group rounded-2xl bg-card border border-border overflow-hidden card-hover animate-fade-in-up opacity-0 stagger-${(index % 4) + 1}`}
              >
                {/* Project Image */}
                <div
                  className="h-48 md:h-56 flex items-center justify-center relative overflow-hidden"
                  style={{ background: project.image }}
                >
                  <div className="absolute inset-0 bg-background/60" />
                  <span className="relative z-10 px-4 py-2 rounded-full bg-background/80 text-sm font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-secondary text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Key Results</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.results.map((result) => (
                        <span
                          key={result}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
              Let's Build Your <span className="gradient-text">Success Story</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to join our portfolio of successful projects? Let's discuss your vision.
            </p>
            <Link to="/contact">
              <Button size="lg" className="glow-effect hover:glow-effect-strong">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
