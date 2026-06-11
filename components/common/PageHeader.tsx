interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-[#F4F4F5] mb-2">{title}</h1>
        {description && <p className="text-[#A1A1AA]">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
