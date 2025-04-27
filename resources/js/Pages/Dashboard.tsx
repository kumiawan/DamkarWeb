import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Button } from "@/components/ui/card";
export default function Dashboard({ laporans }) {
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
                <div className="h-80 md:col-span-3 bg-oren">
                map
                </div>
                <div className="bg-birudongker">
                    cuaca
                </div>
                <div className="h-96 md:col-span-3 overflow-auto p-4">
                    <h3 className="text-lg font-bold mb-4 text-white">Laporan Masuk</h3>

                    <div className="grid gap-4">
                    <Table>
                    <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">ID Laporan</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Nama Pelapor</TableHead>
                    <TableHead>No HP Pelapor</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Aksi</TableHead>
                    </TableRow>
                    </TableHeader>
                        <TableBody>
                    {laporans.map((laporan) => (
                        <TableRow >
                        <TableCell className="font-medium">{laporan.id}</TableCell>
                        <TableCell className="">{laporan.lokasi}</TableCell>
                        <TableCell>{laporan.nama_pelapor}</TableCell>
                        <TableCell>{laporan.no_hp_pelapor}</TableCell>
                        <TableCell>{laporan.jenis_kebakaran}</TableCell>
                        <TableCell>Lihat detail</TableCell>
                        </TableRow>
                    ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>
                <div className="bg-ijobonek">
                    status tim
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
