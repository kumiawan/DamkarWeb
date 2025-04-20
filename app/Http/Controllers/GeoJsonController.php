<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GeoJsonController extends Controller
{
    public function getGeoJsonData()
    {
        $geojsonData = [
            "type" => "FeatureCollection",
            "features" => [
                [
                    "type" => "Feature",
                    "geometry" => [
                        "type" => "Point",
                        "coordinates" => [113.7031, -8.1724] // Koordinat Jember kota
                    ],
                    "properties" => [
                        "name" => "Kota Jember",
                        "description" => "Pusat Kota Jember, Jawa Timur"
                    ]
                ]
            ]
        ];

        return response()->json($geojsonData);
    }
}

