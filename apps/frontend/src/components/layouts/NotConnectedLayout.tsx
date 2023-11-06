export const NotConnectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section
      className="bg-blue-100 flex items-center justify-center"
      style={{ width: "100vw", height: "100dvh" }}
    >
      {children}
    </section>
  );
};
