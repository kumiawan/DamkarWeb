<?php

use App\Http\Controllers\PemantauanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\YoutubeController;
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

    Route::get('/berita', [BeritaController::class, 'index'])->name('berita');
    Route::get('/berita/create', [BeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
    Route::put('/berita/{id}', [BeritaController::class, 'update'])->name('berita.update');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');

    Route::get('/youtube', [YoutubeController::class, 'index'])->name('youtube');
    Route::get('/youtube/create', [YoutubeController::class, 'create'])->name('youtube.create');
    Route::post('/youtube', [YoutubeController::class, 'store'])->name('youtube.store');
    Route::put('/youtube/{id}', [YoutubeController::class, 'update'])->name('youtube.update');
    Route::delete('/youtube/{id}', [YoutubeController::class, 'destroy'])->name('youtube.destroy');
});

require __DIR__.'/auth.php';
