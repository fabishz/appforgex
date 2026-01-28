'use client';

import Link from 'next/link';

// Simplified imports - complex components temporarily commented out
// import { Layout } from '@/components/layout/Layout';
// import { Button } from '@/components/ui/button';
// import { SectionHeader } from '@/components/ui/section-header';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Simple Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Master the <span className="text-blue-600">Technologies</span> of Tomorrow
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive training portal with cutting-edge courses, expert instructors, and real-world projects.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/training" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
              <Link href="/about" className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Transform Your Skills?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of professionals already learning with AppForGex.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/training" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Learning
            </Link>
            <Link href="/contact" className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
