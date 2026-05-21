const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Archway
        </span>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 Archway. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
