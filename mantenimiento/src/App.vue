<template>
  <v-app id="inspire">
    <v-snackbar v-model="snackbar" :color="color" top multi-line right > <b>{{ text }}</b>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false"> Cerrar </v-btn>
      </template>
    </v-snackbar>
<!-- v-if="getLogeado"  -->
    <v-navigation-drawer  app temporary v-model="drawer" v-ripple  width="300px" v-if="getLogeado">
      <v-list dense nav class="py-0 white--text" >
        <v-list-item two-line>
          <v-list-item-avatar >
            <img src="http://producciongama.com/CRM-GAMA-MOVIL/img/person.png" >
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title > Administrador</v-list-item-title>
            <v-list-item-subtitle>{{ getdatosUsuario.nombre }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      
      <v-list >
        <template v-for="item in items">
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.path"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content >
              <v-list-item-title >
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-3">
      <router-view/>
    </v-main>

    <v-app-bar app color="celeste" dark>
      <img src="http://producciongama.com/IMAGENES/logotipo.png" width="50px" @click.stop="drawer = !drawer" >
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items text-right>
         <v-btn text small > 
          <a :href="apk_movil" style="text-decoration: none; color:white">
            <v-icon>mdi-cellphone-iphone</v-icon>
          </a>
        </v-btn>
      </v-toolbar-items> -->
      <v-toolbar-items text-right>
       <v-btn text small @click="cerrar_sesion=true" v-if="getLogeado">  <v-icon >mdi-exit-to-app</v-icon></v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- LOGIN -->
    <v-dialog v-model="auth" persistent width="400px">
      <v-card class="pa-1">
        <v-card-text class="mt-2 text-center" >
          <img :src="`http://producciongama.com/IMAGENES/logotipo.png`"
                aspect-ratio="1.5" class=" pa-2 mb-5" width="50%" transparent
          />
           
          <v-form v-model="valid" :lazy-validation="lazy">
            <v-text-field v-model="correo" prepend-icon="email" label="Usuario" required outlined
                          dense color="celeste" :rules="usarioRules" style="font-size:20px" >
            </v-text-field>
            <v-text-field
              v-model="contrasenia"
              prepend-icon="lock"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="contraRules"
              :type="show1 ? 'text' : 'password'"
              label="contraseña"
              @click:append="show1 = !show1"
              outlined
              dense
              hide-details
              color="celeste"
              style="font-size:20px"
              @keyup.enter="IniciarSesion"

            ></v-text-field>

          </v-form>
        </v-card-text>
        <v-card-actions ><v-spacer></v-spacer>
          <v-btn :loading="iniciar" :disabled="!valid || iniciar" color="primary" @click="IniciarSesion" >Iniciar Sesión</v-btn>
        </v-card-actions>
      </v-card>
       <v-footer color="celeste" dark class="overline" ><v-spacer></v-spacer>  
        <strong>Gama Etiquetas </strong>  — {{ new Date().getFullYear() }} </v-footer>
    </v-dialog>

     <v-dialog v-model="cerrar_sesion" width="400px">
      <v-card color="grey darken-4" >
        <v-card-title class=" white--text font-weight-medium my-5">
         ¿Quiere cerrar la sesión?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="celeste" outlined small @click="cerrar_sesion=false" >Cancelar</v-btn>
          <v-btn color="rosa" dark small @click="salir">Cerrar Sesión</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </v-app>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import store from '@/store'
	// import  SelectMixin from '@/mixins/SelectMixin.js';

  export default {
		// mixins:[SelectMixin],
    components: {

    },
    data: () => ({
      apk_movil:'http://producciongama.com/MANTENIMIENTO/mantenimiento.apk',
      iniciar: false,
      cerrar_sesion:false,
      valid:true,
      lazy:false,
      drawer: null,
      sesion: true,
      contrasenia: '',
      correo:'',
      show1: false,
      usarioRules: [v => !!v || 'Es requerido'],
      contraRules: [v => !!v || 'Es requerido'],
      snackbar: false,
      color:'rosa',
      text: '',

      items: [
          {
            icon: 'store',
            text: 'Administración',
            model: true,
            children: [
              { text: 'Inicio'                  ,path: '/'              , icon:'home'},
              { text: 'Reporte Mantenimiento'   ,path: '/mantenimiento' , icon:'mdi-file-document-edit'},
              { text: 'Calendario'              ,path:'calendario.mantenimiento' , icon:'mdi-calendar-account'}
            ],
          },
        ],
    }),
    //GUARDAR STRINGS -  
        // localStorage.setItem("titulo", "Curso de Angular avanzado - Víctor Robles");
    //GUARDAR OBJETOS -
        // localStorage.setItem("usuario", JSON.stringify(mi_objeto));
    //OBTENER INFORMACION -
        // JSON.parse(localStorage.getItem("usuario"));
          // JSON.parse() es para parsear o convertir algo a un objeto JSON usable por JavaScript.
          // JSON.stringify() es para crear un JSON string de un objeto o un array.
    // BORRAR UN ELEMENTO 
        // localStorage.removeItem("titulo");
    // VACIAR LOCAL 
        // localStorage.clear();

    created(){ 
      if (typeof(Storage) !== "undefined") {
        var usuario = '';
        // VERIFICO SI EXISTE UN USUARIO ACTIVO 
        if( usuario = JSON.parse(localStorage.getItem("usuario")) != null){ 
          usuario = JSON.parse(localStorage.getItem("usuario")) 
        }else{ 
          return 
        }

        if(usuario.id ){ 
          this.Authologin(usuario).then(response =>{
            this.saludar()
          }) 
        }
      } else {
        this.snackbar= true; this.text ="Este navegador no es compatible con el sistema."
      }
    },

    computed:{ ...mapGetters('Login',['getdatosUsuario','getLogeado','auth']) },
    methods:{
      ...mapActions('Login',['Login','salirLogin','authenticar','sucusales','Authologin']),

      IniciarSesion (){
        this.iniciar = true; var md5 = require('md5')
        var usuario = { usuario : this.correo.toUpperCase(), contrasenia: md5(this.contrasenia)};
        this.Login(usuario).then(response => {
          if(response){
            this.$router.push({name:'inicio'})
            this.saludar()
            localStorage.setItem("usuario", JSON.stringify(this.getdatosUsuario))
            this.limpiarCampos()
          }else{
            this.text  = "Lo siento amiguit@ algo salio mal. Verifica tus datos";this.snackbar = true;this.color="error"
            return
          }
        }).catch(error =>{
          console.log(error)
        }).finally(() => this.iniciar = false, this.sesion = false) 
      },

      saludar(){
        this.snackbar = true; this.text = 'HOLA DE NUEVO'+ ' '+this.getdatosUsuario.nombre; this.color="rosa"
      },

      salir(){
        localStorage.removeItem("usuario");
        this.cerrar_sesion= false;
        this.salirLogin()
        this.$store.dispatch("salir")
      },

      limpiarCampos(){
        this.correo = '';
        this.contrasenia = '';
      }
    }
  };
</script>


