<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; //USAR ESCRITURA SQL


class mantenimientoController extends Controller
{
    public function Mantenimiento(Request $req){
			$id = DB::table('mantenimientos')->insertGetId(
				[ 'fecha_actual'  => $req -> fecha_actual    , 'tipo'        => $req -> tipo ,
								'hora1'         => $req -> hora1    , 'hora2'       => $req -> hora2, 
								'id_depto' 	  => $req -> id_depto , 'id_maquina'  => $req -> id_maquina,		   
								'causas'  	  => $req -> causas   , 'contramedidas'     => $req -> contramedidas
				]
			);

		if($id):
			return response("El mantenimiento se creo correctamente",200);
		else:
			return response("Ocurrio un problema. Intentelo nuevamente.",500);
		endif;
	}

	public function Tipos(){
			return $Tipos = DB::select('SELECT * FROM tipos');
	}

	public function Mantenimientos(Request $req){
		return $mantenimientos = DB::select('SELECT m.id, m.fecha_actual, m.tipo, t.nombre as nomtipo, m.hora1, m.hora2, 
																								m.id_depto, d.nombre as nomdepto, m.id_maquina, ma.nombre as nommaquina,
																								m.causas, m.contramedidas 
																					FROM mantenimientos m LEFT JOIN tipos t ON m.tipo = t.id
																																LEFT JOIN departamentos d ON m.id_depto = d.id
																																LEFT JOIN maquinas ma ON m.id_maquina = ma.id
																					WHERE m.fecha_actual BETWEEN ? AND ?',[$req -> fecha1,$req -> fecha2 ]);
	}
	
	public function putMantenimiento($id, Request $req){
		$actualizaMantenimiento = DB::update('UPDATE mantenimientos SET  fecha_actual=:fecha_actual,
																														tipo=:tipo,
																														hora1=:hora1,
																														hora2=:hora2, 
																														id_depto=:id_depto,
																														id_maquina=:id_maquina,
																														causas=:causas,
																														contramedidas=:contramedidas
																												WHERE id=:id'
																												,['fecha_actual'	=> $req -> fecha_actual, 
																													'tipo'   			  => $req -> tipo,
																													'hora1'      		=> $req -> hora1,
																													'hora2'					=> $req	-> hora2, 
																													'id_depto'			=> $req	-> id_depto,
																													'id_maquina'		=> $req	-> id_maquina, 
																													'causas'			  => $req	-> causas , 
																													'contramedidas'	=> $req	-> contramedidas, 
																													'id'						=> $id
																												]
																					);
		if($actualizaMantenimiento):
			return response("El mantenimiento se actualizo correctamente",200);
		else:
			return response("No se detecto ningun cambios.",400);
		endif;
	}
}
