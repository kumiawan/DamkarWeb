import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Youtube } from '@/Types/Youtube';

type YoutubeTableProps = {
  data: Youtube[];
  onEdit: (youtube: Youtube) => void;
  onDelete: (id: number) => void;
};

export default function YoutubeTable({
  data,
  onEdit,
  onDelete,
}: YoutubeTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">ID</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((youtube) => (
          <TableRow key={youtube.id}>
            <TableCell className="font-medium">{youtube.id}</TableCell>
            <TableCell>
              <a
                href={youtube.linkYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline"
              >
                {youtube.linkYoutube}
              </a>
            </TableCell>
            <TableCell className="space-x-2">
              <Button
                className="bg-white text-black hover:bg-slate-300"
                onClick={() => onEdit(youtube)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete(youtube.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
