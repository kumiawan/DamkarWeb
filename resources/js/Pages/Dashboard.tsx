import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Table } from '@components/ui/table.tsx'

export default function Dashboard() {
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

    <div class="grid md:grid-cols-4">
        <div class="h-80 md:col-span-3 bg-oren">
        map
        </div>
        <div class="bg-birudongker">cuaca</div>
        <div class="h-96 md:col-span-3 bg-green-300">table</div>
        <div class="bg-ijobonek">status tim</div>
    </div>
        </AuthenticatedLayout>
    );
}
