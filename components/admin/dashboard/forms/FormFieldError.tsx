export default function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-small text-error">{message}</p>;
}
