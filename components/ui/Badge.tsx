import type { BadgeProps } from '@/types';

function Badge({ variant }: BadgeProps) {
  const getVariantStyles = (variant: 'PUBLISHED' | 'DRAFT') => {
    switch (variant) {
      case 'PUBLISHED':
        return 'bg-success/10 text-success';
      case 'DRAFT':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded text-sm font-medium uppercarse ${getVariantStyles(variant)}`}
    >
      {variant}
    </span>
  );
}

export default Badge;
