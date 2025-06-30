export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 text-white px-6 py-4 h-25 fixed bottom-0 w-full z-50 shadow-[0_0_24px_0_rgba(0,0,0,0.25)]">
      <div className="max-w-6xl mx-auto flex items-center justify-center text-center">
        <p className="text-sm tracking-wide">
          &copy; {new Date().getFullYear()} <span className="font-semibold">ShramMitra</span> •{" "}
          <a href="mailto:support@shrammitra.in" className="underline hover:text-yellow-200">
            support@shrammitra.in
          </a>
        </p>
      </div>
    </footer>
  );
}
