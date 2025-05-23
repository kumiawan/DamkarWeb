<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index() {
        $berita = Berita::latest()->get();

        return Inertia::render('Berita/Page', [
            'berita' => $berita,
        ]);
    }

    public function create()
    {
        return Inertia::render('Berita/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'penulis' => 'required|string|max:100',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('berita', 'public');
        }

        Berita::create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'penulis' => $request->penulis,
            'foto'=> $fotoPath,
        ]);

        return redirect('/berita')->with('message', 'Berita berhasil ditambahkan.');
    }

public function update(Request $request, $id)
{
    $request->validate([
        'judul' => 'required|string|max:255',
        'isi' => 'required|string',
        'penulis' => 'required|string|max:100',
        'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $berita = Berita::findOrFail($id);

    if ($request->hasFile('foto')) {
        $fotoPath = $request->file('foto')->store('berita', 'public');
        $berita->foto = $fotoPath;
    }

    $berita->judul = $request->input('judul');
    $berita->isi = $request->input('isi');
    $berita->penulis = $request->input('penulis');

    $berita->save();

    return redirect()->back()->with('message', 'Berita berhasil diperbarui.');
}

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        $berita->delete();

        return redirect()->back()->with('message', 'Berita berhasil dihapus.');
    }
}
