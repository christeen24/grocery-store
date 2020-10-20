<?php
header("Access-Control-Allow-Origin: *");
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

Route::resource('groceries', 'App\Http\Controllers\GroceryController');

// Route::get('/groceries', 'App\Http\Controllers\GroceryController@index')->name('groceries.index');

// Route::post('/groceries', 'App\Http\Controllers\GroceryController@store')->name('groceries.store');

// Route::get('/groceries/{grocery}', 'App\Http\Controllers\GroceryController@show')->name('groceries.show');

// Route::put('/groceries/{grocery}', 'App\Http\Controllers\GroceryController@update')->name('groceries.update');

// Route::delete('/groceries/{grocery}', 'App\Http\Controllers\GroceryController@destory')->name('groceries.destroy');
