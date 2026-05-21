import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-6">
            Built for creators
          </span>

          <h1 className="text-5xl md:text-7xl leading-[1.1] tracking-tight mb-6">
            Build something
            <br />
            <span className="text-primary">remarkable</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            The modern platform that helps you ship faster, iterate boldly, and craft experiences your users will love.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" className="px-8 py-6">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="hero-outline" size="lg" className="px-8 py-6">
              See how it works
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
