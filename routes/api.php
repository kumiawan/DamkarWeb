<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LaporanMobileController;
use App\Http\Controllers\Api\RegisterMobileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LaporanController;

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/user/profile', [Api\UserController::class, 'profile']);
    // Tambahkan endpoint lain khusus mobile user
});

Route::post('/laporan', [LaporanController::class, 'create']);
Route::get('/laporan', [LaporanController::class, 'index']);
Route::get('/laporan/{id}', [LaporanController::class, 'show']);


Route::get('/weather', function (Request $request) {
    $city = $request->query('city', 'Jember');

    $apiKey = env('OPENWEATHER_API_KEY');
    $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
        'q' => $city,
        'appid' => $apiKey,
        'units' => 'metric',
        'lang' => 'id'
    ]);

    if ($response->failed()) {
        return response()->json(['message' => 'Failed to fetch weather data'], 500);
    }

    return $response->json();
});



// api mobile

Route::post('/register', [RegisterMobileController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/laporan', [LaporanMobileController::class, 'store']);