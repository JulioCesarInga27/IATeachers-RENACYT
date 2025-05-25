<template>
    <v-container class="loginAdmin">   
        <v-container class="cont1-lodadmi">
            <v-col class="login-c1">
                
                <v-container class="logo"> UNIVERSIDAD CÉSAR VALLEJO</v-container>

                <v-text-field
                    label="Usuario"
                    prepend-icon=""
                    variant="outlined"
                    v-model="username"
                ></v-text-field>

                <v-text-field
                    label="Contraseña"
                    prepend-icon=""
                    variant="outlined"
                    v-model="password"
                    type="password"
                ></v-text-field>
            </v-col>

            <v-btn variant="tonal" class="btn-inicio" type="button" @click="iniciarSesion">
                Iniciar Sesión
            </v-btn>
            <v-btn variant="text" class="btn-contra" @click="restablecer">
                ¿Olvidaste tu contraseña?
            </v-btn>

        </v-container>
        <v-container class="logoCandado"></v-container>
    
    </v-container>
    <v-container class="lod2"></v-container>
        <v-container class="lo-raya-blanca"> </v-container>
        <v-container class="lo-raya-roja">
        <v-container class="lo-pie">      
        <p> © UCV - Docentes 2024 </p>
        </v-container>
    </v-container>
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
</template>

<script>
export default {
    name: 'LoginAdmin',
    data(){
        return{
            usuarios: [],
            username: "",
            password: "",
            mensaje: "",
            typemsg: "error",
            dialogError:false,
        }
    },
    created(){
        this.obtenerUsuario();
    },
    methods:{
        obtenerUsuario(){
            this.$axios.get("/usuario").then((res)=>{this.usuarios=res.data;}).catch((error)=>error);
        },
        async iniciarSesion(){
            if(this.username===""|| this.password===""){
                this.mensaje="Faltan completar los campos, por favor ingresarlos"
                this.dialogError=true;
            }else{
                try{

                    const response= await this.$axios.post("/usuario/validar",{
                        username: this.username,
                        password: this.password,
                    });
                    if(response.data.message==='Autenticación exitosa'){
                        const usuarioE= this.usuarios.find(usuario=>usuario.username===this.username && usuario.password===this.password);
                        if(usuarioE.issuperuser===false){
                            this.mensaje="El usuario ingresado no esta autorizado para este módulo, verifique la veracidad de sus credenciales";
                            this.dialogError=true;
                        }else{
                            this.$router.push("/dashBoardAdmin");
                            localStorage.setItem('codigoD', usuarioE.codigoD);
                        }
                    }

                }catch(error){
                    if(error.response && error.response.status===401){
                        this.mensaje="Credeciales inconrrectas,por favor revisar el usuario y contraseña";
                    }else{
                        this.mensaje= "Error desconocido al iniciar sesión"
                    }
                    this.dialogError= true;
                }
            }
        },
        cerrar(){
            this.mensaje="";
            this.username="";
            this.password="";
            this.dialogError=false;
        },
        restablecer(){
            localStorage.removeItem('tipoUsuario');
            localStorage.setItem('tipoUsuario',1);
            this.$router.push("/remitirCodigo")
        }
    }
}
</script>

<style src="../../views/LoginAdmin/loginAdmin.css"></style>