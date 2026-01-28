import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  featured?: boolean;
}

export const ServiceCard = ({
  icon: Icon,
  title,
  description,
  className,
  featured = false,
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        'group relative p-6 md:p-8 rounded-2xl bg-card border border-border card-hover',
        featured && 'gradient-border',
        className
      )}
    >
      <div
        className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300',
          featured
            ? 'bg-primary text-primary-foreground glow-effect group-hover:glow-effect-strong'
            : 'bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground'
        )}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};
