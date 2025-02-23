
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
      whileHover={{ scale: 1.05 }}
      className="feature-card p-4 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 w-[200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-[450px] left-1/2 -translate-x-1/2 z-50"
        >
          <Card className="p-4 w-[300px] bg-black/90 border-primary/20">
            <p className="text-primary/90 text-center text-sm">{description}</p>
          </Card>
        </motion.div>
      )}
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

