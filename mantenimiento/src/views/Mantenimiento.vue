<template>
  <v-main class="pa-0 ma-3">
  	<v-row justify="center">
      

  		<v-col cols="12" md="6" class="py-0" > 
				<v-card-actions class="font-weight-black text-xs-h6 text-sm-h5 py-0 "> {{ titulo }} </v-card-actions>
			</v-col>

			<v-col cols="6" md="3" class="py-0"   >
				<v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
								transition="scale-transition" offset-y min-width="290px" color="celeste">
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="date" label="Fecha desde" append-icon="event" readonly v-bind="attrs"
							v-on="on" outlined dense hide-details
						></v-text-field>
					</template>
					<v-date-picker v-model="date" no-title scrollable color="celeste">
						<v-spacer></v-spacer>
						<v-btn text color="gris" @click="menu = false">Cancel</v-btn>
						<v-btn dark color="rosa" @click="$refs.menu.save(date)">OK</v-btn>
					</v-date-picker>
				</v-menu>
			</v-col>
		
			<v-col cols="6" md="3" class="py-0"   >
				<v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="date2"
								transition="scale-transition" offset-y min-width="290px" color="celeste">
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="date2" label="Fecha hasta" append-icon="event" readonly v-bind="attrs"
							v-on="on" outlined dense hide-details
						></v-text-field>
					</template>
					<v-date-picker v-model="date2" no-title scrollable color="celeste">
						<v-spacer></v-spacer>
						<v-btn text color="gris" @click="menu2 = false">Cancel</v-btn>
						<v-btn dark color="rosa" @click="$refs.menu2.save(date2)">OK</v-btn>
					</v-date-picker>
				</v-menu>
			</v-col>

			<v-col cols="12">
				<v-card class="" outlined >
					<v-card-actions>
			      <v-text-field
								v-model="search"
								append-icon="search"
								label="Buscar reporte "
								single-line
								hide-details
								filled dense
							></v-text-field>
			      <v-spacer></v-spacer>
						<v-btn 
							fab small  
							color="green" 
							class="white--text"
							:disabled="getMantenimiento.length? false: true "
							@click="ImprimirExcel()"
						>
							<v-icon>mdi-microsoft-excel </v-icon>
						</v-btn>
			      <v-btn small class="gris" fab dark @click="init()" ><v-icon>refresh</v-icon> </v-btn>
			    </v-card-actions>

			    <v-data-table
			      :headers="headers"
			      :items="getMantenimiento"
			      :search="search"
			      fixed-header
						:height="$vuetify.breakpoint.name === 'xs'?'550px': tamanioPantalla"
						hide-default-footer
						:loading ="Loading"
						loading-text="Cargando... Por favor espere."
						:page.sync="page"
      			:items-per-page="itemsPerPage"
						@page-count="pageCount = $event"
						dense
			    >
						<template v-slot:item.fecha_actual="{item}">
							<span> {{  moment(item.fecha_actual).format('LL') }} </span>
						</template>
						<template v-slot:item.action="{ item }" v-if="getdatosUsuario.id === 2"> 
			    		<v-btn  class="celeste" icon dark @click="abrirModal(2, item)"><v-icon> create </v-icon></v-btn> 
				    </template>
			    </v-data-table>
			  </v-card>
			
				<!-- PAGINACION -->
				<div class="text-center pt-2">
					<v-pagination v-model="page" :length="pageCount"></v-pagination>
				</div>
			</v-col>


			<v-dialog persistent v-model="dialog" width=600 >	
				<v-card class="pa-3">
					<controlMantenimiento 
						:modoVista="modoVista" 
						:parametros="parametros" 
						@modal="dialog = $event"
						/>
				</v-card>
			</v-dialog>
				 
  	</v-row>
  </v-main>
</template>

<script>
	import controlMantenimiento  from '@/views/controlMantenimiento.vue';
	import {mapGetters, mapActions} from 'vuex';
	import  ExcelExport from '@/mixins/ExcelExport.js';
	import moment from 'moment'
  moment.locale('es');

	export default {
		mixins:[ExcelExport],
		components: {
			controlMantenimiento
		},
		data () {
				return {
					titulo: 'REPORTE DE MANTENIMIENTO',
					recarga: 0,
					page: 0,
					pageCount: 0,
					itemsPerPage: 100,
					search: '',
					dialog: false,
					modoVista: 0,
					parametros:'',
					headers:[
            { text: 'Fecha'                  , align: 'left'  , value: 'fecha_actual'	 },
						{ text: 'Tipo de mantenimiento'  , align: 'left'  , value: 'nomtipo'  },
						{ text: 'Hora inicio'    				 , align: 'left'  , value: 'hora1'   },
						{ text: 'Hora final'     		 	   , align: 'left'  , value: 'hora2' },
						{ text: 'Departamento' 	    		 , align: 'left'  , value: 'nomdepto'   },
						{ text: 'Maquina' 	             , align: 'left'  , value: 'nommaquina'    },
            { text: 'Causas' 	               , align: 'left'  , value: 'causas'     },
						{ text: 'Contramedidas' 	       , align: 'left'  , value: 'contramedidas'     },
						{ text: ''  			    			     , align: 'right' , value: 'action', sortable: false },

					],
					date: new Date().toISOString().substr(0, 10),
					menu: false,
					date2: new Date().toISOString().substr(0, 10),
          menu2: false,
         
				}
			},

			created(){
				this.init();
			},

			computed:{
				...mapGetters('Mantenimiento' ,['Loading','getMantenimiento']), // IMPORTANDO USO DE VUEX  (GETTERS)
        ...mapGetters('Login'    ,['getdatosUsuario']),       // IMPORTANDO USO DE VUEX  (GETTERS)
        tamanioPantalla () {
				switch (this.$vuetify.breakpoint.name) {
					case 'xs':
						return 'auto';
					break;
					case 'sm': 
						return this.$vuetify.breakpoint.height -300
					break;
					case 'md':
						return this.$vuetify.breakpoint.height -300
					break;
					case 'lg':
						return this.$vuetify.breakpoint.height -300
					break;
					case 'xl':
						return this.$vuetify.breakpoint.height -300
					break;
				}
			},
			},

			watch:{
				date(){ this.init() },
				date2(){ this.init() },
			},

			methods:{

				...mapActions('Mantenimiento'  ,['consultaMantenimiento']), // IMPORTANDO USO DE VUEX (ACCIONES)

				init(){
					const payload = { fecha1: this.date , fecha2: this.date2}
					this.consultaMantenimiento(payload) 
				},
        
				ImprimirExcel(){
					let tHeaders=[], tValores= [];
					for(let j =0;j< this.headers.length; j++){
						tHeaders.push(this.headers[j].text);
						tValores.push(this.headers[j].value);
					}
					let tInformacion = this.getMantenimiento
					
					this.manejarDescarga(this.titulo,tHeaders,tValores,tInformacion)
				},

				abrirModal(action, items){
					this.modoVista = action;
					this.parametros = items;
					this.dialog = true;
				},
			
			}
	}
</script>
