<?php

use App\Models\User;
use App\Models\Youtube;

test('admin dapat melihat halaman tambah link youtube', function () {
    $admin = User::factory()->create([
        'role'=> 'admin'
    ]);
    $this -> actingAs($admin)
        ->get('/youtube')
        ->assertStatus(200);
});


test('admin dapat menambah lampiran link youtube', function () {
    $admin = User::factory()->create([
        'role'=> 'admin'
    ]);

    $data = [
        'id' => 1,
        'linkYoutube' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ];

    $this -> actingAs($admin)
        ->post('/youtube',$data)
        ->assertRedirect(route('youtube.store'));
});


test('admin dapat mengubah lampiran link youtube', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $youtube = Youtube::factory()->create([
        'linkYoutube' => 'https://www.youtube.com/watch?v=original',
    ]);

    $updatedData = [
        'linkYoutube' => 'https://www.youtube.com/watch?v=updated123',
    ];

    $this->actingAs($admin)
        ->put(route('youtube.update', $youtube->id), $updatedData)
        ->assertRedirect();

    $this->assertDatabaseHas('youtubes', [
        'id' => $youtube->id,
        'linkYoutube' => $updatedData['linkYoutube'],
    ]);
});

test('admin dapat menghapus lampiran link youtube', function () {
    $admin = User::factory()->create([
        'role' => 'admin',
    ]);

    $youtube = Youtube::factory()->create();

    $this->actingAs($admin)
        ->delete(route('youtube.destroy', $youtube->id))
        ->assertRedirect();

    $this->assertDatabaseMissing('youtubes', [
        'id' => $youtube->id,
    ]);
});

/* ===============
/* USER ERA */
/* ===============
*/

test('user tidak dapat melihat halaman tambah link youtube', function () {
    $user = User::factory()->create([
        'role'=> 'user'
    ]);
    $this -> actingAs($user)
        ->get('/youtube')
        ->assertStatus(302);
});

test('user tidak dapat menambah lampiran link youtube', function () {
    $user = User::factory()->create([
        'role'=> 'user'
    ]);

    $data = [
        'id' => 1,
        'linkYoutube' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ];

    $this -> actingAs($user)
        ->post('/youtube',$data)
        ->assertStatus(302);
});

test('user tidak dapat memperbaharui data lampiran link youtube', function () {
    $user = User::factory()->create([
        'role' => 'user',
    ]);

    $youtube = Youtube::factory()->create([
        'linkYoutube' => 'https://www.youtube.com/watch?v=original',
    ]);

    $updatedData = [
        'linkYoutube' => 'https://www.youtube.com/watch?v=updated123',
    ];

    $this->actingAs($user)
        ->put(route('youtube.update', $youtube->id), $updatedData)
        ->assertStatus(302);
});

test('user tidak dapat menghapus data lampiran link youtube', function () {
    $user = User::factory()->create([
        'role' => 'user',
    ]);

    $youtube = Youtube::factory()->create();

    $this->actingAs($user)
        ->delete(route('youtube.destroy', $youtube->id))
        ->assertStatus(302);

});

