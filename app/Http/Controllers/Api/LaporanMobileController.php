<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Laporan;

class LaporanMobileController extends Controller
{
    /**
     * Menyimpan data laporan dari aplikasi mobile.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_pelapor' => 'required|string|max:255',
            'notlp' => 'required|string|max:15',
            'waktu_lapor' => 'required|date',
            'jenis_kebakaran' => 'required|string|max:100',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'lokasi' => 'required|string|max:255',
            'catatan' => 'nullable|string',
            'foto.*' => 'image|mimes:jpeg,png,jpg,heic|max:2048',
        ]);

        $paths = [];

        if ($request->hasFile('foto')) {
            foreach ($request->file('foto') as $image) {
                $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('fotoKebakaran');
                $image->move($destinationPath, $filename);

                // Simpan path relatif, misal: '/fotoKebakaran/nama_file.jpg'
                $paths[] = '/fotoKebakaran/' . $filename;
            }
        }

        $laporan = Laporan::create([
            'nama_pelapor' => $request->nama_pelapor,
            'notlp' => $request->notlp,
            'waktu_lapor' => $request->waktu_lapor ?? now(), // fallback ke sekarang
            'jenis_kebakaran' => $request->jenis_kebakaran,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'lokasi' => $request->lokasi,
            'catatan' => $request->catatan,
            'status' => 'menunggu', // default
            'foto' => json_encode($paths),
        ]);

        return response()->json([
            'message' => 'Laporan berhasil disimpan',
        ], 200);
    }
}
