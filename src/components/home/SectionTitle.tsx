import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  linked?: boolean;
}

export const SectionTitle = ({ title, subtitle, className, linked = false }: SectionTitleProps) => {
  const TitleContent = () => (
    <div className={cn("text-center", className)}>
      <h2 className="text-4xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );

  if (linked) {
    return (
      <Link href="/about">
        <TitleContent />
      </Link>
    );
  }

  return <TitleContent />;
};

export default SectionTitle;
