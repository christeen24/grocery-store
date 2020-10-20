<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST,GET,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroceryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('groceries', 'App\Http\Controllers\GroceryController@index');

Route::post('groceries','App\Http\Controllers\GroceryController@store');

Route::get('groceries/{id}', 'App\Http\Controllers\GroceryController@show');

Route::delete('groceries/{id}', 'App\Http\Controllers\GroceryController@destroy');