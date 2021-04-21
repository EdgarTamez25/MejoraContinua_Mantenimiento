<template>
  <v-row justify="center">  
    <v-snackbar v-model="snackbar" :color="color" top multi-line right > <b>{{ text }}</b>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false"> Cerrar </v-btn>
      </template>
    </v-snackbar>

    <v-col cols="12" sm="11">
      <v-row justify="center">
        <v-col cols="12" class="text-right ma-0 pa-0 "><v-btn text color="red" @click="$emit('modal',false)">
          <v-icon>mdi-close </v-icon></v-btn>
        </v-col>

        <v-col cols="12"  >
          <v-col cols="12" class="text-right "> IT-7-PRO-01-RO2</v-col>
          <v-col cols="12" align="center">
           <div class="text-lg-h5 text-md-h6 text-sm-h4 text-body-1 font-weight-black">REPORTEDE MANTENIMIENTO</div>
          </v-col>
          <v-form ref="form" v-model="valid" > 
            <v-row justify="center" >

              <v-col cols="12" lg="6" >
                <v-dialog ref="fecha1" v-model="fechaModal" :return-value.sync="fecha" persistent 	width="290px"	>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="fecha" label="Fecha actual" append-icon="event" readonly 	v-on="on"
                      outlined 	color="celeste" hide-details class="text-h6" :rules="fechaRules"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="fecha" locale="es-es" color="celeste" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="gris" @click="fechaModal = false">Cancel</v-btn>
                    <v-btn dark color="celeste" @click="$refs.fecha1.save(fecha)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>

              <v-col cols="12" lg="6">
                <v-select
                  v-model="tipo" :items="tipos" item-text="nombre" item-value="id" hide-details 
                  label="Tipo de Mantenimiento" outlined return-object class="text-h6" :rules="tipoRules"
                ></v-select>
              </v-col>

              <v-col cols="6" >
                <v-dialog ref="hora1" v-model="horamodal" :return-value.sync="hora" persistent width="290px" >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="hora" label="Hora 1" append-icon="access_time" readonly v-on="on"
                      outlined  hide-details color="celeste" class="text-h6" :rules="horaRules"
                    ></v-text-field>
                  </template>

                  <v-time-picker v-if="horamodal" locale="es-es" color="rosa" v-model="hora" full-width 	>
                    <v-spacer></v-spacer>
                    <v-btn small text color="gris" @click="horamodal = false">Cancel</v-btn>
                    <v-btn small dark color="rosa" @click="$refs.hora1.save(hora)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>

              <v-col cols="6">
                <v-dialog ref="hora3" v-model="horamodal2" :return-value.sync="hora2" persistent width="290px" >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="hora2" label="Hora 2" append-icon="access_time" readonly v-on="on"
                      outlined  hide-details color="celeste" class="text-h6" :rules="hora2Rules"
                    ></v-text-field>
                  </template>

                  <v-time-picker v-if="horamodal2" locale="es-es" color="rosa" v-model="hora2" full-width 	>
                    <v-spacer></v-spacer>
                    <v-btn small text color="gris" @click="horamodal2 = false">Cancel</v-btn>
                    <v-btn small dark color="rosa" @click="$refs.hora3.save(hora2)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>

              <v-col cols="12" lg="4">
                <v-select
                  v-model="depto" :items="deptos" item-text="nombre" item-value="id" hide-details 
                  label="Departamento" outlined   return-object class="text-h6" :rules="deptoRules"
                ></v-select>
              </v-col>

              <v-col cols="12" lg="8">
                <v-select
                  v-model="maquina" :items="maquinas" item-text="nombre" item-value="id" hide-details 
                  label="Maquina" outlined   return-object color="celeste" class="text-h6" :rules="maquinaRules"
                ></v-select>
              </v-col>

              <v-col cols="12">
              <v-textarea
                  v-model="causas" outlined  label="Causas" rows="3" hide-details  class="text-h6" :rules="causaRules"
                  row-height="30" shaped placeholder="Escriba las causas..." color="celeste"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
              <v-textarea
                  v-model="contramedida" outlined  label="Contramedidas" rows="3" hide-details class="text-h6" 
                  row-height="30" shaped placeholder="Escriba las contramedidas..." color="celeste" :rules="contramedidaRules"
                ></v-textarea>
              </v-col>

            </v-row>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer><v-btn color="success" :disabled="!valid" @click="actualizaMantenimiento">Actualizar Información</v-btn>
          </v-card-actions>
          <v-col cols="12" class="caption" >Revisión N°1 <br> Vigente a partir del 20 de enero del 2020 </v-col>

        </v-col>

        <!-- GUARDANDO INFORMACION -->
        <v-card-actions>
          <v-dialog v-model="dialog" hide-overlay persistent width="300">
            <v-card color="blue darken-4" dark >
              <v-card-text> <th style="font-size:17px;" align="center">{{ textDialog }}</th>
                <br>
                <v-progress-linear indeterminate color="white" class="mb-0" persistent></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="Correcto" hide-overlay persistent width="350">
            <v-card color="success"  dark class="pa-3">
              <h3><strong>{{ textCorrecto }} </strong></h3>
            </v-card>
          </v-dialog>
        </v-card-actions>

      </v-row>
    </v-col> 
  </v-row>
</template>

<script>
  import SelectMixin from '@/mixins/SelectMixin.js' 
	import {mapGetters, mapActions} from 'vuex';

  export default {
    mixins:[SelectMixin],
    props:[
			'modoVista',
			'parametros',
	  ],
    data:()=>({
      valid: true,
      fecha      : '',
      fechaModal : false,
      hora 			 : null,
      horamodal	 : false,
      hora2 		 : null,
      horamodal2 : false,
      tipo       : { id:null, nombre:''},
      tipos      : [],
      depto      : { id:null, nombre:''},
      deptos     : [],
      maquina    : {id:null, nombre:''},
      maquinas   : [],
      causas      : '',
      contramedida       :'',
      fechaRules         : [v => !!v || 'Es requerido'],
      horaRules          : [v => !!v || 'Es requerido'],
      hora2Rules         : [v => !!v || 'Es requerido'],
      tipoRules          : [v => !!v || 'Es requerido'],
      deptoRules         : [v => !!v || 'Es requerido'],
      maquinaRules       : [v => !!v || 'Es requerido'],
      causaRules         : [v => !!v || 'Es requerido'],
      contramedidaRules  : [v => !!v || 'Es requerido'],

      snackbar: false,
      text		: '',
      color		: 'success',
      dialog : false,
      textDialog : "Guardando Información",
      Correcto   : false,
      textCorrecto: '',

    }),

    created(){
     this.consultaDeptos();
     this.consultaTipos();
     this.asignaValores();
    },

    watch:{
			depto: function(){
				this.consultaMaquinasxDeptos(this.depto.id)
      },
      parametros: function(){ this.asignaValores(); }
    },

    computed:{
			// IMPORTANDO USO DE VUEX - CLIENTES (GETTERS)
			...mapGetters('Mantenimiento'  ,['fechas']),
		},
    
    methods:{
				...mapActions('Mantenimiento'  ,['consultaMantenimiento']), // IMPORTANDO USO DE VUEX (ACCIONES)

      asignaValores(){
        this.fecha = this.parametros.fecha_actual,
        this.tipo  = { id: this.parametros.tipo, nombre: this.parametros.nomtipo };
        this.hora  = this.parametros.hora1;
        this.hora2 = this.parametros.hora2;
        this.depto = { id: this.parametros.id_depto, nombre: this.parametros.nomdepto};
        this.maquina = { id: this.parametros.id_maquina, nombre: this.parametros.nommaquina};
        this.causas = this.parametros.causas;
        this.contramedida = this.parametros.contramedidas;
      },
      actualizaMantenimiento(){
        this.dialog = true; 
        const payload = { fecha_actual: this.fecha,
                          tipo : this.tipo.id,
                          hora1: this.hora,
                          hora2: this.hora2,
                          id_depto: this.depto.id,
                          id_maquina: this.maquina.id,
                          causas: this.causas,
                          contramedidas: this.contramedida
                        }
        this.$http.put('mantenimiento/'+ this.parametros.id, payload).then(response =>{
          this.snackbar = true; this.text = response.bodyText; this.color="green"
        }).catch(error =>{
          this.snackbar=true; this.text=error.bodyText; this.color="orange"
        }).finally(()=> { 
          var me = this
          this.dialog = false; 
          this.limpiarCampos();
          setTimeout(function(){ me.$emit('modal',false)}, 2000);
          this.limpiarCampos();  //LIMPIAR FORMULARIO
          this.consultaMantenimiento(this.fechas) //ACTUALIZAR CONSULTA DE USUARIOS 
        })
      },


      limpiarCampos(){
        this.fecha        = this.traerFechaActual();
        this.tipo         = { id:null, nombre:''}
        this.hora         = this.traerHoraActual();
        this.hora2        = this.traerHoraActual();
        this.depto        = { id:null, nombre:''};
        this.maquina      = { id:null, nombre:''};
        this.causas       = '';
        this.contramedida = '';
      }
    },


}
</script>

<style scoped>
  .font{
    font-size: 15px;
  }
</style>>

