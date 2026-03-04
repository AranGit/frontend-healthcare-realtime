interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FormSection = ({ title, children }: FormSectionProps) => (
  <section className="space-y-4 pt-4 border-t border-slate-200 first:border-0 first:pt-0">
    <h3 className="text-md font-bold text-blue-600 uppercase tracking-tight">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </section>
);
