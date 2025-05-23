import { useForm } from '@inertiajs/react';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import React from 'react';

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateModal({ open, onClose }: CreateModalProps) {
  const { data, setData, post, processing, reset } = useForm({
    judul: '',
    penulis: '',
    isi: '',
    foto: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post('/berita', {
      forceFormData: true,
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen bg-black/40">
        <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
          <Dialog.Title className="text-lg font-bold mb-4">
            Tambah Berita
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Judul</label>
              <input
                type="text"
                value={data.judul}
                onChange={(e) => setData('judul', e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Penulis</label>
              <input
                type="text"
                value={data.penulis}
                onChange={(e) => setData('penulis', e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Isi</label>
              <textarea
                value={data.isi}
                onChange={(e) => setData('isi', e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Foto (opsional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setData('foto', e.target.files?.[0] || null)}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
              >
                Simpan
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
