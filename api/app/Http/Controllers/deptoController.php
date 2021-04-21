<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; //USAR ESCRITURA SQL

class deptoController extends Controller
{
    public function Departamentos(Request $req){

			$Departamentos = DB::select('SELECT * FROM departamentos ');
			return $Departamentos;
	
	}
}


