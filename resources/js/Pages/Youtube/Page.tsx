import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import CreateModal from './CreateModal';
import YoutubeTable from './Partials/YoutubeTable';
import EditYoutube from './Partials/EditYoutube';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Youtube } from '@/Types/Youtube';

interface IndexProps {
  youtube: Youtube[];
}

export default function Index({ youtube }: IndexProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedYoutube, setSelectedYoutube] = useState<Youtube | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (item: Youtube) => {
    setSelectedYoutube(item);
    setShowEditModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus youtube ini?')) {
      router.delete(`/youtube/${id}`);
    }
  };

  const filteredYoutube = youtube.filter((item) =>
    item.linkYoutube.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl underline underline-offset-8 decoration-2 decoration-red-600 font-semibold text-white">
          Youtube
        </h2>
      }
    >
      <Head title="Youtube" />
      <div className="p-6">
        <div className="flex justify-between mb-4 gap-4 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="text-white font-semibold">
              Cari Link:
            </label>
            <Input
              id="search"
              placeholder="Masukkan link..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 text-white"
            />
          </div>

          <Button
            className="bg-green-600 hover:bg-green-800"
            onClick={() => setShowCreateModal(true)}
          >
            + Tambah Link
          </Button>
        </div>

        <YoutubeTable
          data={filteredYoutube}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CreateModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />

        <EditYoutube
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedYoutube(null);
          }}
          youtube={selectedYoutube}
        />
      </div>
    </AuthenticatedLayout>
  );
}
