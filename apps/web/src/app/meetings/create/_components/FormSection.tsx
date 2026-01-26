import type { ReactNode } from 'react';

interface FormSectionProps {
  label: string;
  children: ReactNode;
}

const FormSection = ({ label, children }: FormSectionProps) => {
  return (
    <section className="flex flex-col gap-1 select-none">
      <h3 className="label-1 text-sm font-medium text-neutral-700">{label}</h3>
      {children}
    </section>
  );
};

export default FormSection;
