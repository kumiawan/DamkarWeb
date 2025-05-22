import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface Laporan {
  jenis_kebakaran: string;
}

interface Props {
  laporans: Laporan[];
}

// Mapping warna berdasarkan jenis kebakaran
const warnaJenis: Record<string, string> = {
  Kebakaran: '#ff0000', // merah
  Edukasi: '#00ffff', // biru
  Penyelamatan: '#ffff00', // kuning
};

export default function GrafikLaporanPie({ laporans }: Props) {
  const jenisMap: Record<string, number> = {};

  laporans.forEach((item) => {
    jenisMap[item.jenis_kebakaran] = (jenisMap[item.jenis_kebakaran] || 0) + 1;
  });

  const data = Object.entries(jenisMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <PieChart width={400} height={200}>
      <Pie
        data={data}
        innerRadius={50}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={warnaJenis[entry.name] || '#cccccc'} // default abu-abu jika jenis tak dikenali
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
