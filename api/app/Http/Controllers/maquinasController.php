<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; //USAR ESCRITURA SQL


class maquinasController extends Controller
{
    public function MaquinasXDepto($id){
        return $Maquinas = DB::select('SELECT * FROM maquinas where id_depto =?',[$id]);
    }
}
