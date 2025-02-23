
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [firstLine, secondLine] = title.split("\\n");

  return (
    <motion.div
      whileHover={{ scale: 1.0 }}
      className="relative feature-card p-4 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[150px] left-1/2 -translate-x-1/2 z-50 w-[300px]"
        >
          <Card className="p-4 bg-black/90 border-primary/20">
            <p className="text-primary/90 text-center text-sm">{description}</p>
          </Card>
        </motion.div>
      )}
      <Icon className="feature-icon mx-auto mb-2" />
      <div className="flex flex-col items-center">
        <h3 className={`text-center ${isHovered ? 'font-bold' : 'font-medium'}`}>
          <span className="block">{firstLine}</span>
          <span className="block">{secondLine}</span>
        </h3>
      </div>
    </motion.div>
  );
};
