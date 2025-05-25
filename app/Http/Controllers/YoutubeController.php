<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Youtube;
use Illuminate\Http\Request;
use Inertia\Inertia;

class YoutubeController extends Controller
{
    public function index() {
        $youtube = Youtube::latest()->get();

        return Inertia::render('Youtube/Page', [
            'youtube' => $youtube,
        ]);
    }

    public function create()
    {
        return Inertia::render('Youtube/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'linkYoutube' => 'required|string|max:255',
        ]);

        Youtube::create([
            'linkYoutube' => $request->linkYoutube,
        ]);

        return redirect('/youtube')->with('message', 'Youtube berhasil ditambahkan.');
    }

public function update(Request $request, $id)
{
    $request->validate([
        'linkYoutube' => 'required|string|max:255',
    ]);

    $youtube = Youtube::findOrFail($id);
    $youtube->linkYoutube = $request->input('linkYoutube');

    $youtube->save();

    return redirect()->back()->with('message', 'Youtube berhasil diperbarui.');
}

    public function destroy($id)
    {
        $youtube = Youtube::findOrFail($id);
        $youtube->delete();

        return redirect()->back()->with('message', 'Youtube berhasil dihapus.');
    }

}
