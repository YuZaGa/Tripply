import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-cream-50/80 backdrop-blur-md border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Maintained the Tripply logo with text for brand recognition */}
          <img className="w-10 h-10 rounded-md shadow-sm" src="/logo.png" alt="Logo" />
          <span className="font-editorial-headline font-bold text-xl text-charcoal hidden sm:block">Tripply</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:flex items-center justify-center px-6 h-11 rounded-full bg-burnt-orange text-sm font-semibold text-white hover:bg-burnt-orange/90 hover:shadow-md transition-all duration-200">
            Log In
          </Link>
          <Link to="/create-trip" className="hidden sm:flex items-center justify-center px-6 h-11 rounded-full border border-charcoal/10 bg-cream-100 text-sm font-semibold text-charcoal hover:bg-white hover:shadow-sm transition-all duration-200">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;