<?php

use App\Http\Controllers\PemantauanController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/dashboard', [PemantauanController::class, 'index'])->name('dashboard');
    // route lainnya di sini
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route untuk halaman laporan
    Route::get('/laporan', function () {
        return Inertia::render('Laporan/Page');
    })->name('laporan.page');
});

require __DIR__.'/auth.php';
