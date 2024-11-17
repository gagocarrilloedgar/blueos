export const ProjectSection = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="flex flex-col gap-2 w-full pb-10">
      <h3 className="text-sm font-bold text-primary">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
};
