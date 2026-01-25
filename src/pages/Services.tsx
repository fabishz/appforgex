import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Brain, Shield, Database, Palette, Cog, Boxes, Bot, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';

interface ServiceStory {
  id: string;
  icon: any;
  title: string;
  problem: string;
  audience: string;
  guide: string;
  solution: string;
  emotion: string;
  invitation: string;
  cta: string;
  technologies: string[];
}

const services: ServiceStory[] = [
  {
    id: 'web',
    icon: Code,
    title: 'Web Development',
    problem: 'Many businesses struggle with slow, unstable applications that fail under real-world traffic, leading to lost revenue and frustrated users.',
    audience: 'This affects founders, CTOs, and product managers who need reliable systems but lack specialized in-house expertise to build them correctly.',
    guide: 'At AppforgeX, we’ve helped teams navigate these exact challenges by designing systems built for performance and scale from day one.',
    solution: 'Our Web Development services deliver fast, secure, and scalable applications designed for real business growth. We use modern frameworks to ensure your app is future-proof.',
    emotion: 'Imagine launching without fear of crashes, downtime, or user frustration—just smooth, reliable performance.',
    invitation: 'What would it mean for your business if your technology worked flawlessly, even at scale?',
    cta: 'Start Your Project',
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Application Development',
    problem: 'In a mobile-first world, a clunky or buggy app is a death sentence for user retention. Users abandon apps that don’t feel native or responsive.',
    audience: 'Startups and enterprises alike face the pressure to deliver flawless experiences across both iOS and Android without doubling their budget.',
    guide: 'We understand the nuances of mobile ecosystems. Our team has successfully deployed top-tier apps that users love and trust.',
    solution: 'We build native and cross-platform mobile apps that deliver exceptional user experiences. Whether it’s Swift, Kotlin, or React Native, we choose the right tool for your success.',
    emotion: 'Feel the confidence of knowing your app will look and perform beautifully on every device your customers use.',
    invitation: 'Are you ready to captivate your audience with a mobile experience they won’t want to put down?',
    cta: 'Build Your App',
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase'],
  },
  {
    id: 'design',
    icon: Palette,
    title: 'UI/UX Design',
    problem: 'Great technology fails if users can’t figure out how to use it. Confusing interfaces lead to high churn and wasted development hours.',
    audience: 'Product owners often struggle to translate complex functionality into simple, intuitive designs that users actually enjoy.',
    guide: 'AppforgeX approaches design as a problem-solving discipline. We don’t just make things pretty; we make them work for your users.',
    solution: 'Our UI/UX Design services create beautiful, intuitive interfaces with user experience at the forefront. We prototype, test, and refine until it’s perfect.',
    emotion: 'Experience the relief of seeing your users navigate your product effortlessly, achieving their goals without friction.',
    invitation: 'What if your product was so intuitive that it didn’t need a manual?',
    cta: 'Design Your Experience',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer'],
  },
  {
    id: '3d',
    icon: Boxes,
    title: '3D Modeling & Visualization',
    problem: 'Flat, 2D images often fail to convey the true value or complexity of a product, leaving customers hesitant to commit.',
    audience: 'Architects, product designers, and marketers need immersive ways to showcase their vision before it even exists in the real world.',
    guide: 'We bridge the gap between imagination and reality. Our 3D experts bring your concepts to life with stunning realism.',
    solution: 'We provide immersive 3D experiences and visualizations for products, architecture, and interactive media that captivate and convince.',
    emotion: 'Thrill your stakeholders with photorealistic visuals that make them feel like they can reach out and touch your product.',
    invitation: 'How much faster could you close deals if your clients could fully experience your vision today?',
    cta: 'Visualize Your Vision',
    technologies: ['Blender', 'Unity', 'Unreal Engine', 'Three.js', 'WebGL'],
  },
  {
    id: 'devops',
    icon: Cog,
    title: 'DevOps & Cloud Engineering',
    problem: 'Manual deployments and fragile infrastructure slow down innovation and increase the risk of catastrophic downtime.',
    audience: 'Engineering teams are often bogged down by "keeping the lights on" instead of building new features that drive value.',
    guide: 'We treat infrastructure as code. AppforgeX automates the boring stuff so your team can focus on what they do best.',
    solution: 'Our DevOps services streamline CI/CD pipelines and automate infrastructure for faster, reliable deployments on AWS, GCP, or Azure.',
    emotion: 'Enjoy the peace of mind that comes from a self-healing, auto-scaling infrastructure that grows with you.',
    invitation: 'What could your team achieve if they never had to worry about server maintenance again?',
    cta: 'Optimize Your Cloud',
    technologies: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions'],
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Agents Development',
    problem: 'Businesses are drowning in repetitive tasks and data, missing out on the efficiency revolution that AI promises.',
    audience: 'Forward-thinking leaders know they need AI but struggle to implement practical, ROI-driven agents that actually work.',
    guide: 'We cut through the AI hype. AppforgeX builds practical, intelligent agents that solve specific business problems today.',
    solution: 'We develop custom AI agents and automation solutions that transform operations, from intelligent customer support to autonomous process management.',
    emotion: 'Feel the excitement of watching your business operate more efficiently than you ever thought possible.',
    invitation: 'Imagine having a tireless digital workforce handling your routine tasks 24/7. What would you do with that extra time?',
    cta: 'Automate with AI',
    technologies: ['OpenAI', 'LangChain', 'Python', 'TensorFlow', 'Hugging Face'],
  },
  {
    id: 'ml',
    icon: Bot,
    title: 'Machine Learning Engineering',
    problem: 'Data is useless if you can’t extract insights from it. Many companies sit on goldmines of data but lack the tools to mine it.',
    audience: 'Enterprises need to move beyond basic analytics to predictive models that drive strategic decision-making.',
    guide: 'AppforgeX turns data into destiny. We engineer robust ML pipelines that deliver actionable intelligence, not just numbers.',
    solution: 'Our Machine Learning solutions unlock insights and automate complex decision-making through predictive analytics, computer vision, and recommendation systems.',
    emotion: 'Gain the confidence of making data-backed decisions that put you steps ahead of the competition.',
    invitation: 'What if you could predict your customers\' needs before they even expressed them?',
    cta: 'Leverage Your Data',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'MLflow'],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Cybersecurity Solutions',
    problem: 'A single security breach can destroy years of trust and bankrupt a company. The threat landscape is evolving faster than most can keep up.',
    audience: 'Every digital business is a target. CTOs and risk officers need robust protection that doesn’t stifle agility.',
    guide: 'Security is in our DNA. We don’t just patch holes; we build fortresses. AppforgeX ensures your growth is never compromised by risk.',
    solution: 'We provide comprehensive security solutions, from penetration testing to compliance consulting, protecting your digital assets and reputation.',
    emotion: 'Sleep soundly knowing your data, your customers, and your business are shielded by enterprise-grade security.',
    invitation: 'Can you afford to leave your business unprotected for another day?',
    cta: 'Secure Your Future',
    technologies: ['OWASP', 'Burp Suite', 'Nessus', 'Splunk', 'CrowdStrike'],
  },
  {
    id: 'database',
    icon: Database,
    title: 'Database Design & Development',
    problem: 'As data grows, poorly designed databases become bottlenecks that strangle performance and make scaling impossible.',
    audience: 'Tech leads face the nightmare of slow queries and data inconsistency that degrade the entire user experience.',
    guide: 'We are data architects. AppforgeX designs database schemas that are as elegant as they are efficient, built for the long haul.',
    solution: 'We deliver robust, scalable database solutions optimized for performance and reliability, ensuring your data layer is a solid foundation for growth.',
    emotion: 'Experience the power of instant data access and the reliability of a system that never forgets.',
    invitation: 'What would instant, reliable access to all your business data enable you to build next?',
    cta: 'Architect Your Data',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Snowflake'],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6 animate-fade-in-up opacity-0">
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              We Don't Just Write Code. <br />
              <span className="gradient-text">We Solve Business Problems.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0 stagger-2 max-w-2xl mx-auto">
              You have a vision. We have the roadmap. Together, we build technology that drives real growth, efficiency, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding space-y-24 md:space-y-32">
        {services.map((service, index) => (
          <div key={service.id} id={service.id} className="scroll-mt-24">
            <div className="container-custom">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                {/* Content Side */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} space-y-8`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary glow-effect">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                  </div>

                  {/* The Problem & Audience */}
                  <div className="bg-destructive/5 border border-destructive/10 p-6 rounded-xl">
                    <div className="flex gap-3 mb-2">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <h3 className="font-semibold text-destructive">The Challenge</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{service.problem}</p>
                    <p className="text-sm text-muted-foreground italic border-l-2 border-destructive/20 pl-3">
                      "{service.audience}"
                    </p>
                  </div>

                  {/* The Guide & Solution */}
                  <div className="space-y-4">
                    <p className="text-lg font-medium text-foreground">
                      {service.guide}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.solution}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Block */}
                  <div className="pt-4">
                    <Link to="/contact">
                      <Button size="lg" className="glow-effect hover:glow-effect-strong group">
                        {service.cta}
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Visual/Emotional Side */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-3xl -z-10" />
                  <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <service.icon className="w-48 h-48" />
                    </div>

                    <div className="relative z-10 space-y-8">
                      <div>
                        <h4 className="text-xl font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          The Outcome
                        </h4>
                        <p className="text-lg text-muted-foreground">
                          {service.emotion}
                        </p>
                      </div>

                      <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                        <p className="text-xl md:text-2xl font-serif italic text-foreground">
                          "{service.invitation}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-card border-t border-border">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to Write Your <span className="gradient-text">Success Story</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't let technology hold you back. Let's build the future of your business together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto glow-effect hover:glow-effect-strong">
                  Schedule Your Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
