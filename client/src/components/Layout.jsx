import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}