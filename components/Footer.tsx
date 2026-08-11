import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-800 text-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} ChemAI. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center gap-6 text-sm text-slate-500">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}