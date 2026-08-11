import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-indigo-500 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to master chemistry?
        </h2>
        <p className="mt-6 text-lg leading-8 text-indigo-100 max-w-2xl">
          Join thousands of students who have upgraded their study routine with our premium AI tutor. Start your free trial today.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/signup" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-500 shadow-sm hover:bg-indigo-50 transition-colors">
            Start Free Trial
          </Link>
          <Link href="#features" className="text-sm font-semibold leading-6 text-white hover:text-indigo-100 transition-colors">
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}