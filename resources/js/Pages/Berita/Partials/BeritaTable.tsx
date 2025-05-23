import { router } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Berita } from '@/Types/Berita';

type BeritaTableProps = {
  data: Berita[];
  onEdit: (berita: Berita) => void;
  onDelete: (id: number) => void;
};

export default function BeritaTable({
  data,
  onEdit,
  onDelete,
}: BeritaTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">ID</TableHead>
          <TableHead>Judul</TableHead>
          <TableHead>Penulis</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((berita) => (
          <TableRow key={berita.id}>
            <TableCell className="font-medium">{berita.id}</TableCell>
            <TableCell>{berita.judul}</TableCell>
            <TableCell>{berita.penulis}</TableCell>
            <TableCell>
              {new Date(berita.created_at || '').toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </TableCell>
            <TableCell className="space-x-2">
              <Button
                className="bg-white text-black hover:bg-slate-300"
                onClick={() => onEdit(berita)}
              >
                Edit
              </Button>
              <Button variant="destructive" onClick={() => onDelete(berita.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
