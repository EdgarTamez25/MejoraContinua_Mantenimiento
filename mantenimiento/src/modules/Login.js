import Vue from 'vue'

export default{
	namespaced: true,
	state:{
		login:false,
		datosUsuario:[],
		auth: true,
	},

	mutations:{
		LOGEADO(state, value){
			console.log('logeado', value)
			state.login = value
		},
		AUTHENTICAR(state, value){
			console.log('autenticar', value)
			state.auth = value
		},
		DATOS_USUARIO(state, datosUsuario){
			state.datosUsuario = datosUsuario
		},
		SALIR(state){
			state.login = false;
			state.datosUsuario = [];
		},
	},

	actions:{
	
		Authologin({commit},usuario){
			return new Promise((resolve) => {
				commit('AUTHENTICAR', false)
				commit('LOGEADO', true);
				commit('DATOS_USUARIO', usuario );
				resolve(true)
			})
		},
    Login({commit}, payload){
			return new Promise((resolve, reject) => {
			  Vue.http.post('login', payload).then(response =>{
					if(response.body.length){
						resolve(true)
						commit('AUTHENTICAR', false)
						commit('LOGEADO', true);
						commit('DATOS_USUARIO', response.body[0]);
					}else{
						resolve(false)
						commit('AUTHENTICAR', true)
					}
			  }).catch((error)=>{
					reject(error)
				})
			})
		},

		authenticar({commit}, estatus){
			commit('AUTHENTICAR', estatus)
		},
		salirLogin({commit}){
			commit('AUTHENTICAR', true)
			commit('SALIR')
		},
	
	},

	getters:{
		getLogeado(state){
		  return state.login
		},
		getdatosUsuario(state){
			return state.datosUsuario;
		},
		auth(state){
			return state.auth;
		},
	
	}
}