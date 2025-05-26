<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class LaporanFactory extends Factory
{
    public function definition(): array
    {
        return [
            'jenis_kebakaran' => $this->faker->randomElement([
                'Kebakaran Lahan', 'Kebakaran Rumah', 'Kebakaran Hutan'
            ]),
            'lokasi' => $this->faker->address,
            'lat' => $this->faker->latitude(-90, 90),
            'lng' => $this->faker->longitude(-180, 180),
            'nama_pelapor' => $this->faker->name,
            'notlp' => $this->faker->numerify('08##########'),
            'status' => $this->faker->randomElement(['menunggu', 'diproses', 'selesai']),
            'catatan' => $this->faker->sentence,
            'foto' => [], // kosongkan atau isi array string path jika perlu simulasi file
        ];
    }
}
