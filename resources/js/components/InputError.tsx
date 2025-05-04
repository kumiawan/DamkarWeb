export function InputError({ message, className = '' }: { message?: string; className?: string }) {
  if (!message) return null;

  return <p className={`text-sm text-red-600 ${className}`}>{message}</p>;
}
