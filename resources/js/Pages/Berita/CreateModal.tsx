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
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/berita', {
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData('judul', e.target.value)
                }
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Penulis</label>
              <input
                type="text"
                value={data.penulis}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData('penulis', e.target.value)
                }
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Isi</label>
              <textarea
                value={data.isi}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setData('isi', e.target.value)
                }
                className="w-full border rounded px-3 py-2"
                required
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
              <Button type="submit" disabled={processing}>
                Simpan
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
