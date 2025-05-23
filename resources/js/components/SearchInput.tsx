import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor="search">Cari Nama</Label>
      <Input
        id="search"
        type="text"
        placeholder={placeholder || 'Cari data...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
