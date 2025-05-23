import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import DeleteTable from './Partials/DeleteTable';
import EditTable from './Partials/EditTable';
import UpdateTable from './Partials/UpdateTable';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import LaporanTable from '@/components/LaporanTable';
import LaporanDetailDialog from '@/components/LaporanDetailDialog';
import GrafikLaporanPie from '@/components/GrafikLaporanPie';
import DateRangePicker from '@/components/DateRangePicker';
import SearchInput from '@/components/SearchInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRange } from 'react-day-picker';

export default function Page() {
  const [laporan, setLaporan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('menunggu');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const fetchLaporan = async () => {
    try {
      const response = await axios.get('/api/laporan');
      setLaporan(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Gagal mengambil laporan:', error);
      setLoading(false);
    }
  };

  // Statistik Cepat
  const totalHariIni = laporan.filter(
    (l) => new Date(l.waktu_lapor).toDateString() === new Date().toDateString(),
  ).length;

  const totalLaporanSelesai = laporan.filter(
    (l) => l.status?.toLowerCase() === 'selesai',
  ).length;

  const totalSpam = laporan.filter(
    (l) => l.status?.toLowerCase() === 'spam',
  ).length;

  const filteredLaporan = useMemo(() => {
    return laporan.filter((laporan) => {
      const laporanDate = new Date(laporan.waktu_lapor);
      const matchesSearch = laporan.nama_pelapor
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === '' ||
        laporan.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesDateRange =
        !dateRange?.from || !dateRange?.to
          ? true
          : (() => {
              const start = new Date(dateRange.from!);
              const end = new Date(dateRange.to!);
              end.setHours(23, 59, 59, 999);
              return laporanDate >= start && laporanDate <= end;
            })();

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [laporan, searchQuery, statusFilter, dateRange]);

  const handleDetailClick = (laporan: any) => {
    setSelectedLaporan(laporan);
    setOpenDialog(true);
  };

  const handleDeleteClick = (laporan: any) => {
    setSelectedLaporan(laporan);
    setOpenDialog(true);
  };

  // Auto-refresh tiap 30 detik
  useEffect(() => {
    let isMounted = true;

    const fetchAndSet = async () => {
      try {
        const response = await axios.get('/api/laporan');
        if (isMounted) {
          setLaporan(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Gagal mengambil laporan:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAndSet();
    const interval = setInterval(fetchAndSet, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl underline underline-offset-8 decoration-2 decoration-red-600 font-semibold text-white">
          Laporan Masuk
        </h2>
      }
    >
      <Head title="Laporan Masuk" />

      <div className="grid md:grid-cols-8">
        {/* Statistik Cepat */}
        <div className="max-h-64 h-64 border rounded-xl m-2 md:col-span-5 p-4">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Statistik Cepat
          </h2>
          <div className="flex items-center justify-around text-white gap-4 h-full">
            <div className="bg-blue-600 p-4 rounded-xl shadow-md text-center">
              <div className="text-xl font-bold">{totalHariIni}</div>
              <div className="text-sm">Total Laporan hari ini</div>
            </div>
            <div className="bg-yellow-600 p-4 rounded-xl shadow-md text-center">
              <div className="text-xl font-bold">{totalLaporanSelesai}</div>
              <div className="text-sm">Laporan Selesai</div>
            </div>
            <div className="bg-red-600 p-4 rounded-xl shadow-md text-center">
              <div className="text-xl font-bold">{totalSpam}</div>
              <div className="text-sm">Laporan Spam</div>
            </div>
          </div>
        </div>

        {/* Grafik Pie */}
        <div className="max-h-64 h-64 border rounded-xl m-2 md:col-span-3 flex items-center justify-center">
          <GrafikLaporanPie laporans={laporan} />
        </div>

        {/* Search, Filter, Date */}
        <div className="max-h-16 h-16 flex justify-around items-center md:col-span-8">
          <div className="text-white">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="w-48 text-white">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="menunggu">Menunggu</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:grid-cols-2">
            <div className="flex gap-2 items-center">
              <DateRangePicker
                value={dateRange}
                onChange={(range) => setDateRange(range)}
              />
              <button
                onClick={() => setDateRange(undefined)}
                className={`text-white border bg-red-600 rounded px-2 py-1 hover:bg-red-700 transition duration-200 ${
                  dateRange?.from
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
                title="Reset tanggal"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder Nav */}
        <div className="max-h-16 h-16 bg-cyan-300 md:col-span-8 hidden">
          Nav
        </div>

        {/* Table Laporan */}
        <div className="h-full min-h-screen border rounded-xl m-2 md:col-span-8 flex flex-col">
          <div className="flex-1 overflow-auto p-4">
            <LaporanTable
              laporans={filteredLaporan}
              onDetailClick={handleDetailClick}
              onDeleteClick={handleDeleteClick}
              showMapButton={false}
            />
            <LaporanDetailDialog
              open={openDialog}
              onOpenChange={setOpenDialog}
              laporan={selectedLaporan}
              onRefresh={fetchLaporan}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
