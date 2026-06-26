import { Label } from '@/components/ui/label';

function FormLabel({ htmlFor, label }: { htmlFor?: string; label: string }) {
  return (
    <Label htmlFor={htmlFor} className=" uppercase tracking-[0.12em] ">
      {label}
    </Label>
  );
}

export default FormLabel;
