export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full h-full flex items-center justify-center">
      {children}
    </section>
  );
};
