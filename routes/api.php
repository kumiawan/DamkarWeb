<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BeritaApiController;
use App\Http\Controllers\Api\LaporanMobileController;
use App\Http\Controllers\Api\YoutubeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\Api\LapKejController;


/* TODO: tambahkan sanctum agar tidak ter-ekspose ke publik */
Route::post('/laporan', [LaporanController::class, 'create']);
Route::get('/laporan', [LaporanController::class, 'index']);
Route::get('/laporan/{id}', [LaporanController::class, 'show']);
Route::put('/laporan/{id}', [LaporanController::class, 'update']);


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

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

// Route::post('/laporankej', [LaporanMobileController::class, 'store']);

Route::post('change-password', [AuthController::class, 'changePassword']);

Route::post('update-user', [AuthController::class, 'update']);

Route::post('validate-old-password', [AuthController::class, 'validateOldPassword']);

Route::post('/laporankej', [LapKejController::class, 'store']);

Route::get('/youtubeapi', [YoutubeController::class, 'index']);

Route::get('/beritaapi', action: [BeritaApiController::class, 'index']);
