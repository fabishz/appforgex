import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/section-header';

const techCategories = [
  {
    name: 'Frontend',
    technologies: [
      { name: 'React', description: 'Component-based UI library' },
      { name: 'Next.js', description: 'Full-stack React framework' },
      { name: 'TypeScript', description: 'Type-safe JavaScript' },
      { name: 'Tailwind CSS', description: 'Utility-first CSS' },
      { name: 'Vue.js', description: 'Progressive framework' },
      { name: 'Angular', description: 'Enterprise framework' },
    ],
  },
  {
    name: 'Backend',
    technologies: [
      { name: 'Node.js', description: 'JavaScript runtime' },
      { name: 'Python', description: 'Versatile programming' },
      { name: 'Go', description: 'High-performance backend' },
      { name: 'Java', description: 'Enterprise applications' },
      { name: 'Rust', description: 'Systems programming' },
      { name: '.NET', description: 'Microsoft ecosystem' },
    ],
  },
  {
    name: 'Mobile',
    technologies: [
      { name: 'React Native', description: 'Cross-platform apps' },
      { name: 'Flutter', description: 'Google UI toolkit' },
      { name: 'Swift', description: 'Native iOS' },
      { name: 'Kotlin', description: 'Native Android' },
      { name: 'Expo', description: 'React Native toolchain' },
    ],
  },
  {
    name: 'AI & ML',
    technologies: [
      { name: 'TensorFlow', description: 'ML framework' },
      { name: 'PyTorch', description: 'Deep learning' },
      { name: 'OpenAI', description: 'GPT & AI APIs' },
      { name: 'LangChain', description: 'LLM orchestration' },
      { name: 'Hugging Face', description: 'NLP models' },
      { name: 'scikit-learn', description: 'ML algorithms' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    technologies: [
      { name: 'AWS', description: 'Amazon cloud' },
      { name: 'Google Cloud', description: 'GCP services' },
      { name: 'Azure', description: 'Microsoft cloud' },
      { name: 'Docker', description: 'Containerization' },
      { name: 'Kubernetes', description: 'Container orchestration' },
      { name: 'Terraform', description: 'Infrastructure as Code' },
    ],
  },
  {
    name: 'Databases',
    technologies: [
      { name: 'PostgreSQL', description: 'Relational database' },
      { name: 'MongoDB', description: 'Document database' },
      { name: 'Redis', description: 'In-memory cache' },
      { name: 'Elasticsearch', description: 'Search engine' },
      { name: 'Supabase', description: 'Backend as a service' },
      { name: 'Firebase', description: 'Google BaaS' },
    ],
  },
  {
    name: 'Design Tools',
    technologies: [
      { name: 'Figma', description: 'Collaborative design' },
      { name: 'Adobe XD', description: 'UX design' },
      { name: 'Sketch', description: 'Mac design tool' },
      { name: 'Blender', description: '3D modeling' },
      { name: 'After Effects', description: 'Motion graphics' },
    ],
  },
  {
    name: 'Security',
    technologies: [
      { name: 'OWASP', description: 'Security standards' },
      { name: 'Burp Suite', description: 'Security testing' },
      { name: 'Splunk', description: 'Security analytics' },
      { name: 'CrowdStrike', description: 'Endpoint protection' },
      { name: 'Vault', description: 'Secrets management' },
    ],
  },
];

const Technologies = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6 animate-fade-in-up opacity-0">
              Our Tech Stack
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
              Powered by <span className="gradient-text">Modern Technology</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up opacity-0 stagger-2">
              We leverage the best tools and frameworks to build scalable,
              high-performance solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {techCategories.map((category, catIndex) => (
              <div key={category.name} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-primary rounded-full" />
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {category.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-4 rounded-xl bg-card border border-border text-center card-hover"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 mx-auto flex items-center justify-center mb-3">
                        <span className="text-xl font-bold text-primary">{tech.name.charAt(0)}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{tech.name}</h4>
                      <p className="text-xs text-muted-foreground">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Technologies;
