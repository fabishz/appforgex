import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export const StatCard = ({ value, label, className }: StatCardProps) => {
  return (
    <div className={cn('text-center p-6', className)}>
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        {value}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};
