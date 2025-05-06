import { useState } from 'react';

interface UpdateTableProps {
  id: number;
}

export default function UpdateTable({ id }: UpdateTableProps) {
  // Logic untuk memperbarui status laporan
  return (
    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
      Update Status
    </button>
  );
}
