import Vue from 'vue'

export default{
	namespaced: true,
	state:{
    mantenimiento: [],
		loading: true,
		fechas: {}
	},

	mutations:{
		MANTENIMIENTO(state, data){
			state.mantenimiento = data
    },
    LOADING(state, data){
			state.loading = data; 
		},
		FECHAS(state, fechas){
			state.fechas = fechas
		}
	},
	actions:{
		consultaMantenimiento({commit}, payload){
			// Limpio Arreglo y Genero Consulta
			commit('FECHAS', payload);
			commit('MANTENIMIENTO', []); commit('LOADING',true);
			Vue.http.post('mantenimientos', payload).then(response=>{
				commit('MANTENIMIENTO', response.body)
			}).catch((error)=>{
				console.log('error',error)
			}).finally(() => commit('LOADING', false)) 
		},
	
  },

	getters:{
		getMantenimiento(state){
		  return state.mantenimiento
    },
    
    Loading(state){
			return state.loading
		},
		
		fechas(state){
			return state.fechas
		}

	}
}