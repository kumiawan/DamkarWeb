<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function index()
    {
        $laporan = Laporan::latest()->get();
        return response()->json($laporan, 200);
    }

public function create(Request $req)
{
    $req->validate([
        'jenis_kebakaran' => 'required|string|max:255',
        'lokasi' => 'required|string|max:255',
        'lat' => 'required|numeric',
        'lng' => 'required|numeric',
        'nama_pelapor' => 'required|string|max:255',
        'notlp' => 'required|string|max:15',
        'status' => 'nullable|string|max:50',
        'catatan' => 'nullable|string|max:255',
        'foto' => 'nullable',
        'foto.*' => 'image|mimes:jpg,jpeg,png|max:2048',
    ]);

    $fotoPaths = [];

    if ($req->hasFile('foto')) {
        $fotos = $req->file('foto');

        if (!is_array($fotos)) {
            $fotos = [$fotos];
        }

        foreach ($fotos as $foto) {
            $filename = uniqid() . '_' . $foto->getClientOriginalName();
            $foto->move(public_path('fotoKebakaran'), $filename);
            $fotoPaths[] = 'fotoKebakaran/' . $filename;
        }
    }

    $laporan = Laporan::create([
        'jenis_kebakaran' => $req->jenis_kebakaran,
        'lokasi' => $req->lokasi,
        'lat' => $req->lat,
        'lng' => $req->lng,
        'nama_pelapor' => $req->nama_pelapor,
        'notlp' => $req->notlp,
        'status' => $req->status ?? 'menunggu',
        'catatan' => $req->catatan,
        'foto' => $fotoPaths,
    ]);

    return response()->json($laporan, 201);
}

    public function show($id)
    {
        $laporan = Laporan::findOrFail($id);
        return response()->json($laporan, 200);
    }

    public function update(Request $request, $id)
    {
        $laporan = Laporan::findOrFail($id);

        $request->validate([
            'status' => 'required|string|max:50',
            'catatan' => 'nullable|string|max:255',
        ]);

        $laporan->status = $request->status;
        $laporan->catatan = $request->catatan;
        $laporan->save();

        return response()->json($laporan, 200);
    }
}
