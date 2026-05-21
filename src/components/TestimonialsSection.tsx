import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Archway transformed how we ship products. We went from monthly releases to daily deploys.",
    name: "Sarah Chen",
    role: "CTO, Lumina",
  },
  {
    quote: "The best developer experience I've encountered. It just gets out of your way and lets you build.",
    name: "Marcus Rivera",
    role: "Lead Engineer, Focal",
  },
  {
    quote: "We cut our development time in half. Our team has never been more productive or happier.",
    name: "Aisha Patel",
    role: "VP Engineering, Orbit",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl tracking-tight mb-4">
            Loved by builders
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Join thousands of teams shipping with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-background border border-border p-8"
            >
              <p className="text-foreground leading-relaxed mb-6 text-[15px]">
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
