type ContainerProps = {
  children: React.ReactNode;
  size?: 'page' | 'quiz';
};

export default function Container({ children, size = 'page' }: ContainerProps) {
  const maxWidth = size === 'quiz' ? 'max-w-[720px]' : 'max-w-[1200px]';
  return (
    <div className={`mx-auto w-full px-6 ${maxWidth}`}>{children}</div>
  );
}
