<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class LaporanSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('id_ID');

        for ($i = 0; $i < 5; $i++) {
            // Buat array foto dummy (bisa lebih dari 1)
            $jumlahFoto = rand(1, 3); // 1 sampai 3 foto per laporan
            $fotoArray = [];

            for ($j = 0; $j < $jumlahFoto; $j++) {
                $fotoArray[] = 'fotoKebakaran/kebakaran' . rand(1, 3) . '.jpg';
            }

            DB::table('laporans')->insert([
                'lokasi' => $faker->city,
                'lat'=> $faker->randomFloat(6, -90, 90),
                'lng'=> $faker->randomFloat(6, -90, 90),
                'nama_pelapor' => $faker->name,
                'notlp' => $faker->phoneNumber,
                'jenis_kebakaran' => $faker->randomElement(['Kebakaran','Penyelamatan','Edukasi']),
                'status' => 'menunggu',
                'foto' => json_encode($fotoArray),
                'catatan' => $faker->randomElement(['1','2','3']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
