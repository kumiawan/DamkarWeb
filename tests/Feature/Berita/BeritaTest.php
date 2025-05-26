<?php

use App\Models\User;
use App\Models\Berita;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('admin dapat melihat halaman Berita', function () {
    $whoami = User::factory()->create([
        'role'=> 'admin'
    ]);
    $this -> actingAs($whoami)
        ->get('/berita')
        ->assertStatus(200);
});

test('admin dapat menambah data berita', function () {
    Storage::fake('public');

    $whoami = User::factory()->create([
        'role'=> 'admin'
    ]);

    $data = [
        'judul' => 'Judul Berita',
        'isi' => 'Isi lengkap berita...',
        'penulis' => 'Admin',
        'foto' => UploadedFile::fake()->image('gambar.jpg'),
    ];

    $response = $this->actingAs($whoami)
        ->post('/berita', $data);

    $response->assertRedirect(route('berita.store'));

    Storage::disk('public')->assertExists('berita/' . $data['foto']->hashName());
});

test('admin dapat mengubah data berita', function () {
    $whoami = User::factory()->create([
        'role' => 'admin',
    ]);

    $data = berita::factory()->create([
        'judul' => 'Judul Berita',
        'isi' => 'Isi lengkap berita...',
        'penulis' => 'Admin',
        'foto' => UploadedFile::fake()->image('gambar.jpg'),
    ]);

    $newFoto = UploadedFile::fake()->image('gambar123.jpg');

    $updatedData = [
        'judul' => 'Judul Berita Apa ya ?',
        'isi' => 'Isi lengkap berita yang sudah diedit...',
        'penulis' => 'Dimas',
        'foto' => $newFoto,
    ];

    $this->actingAs($whoami)
        ->put(route('berita.update', $data->id), $updatedData)
        ->assertRedirect();

    $expectedFotoPath = 'berita/' . $newFoto->hashName();

    $this->assertDatabaseHas('beritas', [
        'id' => $data->id,
        'judul' => $updatedData['judul'],
        'isi' => $updatedData['isi'],
        'penulis' => $updatedData['penulis'],
        'foto' => $expectedFotoPath,
    ]);
    Storage::disk('public')->assertExists($expectedFotoPath);
});

test('admin dapat menghapus data laporan', function () {
    $whoami = User::factory()->create([
        'role' => 'admin',
    ]);

    $data = Berita::factory()->create();

    $this->actingAs($whoami)
        ->delete(route('berita.destroy', $data->id))
        ->assertStatus(302);

});

