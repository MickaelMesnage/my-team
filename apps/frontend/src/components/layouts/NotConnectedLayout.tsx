export const NotConnectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="w-full h-full bg-blue-100 flex items-center justify-center">
      {children}
    </section>
  );
};
