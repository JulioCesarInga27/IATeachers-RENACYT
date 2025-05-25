<template>
  <v-container class="restablecerD">
        <v-container class="cont1-login">
          <v-col class="login-c1">
            <v-container class="logo"></v-container>
            <p class="bientext">Restablecer contraseña</p>
            <p class="texto">Ingresa la nueva contraseña que deseas asignar a tu usuario, recuerda que debe ser una contraseña segura.</p>
                    
            <v-text-field
              label="Codigo Docente"
              prepend-icon=""
              variant="outlined"
              v-model="usuario.codigoD"
            ></v-text-field>
            <v-text-field
              label="Contraseña"
              prepend-icon=""
              variant="outlined"
              v-model="usuario.password"
              type="password"
            ></v-text-field>
            <v-text-field
              label="Confirmar Contraseña"
              prepend-icon=""
              variant="outlined"
              v-model="confirmpassword"
              type="password"
            ></v-text-field>
          </v-col>
          
        <v-btn variant="tonal" class="btn-ini" type="button" @click="restablecer" prepend-icon="">
            Restablecer Contraseña
        </v-btn>
        <v-btn variant="tonal" class="btn-final" type="button" @click="volver" prepend-icon="">
            Iniciar Sesión
        </v-btn>
        </v-container>
  </v-container>
  <v-container class="raya-blanca"> </v-container>
  <v-container class="raya-roja">
    <v-container class="pie">      
    <p> © UCV - Docentes 2024 </p>
    </v-container>
  </v-container>
  <v-container class="raya-blanca"> </v-container>
  <v-container class="raya-roja"></v-container>
     <v-dialog v-model="dialogError" :width="500">
        <v-card color="#ec4a4a">
          <v-card-title>
            <span class="mx-auto">¡Verifique!</span>
          </v-card-title>
          <v-card-text>
            <v-alert
              v-if="mensaje !== ''"
              color="white"
              :type="typemsg"
              outlined>
              {{ mensaje }}
            </v-alert>
          </v-card-text>
          <v-card-actions class="prueba">
            <v-btn class="btncerrar"
              @click="cerrar">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
     </v-dialog>
     <v-dialog v-model="dialogValidar" :width="500">
        <v-card color="#002854">
          <v-card-title>
            <span class="mx-auto">Confirmación</span>
          </v-card-title>
          <v-card-text>
            <v-alert
              v-if="mensaje !== ''"
              color="white"
              :type="typemsg"
              outlined>
              {{ mensaje }}
            </v-alert>
          </v-card-text>
          <v-card-actions class="prueba">
            <v-btn class="btnclose1"
              @click="aceptar">
              Aceptar
            </v-btn>
            <v-btn class="btnclose1"
              @click="cancelar">
              Cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
     </v-dialog>
     <v-dialog v-model="dialogExit" :width="500">
        <v-card color="#002854">
          <v-card-title>
            <span class="mx-auto">Operación exitosa</span>
          </v-card-title>
          <v-card-text>
            <v-alert
              v-if="mensaje !== ''"
              color="white"
              :type="typemsg"
              outlined>
              {{ mensaje }}
            </v-alert>
          </v-card-text>
          <v-card-actions class="prueba">
            <v-btn class="btncerrar"
              @click="volver">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
     </v-dialog>
</template>

<script>
export default {
  name: 'RegistrarContraseñaView', 
  data(){
     return{
      usuario:{
        codigoD:'',
        username:'',
        password:'',
      },
      usuarioencontrado:'',
      confirmpassword:'',
      dialogValidar: false,
      dialogError: false,
      dialogExit: false,
      mensaje: '',
      typemsg: "error",
      tipousuario:'',
     }
  },
  created(){
    this.llenarCampos();
  },

  methods:{
    volver(){
      this.dialogExit=false;
      this.tipousuario=localStorage.getItem('tipoUsuario');
      this.tipousuario=localStorage.getItem('tipoUsuario');
          this.tipousuario=parseInt(this.tipousuario,10);
          if(this.tipousuario===1){
              this.$router.push("/adminLogin=admin");
          }else if(this.tipousuario===2){
              this.$router.push("/");
          }
    },
    llenarCampos(){
      this.usuario.codigoD = localStorage.getItem('codigoD')
    },

    restablecer(){
        if (!this.usuario.codigoD || !this.usuario.password || !this.confirmpassword) {
          this.mensaje = "Todos los campos deben ser completados.";
          this.dialogError = true;
          return;
        }

        if (this.usuario.password !== this.confirmpassword) {
          this.mensaje = "Verifique la contraseña y su confirmación";
          this.dialogError = true;
          this.usuario.password = '';
          this.confirmpassword = '';
          return;
        }

        this.$axios.get("/usuario/" + this.usuario.codigoD).then((res) => {
            this.usuarioencontrado = res.data;
            if(this.usuarioencontrado) {
              this.usuario.username= this.usuarioencontrado.username;
              this.mensaje = "¿Esta seguro que desea cambiar la contraseña de su cuenta?";
              this.typemsg = "success";
              this.dialogValidar = true;
            } else {
              this.mensaje = "No ha sido encontrada una cuenta asocida, al codigo del docente: ''"+this.usuario.codigoD +"', por favor verifique";
              this.dialogError = true;
            }
          })
          .catch((error) => {
            console.error(error);  
            this.mensaje = "Error al buscar datos del docente";
            this.dialogError = true;
          });
    },

    cerrar() {
      this.dialogError = false;
      this.mensaje= " ";
      this.limpiar();
    },

    cancelar(){
      this.dialogValidar = false;
      this.mensaje= " ";
      this.limpiar();
    },

    async aceptar(){
      this.dialogValidar=false;
      try {
        const saveResponse = await this.$axios.patch(`/usuario/${this.usuario.codigoD}`, this.usuario);
        this.limpiar();
        this.typemsg="success"
        this.mensaje = "La actualización ha sido completado con éxito";
        this.dialogExit = true;
      } catch (error) {
        console.error("Error al obtener los usuarios o al modificar el usuario:", error);
        this.mensaje = "Error durante el registro del usuario.";
        this.dialogError = true;
      }
    },

    limpiar(){
      this.usuario.username='';
      this.usuario.password='';
      this.confirmpassword='';
    },


  }
}
</script>


<style src='../../views/RestablecerContraseña/Restablecer.css'></style>
