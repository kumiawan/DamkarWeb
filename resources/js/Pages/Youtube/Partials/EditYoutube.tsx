import { useForm } from '@inertiajs/react';
import { Dialog } from '@headlessui/react';
import { useEffect } from 'react';
import { Youtube } from '@/Types/Youtube';
import { router } from '@inertiajs/react';

interface EditYoutubeProps {
  isOpen: boolean;
  onClose: () => void;
  youtube: Youtube | null;
}

export default function EditYoutube({
  isOpen,
  onClose,
  youtube,
}: EditYoutubeProps) {
  const { data, setData, reset, errors } = useForm({
    linkYoutube: '',
  });

  useEffect(() => {
    if (youtube) {
      setData({ linkYoutube: youtube.linkYoutube });
    }
  }, [youtube]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!youtube) return;

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('linkYoutube', data.linkYoutube);

    router.post(`/youtube/${youtube.id}`, formData, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  if (!youtube) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white p-6 rounded shadow max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold mb-4">Edit Link Youtube</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Link YouTube</label>
              <input
                type="text"
                value={data.linkYoutube}
                onChange={(e) => setData('linkYoutube', e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
              {errors.linkYoutube && (
                <p className="text-sm text-red-500">{errors.linkYoutube}</p>
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
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
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
