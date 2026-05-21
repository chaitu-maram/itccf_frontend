import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Layers } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed at every layer. Your users feel the difference instantly.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security baked in from day one. Sleep well at night.",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description: "Understand your users with rich insights and real-time dashboards.",
  },
  {
    icon: Layers,
    title: "Composable",
    description: "Mix and match components to build exactly what you need, nothing more.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Powerful features designed to help you move fast without breaking things.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group rounded-2xl bg-card border border-border p-8 hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
