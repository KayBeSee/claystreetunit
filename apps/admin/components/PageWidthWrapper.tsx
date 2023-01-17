interface Props {
  className?: string;
  children: JSX.Element;
}

export const PageWidthWrapper = ({ children, className }: Props) => (
  <main className={`flex-1 ${className}`}>
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
    </div>
  </main>
);
