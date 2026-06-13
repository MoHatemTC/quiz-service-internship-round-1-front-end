import React from 'react';

function DashboardHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="w-full text-center lg:text-start">
      <h1 className="text-h1 text-primary-100">{title}</h1>
      <p className="text-body text-primary-200">{description}</p>
    </div>
  );
}

export default DashboardHeader;
