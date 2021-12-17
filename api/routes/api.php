<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login' 							,'userController@IniciarSesion')   				-> name('IniciarSesion'); 
Route::get('departamentos'  			,'deptoController@Departamentos')  			  -> name('Departamentos');
Route::get('maquinas.depto/{id}'  ,'maquinasController@MaquinasXDepto')  	  -> name('MaquinasXDepto');
Route::post('mantenimiento' 			,'mantenimientoController@Mantenimiento') -> name('Mantenimiento');
Route::get('tipos.mantenimientos' ,'mantenimientoController@Tipos')  				-> name('Tipos');
Route::post('mantenimientos' 			,'mantenimientoController@Mantenimientos') -> name('Mantenimientos');
Route::put('mantenimiento/{id}'   ,'mantenimientoController@putMantenimiento')  	  -> name('putMantenimiento');

 Route::post('obtener.mantenimientos.calendario' ,'mantenimientoController@obtener_mantenimientos_calendario') -> name('obtener_mantenimientos_calendario');


































