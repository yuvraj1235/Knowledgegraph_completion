import { Search, Bell } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-background/60 backdrop-blur-xl z-40">
      {/* Left: Greeting */}
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-sm font-medium text-text-primary leading-tight">EduGraph AI</h2>
          <p className="text-xs text-text-muted leading-tight">Knowledge intelligence platform</p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center max-w-xs w-full">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
          <input
            type="text"
            placeholder="Search topics…"
            className="w-full h-8 pl-9 pr-3 text-xs bg-white/[0.03] border border-border rounded-lg text-text-primary focus:outline-none focus:border-border-hover focus:bg-white/[0.05] transition-all placeholder:text-text-muted"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-text-muted bg-white/[0.03] px-1.5 py-0.5 rounded border border-border font-mono">⌘K</kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-white/[0.03] transition-all relative">
          <Bell className="w-4 h-4" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-indigo/40 to-accent-violet/40 border border-white/10 flex items-center justify-center">
          <span className="text-[10px] font-semibold text-white/80">Y</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
