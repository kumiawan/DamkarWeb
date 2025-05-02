<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Laporan;
use Inertia\Inertia;

class PemantauanController extends Controller
{
    public function index() {
        $laporans = Laporan::all();
            return inertia::render('Dashboard',[
                'laporans'=> $laporans,
            ]);
    }
}
