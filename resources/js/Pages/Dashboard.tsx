import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import MapView from '@/components/ui/MapView';
import WeatherWidget from '@/components/ui/WeatherWidget';
import { useState, useEffect} from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog'
import Checkbox from '@/components/Checkbox';
import { Textarea } from '@/components/ui/textarea';


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
interface DashboardProps {
  laporans: Laporan[];
}

export default function Dashboard(props: DashboardProps) {

const [laporans, setLaporans] = useState<Laporan[]>(props.laporans);
    useEffect(() => {
    let isMounted = true ;
      const fetchLaporans = async () => {
          const response = await fetch('/api/laporan');
          const data = await response.json()
          setLaporans(data);
      };

      fetchLaporans();
      const interval = setInterval(fetchLaporans, 30000);

  return () => {
    isMounted = false;
    clearInterval(interval);
  };
    }, []);


const markers = laporans.map((laporan) => ({
  lat: laporan.lat,
  lng: laporan.lng,
  jenis: laporan.jenis_kebakaran,
}));

const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng:number} | null >(null)

const [open, setOpen] = useState(false)
const [selectedLaporan, setSelectedLaporan] = useState<Laporan | null>(null)

const handleOpenModal = (laporan: Laporan) => {
  setSelectedLaporan(laporan)
  setOpen(true)
}
  return (
    <AuthenticatedLayout
      header={
        <div className="grid sm:flex sm:text-center gap-2 justify-between">
          <h2 className="text-xl underline underline-offset-8 decoration-2 decoration-red-600 font-semibold text-white">
            Pemantauan
          </h2>
          <h2 className="rounded rounded-lg text-lg px-4 py-2 text-white bg-birutuek">
            Posko Kota Jember
          </h2>
        </div>
      }
    >
      <Head title="Pemantauan" />

      <div className="grid md:grid-cols-4">
        <div className="max-h-80 md:col-span-3 bg-oren border rounded rounded-lg border-blue-600 m-2">
          <MapView markers={markers} selectedLocation={selectedLocation}/>
        </div>

        <div className="flex bg-gradient-to-b from-birudongker to-birutuek items-center justify-center max-h-80 border rounded rounded-lg border-blue-600 m-2">
          <WeatherWidget city="Jember" />
        </div>

        <div className="h-96 md:col-span-4 p-4 border rounded rounded-lg border-blue-600 m-2 bg-gradient-to-b from-birudongker to-birutuek ">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Laporan Masuk</h3>
          </div>
          <div className="grid gap-4">
            <div className="overflow-x-auto sm:overflow-x-hidden max-h-80">
              <div className="sticky top-0 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">ID</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Nama Pelapor</TableHead>
                      <TableHead>No HP Pelapor</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Aksi</TableHead>
                      <TableHead>Lihat di Peta</TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <Table>
                  <TableBody>
                    {laporans.map((laporan) => (
                      <TableRow key={laporan.id}>
                        <TableCell className="font-medium w-16">
                          {laporan.id}
                        </TableCell>
                        <TableCell>{laporan.lokasi}</TableCell>
                        <TableCell>{laporan.nama_pelapor}</TableCell>
                        <TableCell>{laporan.notlp}</TableCell>
                        <TableCell>{laporan.jenis_kebakaran}</TableCell>
                        <TableCell>
                        <Button
                        className="bg-white text-black hover:bg-slate-300"
                            onClick={() => handleOpenModal(laporan)}
                          >
                            Lihat Detail
                          </Button>

                          </TableCell>
                        <TableCell>
                        <Button
                        className="bg-white text-black hover:bg-slate-300"
                            onClick={() => setSelectedLocation({ lat:laporan.lat, lng:laporan.lng})}
                          >
                            Cek
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                <DialogHeader>
                <DialogTitle>Detail Laporan</DialogTitle>
                </DialogHeader>
                {selectedLaporan ? (
                    <div className="space-y-2">

                    <div className="border-b p-4">
                    <p><strong>ID:</strong> {selectedLaporan.id}</p>
                    <p><strong>Lokasi Laporan:</strong> {selectedLaporan.lokasi}</p>
                    <p><strong>Nama Pelapor:</strong> {selectedLaporan.nama_pelapor}</p>
                    <p><strong>No HP Pelapor:</strong> {selectedLaporan.no_hp_pelapor}</p>
                    <p><strong>Catatan Pelapor:</strong> {selectedLaporan.jenis_kebakaran}</p>
                    <p><strong>Laporan Foto:</strong> </p>
                    <div className="flex gap-2 overflow-x-auto py-2">
                    {selectedLaporan.foto?.length > 0 ? (
                        selectedLaporan.foto.map((url: string, index: number) => (
                            <div key={index} className="min-w-64 h-64 border rounded overflow-hidden">
                            <img
                            src={url}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-full object-cover"
                            />
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
    <Textarea/>
  </div>
  foto
  <div className="flex gap-4">
    <Button className="bg-green-500 hover:bg-green-800"> Terima </Button>
    <Button className="bg-red-500 hover:bg-red-800"> Tolak </Button>
  </div>
</form>

                    </div>
                ) : (
                <p>Memuat data...</p>
                )}
                </DialogContent>
                </Dialog>

              </div>
            </div>
          </div>
        </div>
        <div className="hidden p-2 border rounded rounded-lg border-blue-600 m-2 bg-gradient-to-b from-birudongker to-birutuek ">
          <h3 className="text-lg font-bold mb-4 text-white">Status Tim</h3>
          <div>
            <ul className="flex items-center gap-2 text-white text-xs mb-4">
              <li className="w-2 h-2 bg-green-500 rounded rounded-full"> </li>
              <span>Tersedia</span>
              <li className="w-2 h-2 bg-red-500 rounded rounded-full"> </li>
              <span>Dalam Tugas</span>
              <li className="w-2 h-2 bg-yellow-500 rounded rounded-full"> </li>
              <span>Siaga</span>
            </ul>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Tim B</CardTitle>
              <CardDescription>Jln.Merdeka No.12</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Kebakaran Gudang</p>
            </CardContent>
            <CardFooter>
              <p>08989000222</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
