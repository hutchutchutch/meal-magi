
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="feature-card p-6 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 w-[300px]"
  >
    <Icon className="feature-icon w-12 h-12 mx-auto mb-4 text-primary" />
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-muted-foreground text-center">{description}</p>
  </motion.div>
);

