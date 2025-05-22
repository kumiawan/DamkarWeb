import { useState } from 'react';

interface EditTableProps {
  id: number;
}

export default function EditTable({ id }: EditTableProps) {
  // Logic untuk mengedit laporan
  return (
    <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
  );
}
