<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function index()
    {
        $laporan = Laporan::latest()->get();
        return response()->json($laporan,200);
    }

    public function create(Request $req)
    {
        $req->validate([
            'jenis_kebakaran' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'nama_pelapor' => 'required|string|max:255',
            'no_hp_pelapor' => 'required|string|max:15',
            'status' => 'nullable|string|max:50',
        ]);

        $laporan = Laporan::create([
            'jenis_kebakaran' => $req->jenis_kebakaran,
            'lokasi' => $req->lokasi,
            'nama_pelapor' => $req->nama_pelapor,
            'no_hp_pelapor' => $req->no_hp_pelapor,
            'status' => $req->status ?? 'menunggu',
        ]);

        return response()->json($laporan, 201);
    }

    public function show($id)
    {
        $laporan = Laporan::findOrFail($id);
        return response()->json($laporan,200);
    }

}
