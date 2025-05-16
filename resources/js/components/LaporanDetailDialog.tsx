import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type Laporan = {
  id: number;
  jenis_kebakaran: string;
  lokasi: string;
  nama_pelapor: string;
  notlp: string;
  status: string;
  foto: string[];
  lat: number;
  lng: number;
};

interface LaporanDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  laporan: Laporan | null;
}

export default function LaporanDetailDialog({ open, onOpenChange, laporan }: LaporanDetailDialogProps) {
  const [catatan, setCatatan] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Laporan</DialogTitle>
        </DialogHeader>

        {laporan ? (
          <div className="space-y-2">
            <div className="border-b p-4">
              <p><strong>ID:</strong> {laporan.id}</p>
              <p><strong>Lokasi Laporan:</strong> {laporan.lokasi}</p>
              <p><strong>Nama Pelapor:</strong> {laporan.nama_pelapor}</p>
              <p><strong>No HP Pelapor:</strong> {laporan.notlp}</p>
              <p><strong>Jenis :</strong> {laporan.jenis_kebakaran}</p>
              <p><strong>Laporan Foto:</strong></p>
              <div className="flex gap-2 overflow-x-auto py-2">
                {laporan.foto?.length > 0 ? (
                  laporan.foto.map((url, index) => (
                    <div key={index} className="min-w-64 h-64 border rounded overflow-hidden">
                      <img src={url} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Tidak ada foto tersedia.</p>
                )}
              </div>
            </div>

            <DialogHeader>
              <DialogTitle>Verifikasi Laporan</DialogTitle>
            </DialogHeader>

            <form className="space-y-4 mt-4">
              <p className="text-sm text-gray-700">
                Centang daftar kelengkapan data pelapor untuk verifikasi:
              </p>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  Lokasi jelas dan lengkap
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  Nomor HP pelapor aktif
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  Informasi kebakaran masuk akal
                </label>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Catatan Verifikasi:</p>
                <Textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} />
              </div>

              <div className="flex gap-4">
                <Button className="bg-green-500 hover:bg-green-800">Terima</Button>
                <Button className="bg-red-500 hover:bg-red-800">Tolak</Button>
              </div>
            </form>
          </div>
        ) : (
          <p>Memuat data...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
