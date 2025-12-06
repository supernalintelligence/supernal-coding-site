import Link from 'next/link';
import CompetitiveComparison from '@/components/CompetitiveComparison';
import HomepageFeatures from '@/components/HomepageFeatures';
import { GridPattern } from '@/components/ui/Patterns';
import WorkflowDiagram from '@/components/WorkflowDiagram';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - matching Docusaurus */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <GridPattern className="opacity-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            AI Accelerated Development
          </h1>

          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Build production-ready software faster with AI agents guided by
            structured workflows, priorities, and continuous iteration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              style={{
                clipPath:
                  'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%, 0 12px)'
              }}
            >
              Start Building
            </Link>
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-0.5"
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))'
              }}
            >
              Why Supernal?
            </Link>
            <a
              href="http://localhost:3006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:-translate-y-0.5"
              style={{
                clipPath:
                  'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
              }}
            >
              See It In Action
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            The Challenge
          </h2>
          <p className="text-xl sm:text-2xl text-red-600 dark:text-red-400 font-semibold mb-4">
            Developing quickly with AI needs to be done right.
          </p>
          <p className="text-xl sm:text-2xl text-red-600 dark:text-red-400 font-semibold mb-8">
            Developing compliance systems quickly is even harder.
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            AI agents can generate code fast, but without structure, priorities,
            and traceability, you end up with technical debt, compliance gaps,
            and features that miss the mark.
          </p>
        </div>
      </section>

      {/* Workflow Diagram - The animated wheel */}
      <WorkflowDiagram type="task-lifecycle" />

      {/* Solution Section with Features */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Supernal Coding Provides the Structure.
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Your people work with AI agents to create code that measurably
              solves problems.
            </p>
          </div>

          <HomepageFeatures />
        </div>
      </section>

      {/* Competitive Comparison */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompetitiveComparison />
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Build Better Software?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Join developers using Supernal Coding to ship compliant,
            high-quality software with AI-accelerated workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              style={{
                clipPath:
                  'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%, 0 12px)'
              }}
            >
              Get Started
            </Link>
            <a
              href="https://github.com/supernalintelligence/supernal-coding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-0.5"
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))'
              }}
            >
              <svg
                height="24"
                viewBox="0 0 16 16"
                width="24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer Message */}
      <section className="py-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-semibold text-white tracking-wide">
            Build Smarter. Ship Faster. Stay Compliant.
          </p>
        </div>
      </section>
    </div>
  );
}
