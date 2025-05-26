<?php

use App\Models\Laporan;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('menampilkan data laporan baru', function () {
    Laporan::factory()->count(2)->create();

    $response = $this->get('/api/laporan');

    $response->assertStatus(200)
             ->assertJsonCount(2);
});

test('membuat data laporan', function () {
    Storage::fake('public');

    $data = [
        'jenis_kebakaran' => 'Kebakaran Lahan',
        'lokasi' => 'Jalan Merdeka',
        'lat' => -6.2,
        'lng' => 106.8,
        'nama_pelapor' => 'Budi',
        'notlp' => '08123456789',
        'status' => 'menunggu',
        'catatan' => 'Segera ditindak',
        'foto' => [UploadedFile::fake()->image('kebakaran.jpg')],
    ];

    $response = $this->postJson('/api/laporan', $data);

    $response->assertStatus(201)
             ->assertJsonFragment([
                 'jenis_kebakaran' => 'Kebakaran Lahan',
                 'lokasi' => 'Jalan Merdeka',
             ]);

    $this->assertDatabaseHas('laporans', [
        'jenis_kebakaran' => 'Kebakaran Lahan',
        'lokasi' => 'Jalan Merdeka',
    ]);
});

test('mengubah data laporan', function () {
    $laporan = Laporan::factory()->create([
        'status' => 'menunggu',
        'catatan' => 'Belum ada tindakan'
    ]);

    $data = [
        'status' => 'diproses',
        'catatan' => 'Sudah dikonfirmasi petugas'
    ];

    $response = $this->putJson("/api/laporan/{$laporan->id}", $data);

    $response->assertStatus(200)
             ->assertJsonFragment(['status' => 'diproses']);

    $this->assertDatabaseHas('laporans', [
        'id' => $laporan->id,
        'status' => 'diproses',
        'catatan' => 'Sudah dikonfirmasi petugas',
    ]);
});

/* test('menghapus data laporan', function () { */
/*     $laporan = Laporan::factory()->create(); */
/**/
/*     $response = $this->deleteJson("/api/laporan/{$laporan->id}"); */
/**/
/*     $response->assertStatus(204); */
/**/
/*     $this->assertDatabaseMissing('laporans', ['id' => $laporan->id]); */
/* }); */
