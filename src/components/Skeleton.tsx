interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

const Skeleton = ({ 
  className = '', 
  variant = 'rectangular',
  width = '100%',
  height = '20px'
}: SkeletonProps) => {
  const baseClass = 'animate-pulse bg-surfaceHighlight';
  
  const variantClass = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  }[variant];

  return (
    <div 
      className={`${baseClass} ${variantClass} ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
