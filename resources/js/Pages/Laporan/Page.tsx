import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import DeleteTable from './Partials/DeleteTable';
import EditTable from './Partials/EditTable';
import UpdateTable from './Partials/UpdateTable';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import LaporanTable from '@/components/LaporanTable';
import LaporanDetailDialog from '@/components/LaporanDetailDialog';
import GrafikLaporanPie from '@/components/GrafikLaporanPie';
import DateRangePicker from '@/components/DateRangePicker';
import SearchInput from "@/components/SearchInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export default function Page() {
  const [laporan, setLaporan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
// ⬇️ Statistik Cepat DI DALAM Komponen
  const totalHariIni = laporan.filter(l =>
    new Date(l.waktu_lapor).toDateString() === new Date().toDateString()
  ).length;

  const totalDiproses = laporan.filter(l =>
    l.status?.toLowerCase() === 'di prosess'
  ).length;

  const totalSpam = laporan.filter(l =>
    l.status?.toLowerCase() === 'spam'
  ).length;



    const filteredLaporan = laporan.filter((laporan) => {
      const matchesSearch = laporan.nama_pelapor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "" || laporan.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

  const handleDetailClick = (laporan: any) => {
    setSelectedLaporan(laporan);
    setOpenDialog(true);
  };

  useEffect(() => {
    axios.get('/api/laporan')
      .then((response) => {
        setLaporan(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Gagal mengambil laporan:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthenticatedLayout>
      <Head title="Laporan Masuk" />

      <div className="grid md:grid-cols-8">
                    <div className="max-h-64 h-64 border rounded-xl m-2 md:col-span-5 p-4">
                      <h2 className="text-lg font-semibold mb-2 text-white">Statistik Cepat</h2>
                      <div className="flex items-center justify-around text-white gap-4 h-full">
                        <div className="bg-blue-600 p-4 rounded-xl shadow-md text-center">
                          <div className="text-xl font-bold">{totalHariIni}</div>
                          <div className="text-sm">Total Laporan masuk hari Ini</div>
                        </div>
                        <div className="bg-yellow-600 p-4 rounded-xl shadow-md text-center">
                          <div className="text-xl font-bold">{totalDiproses}</div>
                          <div className="text-sm">Total Laporan sedang diproses</div>
                        </div>
                        <div className="bg-red-600 p-4 rounded-xl shadow-md text-center">
                          <div className="text-xl font-bold">{totalSpam}</div>
                          <div className="text-sm">Total Laporan Spam</div>
                        </div>
                      </div>
                    </div>

        <div className="max-h-64 h-64 border rounded-xl m-2 md:col-span-3 flex items-center justify-center">
          <GrafikLaporanPie laporans={laporan} />
        </div>

      <div className="max-h-16 h-16 flex justify-around items-center md:col-span-8">
          <div className="text-white">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />

          </div>

          <div>
                <div className="w-48 text-white">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="menunggu">Menunggu</SelectItem>
                        <SelectItem value="Di prosess">Diproses</SelectItem>
                        <SelectItem value="spam">Spam</SelectItem>
                        <SelectItem value="selesai">Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                </div>
        <div className="md:grid-cols-2">
          <DateRangePicker className="text-red hover:text-base-800" onChange={(range) => console.log('Selected:', range)} />
        </div>
      </div>

      <div className="max-h-16 h-16 bg-cyan-300 md:col-span-8 hidden">Nav</div>

<div className="h-full min-h-screen border rounded-xl m-2 md:col-span-8 flex flex-col">
  <div className="flex-1 overflow-auto p-4">
    <LaporanTable laporans={filteredLaporan} onDetailClick={handleDetailClick} showMapButton={false} />
    <LaporanDetailDialog
      open={openDialog}
      onOpenChange={setOpenDialog}
      laporan={selectedLaporan}
    />
  </div>
</div>
      </div>
    </AuthenticatedLayout>
  );
}
