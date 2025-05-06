import { useState } from 'react';
import axios from 'axios';

interface DeleteTableProps {
  id: number;
}

export default function DeleteTable({ id }: DeleteTableProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`/api/laporan/${id}`)
      .then(() => {
        setLoading(false);
        alert('Laporan berhasil dihapus');
        // Refresh data atau lakukan tindakan lain
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error deleting laporan:', error);
        alert('Gagal menghapus laporan');
      });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded"
      disabled={loading}
    >
      {loading ? 'Menghapus...' : 'Hapus'}
    </button>
  );
}
