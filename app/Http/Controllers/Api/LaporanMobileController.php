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
            'jenis_kebakaran' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'nama_pelapor' => 'required|string|max:255',
            'notlp' => 'required|string|max:15',
            'status' => 'nullable|string|max:50',
            'catatan' => 'nullable|string|max:255',
        ]);

        $laporan = Laporan::create([
            'jenis_kebakaran' => $request->jenis_kebakaran,
            'lokasi' => $request->lokasi,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'nama_pelapor' => $request->nama_pelapor,
            'notlp' => $request->notlp,
            'status' => $request->status ?? 'menunggu',
            'catatan' => $request->catatan,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Laporan berhasil dikirim',
            'data' => $laporan
        ], 201);
    }
}
