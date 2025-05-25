<template>
    <v-container class="remitirCodigo">
          <v-container class="cont1-codigo">
  
            <v-col class="codigo-c1">
              <v-container class="logo"></v-container>
              <p class="bientext">Codigo de Verificación</p>

              <p class="texto">Ingresa tu correo electrónico y te enviaremos un código para que recuperes el acceso a tu cuenta.</p>

                <v-text-field
                  label="Correo Electrónico"
                  prepend-icon=""
                  variant="outlined"
                  v-model="correo"
                ></v-text-field>
            </v-col>
            <v-btn variant="tonal" class="btn-inicio" type="button" @click="enviarCodigo">
              Enviar Código
            </v-btn>
            <v-btn variant="tonal" class="btn-cancelar" type="button" @click="cancelar">
              Cancelar
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
          <v-btn class="btnclose"
            @click="cerrar">
            Cerrar
          </v-btn>
        </v-card-actions>
  
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogCorrect" :width="500">
        <v-card color="#002854">
          <v-card-title>
            <span class="mx-auto">Codigo de verificación</span>
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
              @click="verificar">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
     </v-dialog>
</template>
<script>
export default {
    name: 'RemitirCodigo', 
    data(){
      return{
        profesores: [],
        correo:"",
        mensaje: "",
        typemsg: "error", 
        dialogError: false,
        dialogCorrect: false,
        tipousuario:'',
      }
    },
    created(){
      this.obtenerUsuario();
    },
    methods:{
      obtenerUsuario(){
        this.$axios.get("/profesor").then((res)=>{this.profesores=res.data;}).catch((error)=>error);
      },
      cerrar() {
        this.mensaje= " "
        this.username = '';
        this.password = '';
        this.dialogError = false;
      },
      cancelar(){
          this.tipousuario=localStorage.getItem('tipoUsuario');
          this.tipousuario=parseInt(this.tipousuario,10);
          if(this.tipousuario===1){
              this.$router.push("/adminLogin=admin");
          }else if(this.tipousuario===2){
              this.$router.push("/");
          }
      },
      
      async enviarCodigo() {
        if(this.correo===''){
            this.mensaje = "Por ingrese un correo electrónico para iniciar el proceso";
            this.typemsg = "error";
            this.dialogError = true;
        }else{
            const emailPattern = /^(.+)@(gmail\.com|ucvvirtual\.edu\.pe)$/;
            if (!emailPattern.test(this.correo)) {
            this.mensaje = "La dirección de correo electrónico debe ser de tipo '@gmail.com' o '@ucvvirtual.edu.pe'";
            this.typemsg = "error";
            this.dialogError = true;
            return;
            }
            //Verificar correo valido dentro de base de datos 
            const profesorE= this.profesores.find(profesor=> profesor.correo===this.correo);
            if(!profesorE){
            this.mensaje = "La dirección de correo electrónico no esta vinculada a ningun docente, no esta registrado en base de datos";
            this.typemsg = "error";
            this.dialogError = true;
            return
            }else{
            localStorage.setItem('codigoD',profesorE.codigoD);
            }
            try {
                const response = await this.$axios.post("/email/enviarCorreo", { email: this.correo });
                this.mensaje="El codigo de verificacion ha sido enviado correctamente al correo de verificación: " + this.correo;
                this.typemsg="success"
                this.correo= "";
                this.dialogCorrect=true;

            } catch (error) {
                this.mensaje="Error al enviar el correo de verificación";
                console.log(error)
                this.dialogError=true;
            }
        }
        },
        verificar(){
                this.mensaje="";
                this.correo="";
                this.dialogCorrect= false;
                this.$router.push("/ValidarCodigo");
        }
    }
  }
  
  </script>
  <style src='../../views/RemitirCodigo/remitirCodigo.css'></style>
  