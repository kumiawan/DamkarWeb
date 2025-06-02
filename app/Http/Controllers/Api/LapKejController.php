<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Laporan;

class LapKejController extends Controller
{
    public function store(Request $request)
    {
        // Validasi data
        $validated = $request->validate([
            'jenis_kebakaran' => 'required|string',
            'lokasi' => 'required|string',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'nama_pelapor' => 'required|string',
            'notlp' => 'required|string',
            'status' => 'nullable|string',
            'catatan' => 'nullable|string',
            'foto.*' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $fotoPaths = [];

        if ($request->hasFile('foto')) {
            $fotos = $request->file('foto');

            if (!is_array($fotos)) {
                $fotos = [$fotos];
            }

            foreach ($fotos as $foto) {
                $filename = uniqid() . '_' . $foto->getClientOriginalName();
                $foto->move(public_path('fotoKebakaran'), $filename);
                $fotoPaths[] = 'fotoKebakaran/' . $filename;
            }
        }

        // Tambahkan path foto ke data yang disimpan
        $validated['foto'] = $fotoPaths;

        // Simpan ke database
        $laporan = Laporan::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil disimpan.',
            'data' => $laporan,
        ], 201);
    }
}
