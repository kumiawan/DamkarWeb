// components/LaporanTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type Laporan = {
  id: number;
  jenis_kebakaran: string;
  lokasi: string;
  nama_pelapor: string;
  no_hp_pelapor: string;
  status: string;
  foto: string[];
  lat: number;
  lng: number;
};

interface LaporanTableProps {
  laporans: Laporan[];
  onDetailClick?: (laporan: Laporan) => void;
  onMapClick?: (lat: number, lng: number) => void;
  showMapButton?: boolean; // << Tambahan
}

export default function LaporanTable({ laporans, onDetailClick, onMapClick,showMapButton }: LaporanTableProps) {
  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Lokasi</TableHead>
            <TableHead>Nama Pelapor</TableHead>
            <TableHead>No HP Pelapor</TableHead>
            <TableHead>Jenis</TableHead>
            <TableHead>Aksi</TableHead>
            {showMapButton !== false && <TableHead>Lihat di Peta</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {laporans.map((laporan) => (
            <TableRow key={laporan.id}>
              <TableCell className="font-medium w-16">{laporan.id}</TableCell>
              <TableCell>{laporan.lokasi}</TableCell>
              <TableCell>{laporan.nama_pelapor}</TableCell>
              <TableCell>{laporan.no_hp_pelapor}</TableCell>
              <TableCell>{laporan.jenis_kebakaran}</TableCell>
              <TableCell>
                <Button
                  className="bg-white text-black hover:bg-slate-300"
                  onClick={() => onDetailClick?.(laporan)}
                >
                  Lihat Detail
                </Button>
              </TableCell>
              {showMapButton !== false && (
                <TableCell>
                  <Button
                    className="bg-white text-black hover:bg-slate-300"
                    onClick={() => onMapClick?.(laporan.lat, laporan.lng)}
                  >
                    Cek
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
    </Table>
  );
}
