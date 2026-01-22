import { cn } from '@/lib/utils';

interface TechBadgeProps {
  name: string;
  icon?: string;
  className?: string;
}

export const TechBadge = ({ name, icon, className }: TechBadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-200 cursor-default',
        className
      )}
    >
      {icon && <img src={icon} alt={name} className="w-5 h-5" />}
      {name}
    </div>
  );
};
