
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title }: FeatureCardProps) => {
  // Split the title into two parts at the \n character
  const [firstLine, secondLine] = title.split("\\n");

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="feature-card p-4 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 w-[200px]"
    >
      <Icon className="feature-icon mx-auto mb-2" />
      <div className="flex flex-col items-center">
        <h3 className="font-medium text-center">
          <span className="block">{firstLine}</span>
          <span className="block">{secondLine}</span>
        </h3>
      </div>
    </motion.div>
  );
};
