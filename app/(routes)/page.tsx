'use client';

import { ArrowRight, Code, Smartphone, Brain, Shield, Database, Palette, Cog, Boxes, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Layout } from '@/app/components/layout/Layout';
import { SectionHeader } from '@/app/components/ui/section-header';
import { ServiceCard } from '@/app/components/ui/service-card';
import { StatCard } from '@/app/components/ui/stat-card';
import { FeatureCard } from '@/app/components/ui/feature-card';

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
  { value: '99.9%', label: 'Uptime' },
];

const features = [
  {
    title: 'Advanced Analytics',
    description: 'Real-time insights into your training progress and skill development.',
    icon: Database,
  },
  {
    title: 'Personalized Learning',
    description: 'AI-powered recommendations tailored to your learning style and goals.',
    icon: Brain,
  },
  {
    title: 'Expert Instructors',
    description: 'Learn from industry veterans with decades of combined experience.',
    icon: Users,
  },
  {
    title: 'Secure Platform',
    description: 'Enterprise-grade security with SSL encryption and data protection.',
    icon: Shield,
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Built on modern cloud infrastructure for optimal performance.',
    icon: Boxes,
  },
  {
    title: 'Community Support',
    description: 'Connect with fellow learners and get support from our dedicated team.',
    icon: Users,
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Master the <span className="text-blue-600">Technologies</span> of Tomorrow
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Comprehensive training portal with cutting-edge courses, expert instructors, and real-world projects.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/training">Get Started</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-2xl opacity-20" />
                <div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg p-8">
                  <Code className="w-32 h-32 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Our Services"
              subtitle="Comprehensive solutions for your learning and development needs"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Platform Features"
              subtitle="Everything you need for effective learning and skill development"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Ready to Transform Your Skills?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join thousands of professionals already learning with AppForGex. Start your free trial today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/training">
                  Start Learning <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
