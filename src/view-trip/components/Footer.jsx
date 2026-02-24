import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="w-full py-8 border-t border-charcoal/5 bg-cream-50 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 flex justify-center text-sm text-slate-muted font-medium">
        <p className="font-serif italic text-base">Made with 💖 by <a href="https://yumngauhar.fyi" target="_blank" rel="noopener noreferrer" className="hover:text-burnt-orange">YuZaGa</a> &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer