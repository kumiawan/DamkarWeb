<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validasi input
        $request->validate([
            'nama' => 'required|string|max:255',
            'no_hp' => 'required|string|max:15',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        // Simpan user ke database
        $user = User::create([
            'name' => $request->nama,
            'notlp' => $request->no_hp,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user', // <-- Tambahkan baris ini
        ]);

        // Kirim respons JSON
        return response()->json([
            'status' => 'success',
            'message' => 'Registrasi berhasil',
            'data' => $user,
        ]);
    }

    public function login(Request $request)
    {
        // Validasi input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Periksa user dan password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau password salah'
            ], 401);
        }

        // (Opsional) buat token jika pakai Laravel Sanctum atau Passport
        // $token = $user->createToken('mobile-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'data' => $user,
            // 'token' => $token,
        ]);
    }

    public function changePassword(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->password = Hash::make($password);
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Update Password Success',
        ]);
    }

    public function update(Request $request)
    {
        // Validasi data
        $request->validate([
            'id' => 'required|integer|exists:users,id',
            'name' => 'required|string',
            'email' => 'required|email',
            'notlp' => 'required|string',
        ]);

        // Cari user berdasarkan ID
        $user = User::find($request->id);

        if ($user) {
            $user->name = $request->name;
            $user->email = $request->email;
            $user->notlp = $request->notlp;
            $user->save();

            return response()->json(['message' => 'User updated successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function validateOldPassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
        ]);

        $user = User::find($request->id);

        if (!$user || !Hash::check($request->old_password, $user->password)) {
            return response()->json(['error' => 'Invalid old password'], 401);
        }

        return response()->json(['message' => 'Old password is valid']);
    }
    
}
