import { useForm } from '@inertiajs/react';
import { Dialog } from '@headlessui/react';
import { useEffect } from 'react';
import { Berita } from '@/Types/Berita';

interface EditBeritaProps {
  isOpen: boolean;
  onClose: () => void;
  berita: Berita | null;
}

export default function EditBerita({
  isOpen,
  onClose,
  berita,
}: EditBeritaProps) {
  const { data, setData, put, processing, reset, errors } = useForm({
    judul: '',
    penulis: '',
    isi: '',
  });

  useEffect(() => {
    if (berita) {
      setData({
        judul: berita.judul,
        penulis: berita.penulis,
        isi: berita.isi,
      });
    }
  }, [berita]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!berita) return;

    put(`/berita/${berita.id}`, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  if (!berita) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Edit Berita
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Judul</label>
              <input
                type="text"
                value={data.judul}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData('judul', e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
              {errors.judul && (
                <p className="text-sm text-red-500">{errors.judul}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Penulis</label>
              <input
                type="text"
                value={data.penulis}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData('penulis', e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
              {errors.penulis && (
                <p className="text-sm text-red-500">{errors.penulis}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Isi</label>
              <textarea
                value={data.isi}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setData('isi', e.target.value)
                }
                className="w-full border rounded px-3 py-2"
                rows={4}
              />
              {errors.isi && (
                <p className="text-sm text-red-500">{errors.isi}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  onClose();
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Simpan
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
