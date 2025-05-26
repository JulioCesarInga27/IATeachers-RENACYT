<template>
    <v-container class="m-general">
    
        <v-container class="seccionView">

            <v-container class="cont-infoper">
                <v-container class="cont-logo">
                    <div class="contenedor">
                        <div class="iconoo">
                            Acá iría la foto del usuario
                        </div>
                    </div>
                <v-container class="logo">
                    
                </v-container>
                </v-container>
                <v-container>
                <p class="usuario" id="txtNombreP"></p>
                </v-container>

                <v-container class="cont-cod">
                    Código:
                    <p class="codigo" id="txtCodigoP"></p>
                </v-container>

                <v-container class="cont-pag">
                    <v-col>
                    <v-btn href="https://calendar.google.com/calendar/u/0/r?pli=1"
                    class="btnDiri"
                    target="-blank">
                    <img
                        src="https://ssl.gstatic.com/images/branding/product/1x/calendar_2020q4_32dp.png"
                        alt="Calendario"
                        style="width:20px; height:20px; margin-right:8px;"
                    />            
                    Calendario </v-btn>
                </v-col>

                <v-col>
                    <v-btn href="https://www.google.com/intl/es-419/gmail/about/"
                    class="btnDiri"
                    target="-blank">
                    <img
                    src="https://ssl.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png"
                    alt="Gmail"
                    style="width:20px; height:20px; margin-right:8px;"
                    />            
                    Gmail</v-btn>
                </v-col>

                <v-col>
                    <v-btn href="https://docs.google.com/document/u/0/?tgif=d"
                    height="40"
                    class="btnDiri"
                    target="-blank">
                    <img
                    src="https://ssl.gstatic.com/images/branding/product/1x/docs_2020q4_32dp.png"
                    alt="Documentos"
                    style="width:20px; height:20px; margin-right:8px;"
                    />            
                    Documentos</v-btn>
                </v-col>

                <v-col>
                    <v-btn href="https://drive.google.com/drive/my-drive?hl=es"
                    height="40"
                    class="btnDiri"
                    target="-blank">
                    <img
                    src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"
                    alt="Drive"
                    style="width:20px; height:20px; margin-right:8px;"
                    />            
                    Drive</v-btn>
                </v-col>

                <v-col>
                    <v-btn href="https://keep.google.com/u/0/"
                    class="btnDiri"
                    target="-blank"> 
                    <img
                    src="https://ssl.gstatic.com/images/branding/product/1x/keep_2020q4_32dp.png"
                    alt="Keep"
                    style="width:20px; height:20px; margin-right:8px;"
                    />           
                    Keep</v-btn>
                </v-col>
                </v-container>

                <v-container class="dat">
                    <v-container class="dat-sexo">
                        <v-icon class=""></v-icon>
                        Sexo:  <p  class="sexo" id="txtgenero"></p>
                    </v-container>

                    <v-container class="dat-estado">
                        <v-icon class=""></v-icon>
                        Estado civil:  <p  class="estado" id="txtestado"></p>
                    </v-container>

                    <v-container class="dat-gmail">
                        <v-icon class=" "></v-icon>
                        Correo:  <p  class="correo" id="txtgmail"></p>
                    </v-container>
                </v-container>

                <v-btn variant="tonal" class="btn-cerrar" @click="cerrarSesion()">
                Cerrar Sesión
                </v-btn> 
            </v-container>

            <v-container class="cont-asignatura">
                <v-container class="cont-titulo">
                    <p class="t-1">Secciones</p>
                </v-container>

                <v-container class="cont-subtitulo">
                    <v-container class="A">
                        <p class="t-2" id="txtCurso"></p>
                    </v-container>
                    <v-container class="B">
                        <btn class="btn-regresar" @click="regrezarMenu()">
                            Regresar
                        </btn>
                    </v-container> 
                </v-container>

                <v-container class="contenido-desplazable all">
                    <v-row>
                        <v-col v-for="(aula, index) in aulas" :key="index" cols="2">
                            <v-card class="cursor-pointer lista" @click="irListaEstudiante(aula.aula)">
                            <v-card-text class="card1">Pabellón {{aula.idPabellon}}</v-card-text>
                            <v-card-title class="card2">{{aula.aula}}</v-card-title>
                            <v-card-text class="card3">Abierto | Modalidad: {{aula.descripcionM}}</v-card-text>
                            <v-divider thick></v-divider> 
                            <v-card-text class="card4">
                                <v-card-text class="card5">
                                    <v-container class="textlista">
                                        Turno {{aula.descripcionTurno}} | {{ profesor.nombresD + " "+ profesor.apellidosD }}
                                    </v-container>
                                    <v-container class="btnlista">
                                        <btn class="btn-entrar">
                                            Ver
                                        </btn>
                                    </v-container>
                                </v-card-text>
                            </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>

            </v-container>

        </v-container>   
    </v-container>

        <v-container class="m-raya-blanca"> </v-container>
        <v-container class="m-raya-roja">
        <v-container class="pie">      
        <p> © UCV - Docentes 2024 </p>
        </v-container>
        </v-container>

    </template>
    
    <script>
    export default {
        name: 'MenuSeccionView',

        data(){
            return{
            codigoD:"",
            idCurso:"",
            aulas:[],
            curso:"",
            profesor:"",
            }
        },
        created(){
            this.cargarDatos();
            this.capturarAulas();
        },
        methods:{
            cargarDatos(){
            this.capturarDatos();
            },
            capturarDatos(){
                this.codigoD = localStorage.getItem("codigoD");
                this.idCurso = localStorage.getItem("idCurso");

                this.$axios.get("/profesor/"+this.codigoD).then((res)=>{this.profesor=res.data;this.llenarDatosD()}).catch((error)=> error);
                this.$axios.get("/curso/by-id/"+this.idCurso).then((res)=>{this.curso=res.data;this.llenarDatosA()}).catch((error)=> error);
            },
            llenarDatosD(){
                var nombre = document.getElementById('txtNombreP');
                if (nombre) {
                    nombre.innerText = this.profesor.nombresD +" "+this.profesor.apellidosD;
                }
                var codigo = document.getElementById('txtCodigoP');
                if(codigo){
                    codigo.innerText = this.profesor.codigoD;
                }
                var genero = document.getElementById('txtgenero');
                if(genero){
                    if(this.profesor.idGenero === "F"){
                        genero.innerText = "femenino";
                    } else if(this.profesor.idGenero === "M"){
                        genero.innerText = "masculino";
                    } else {
                        genero.innerText = this.profesor.idGenero;
                    }
                }
                var estado = document.getElementById('txtestado');
                    if(estado){
                    if(this.profesor.idEstado === "S"){
                        estado.innerText = "soltero";
                    } else if(this.profesor.idEstado === "C"){
                        estado.innerText = "casado";
                    } else if(this.profesor.idEstado === "D"){
                        estado.innerText = "divorsiado";
                    } else if(this.profesor.idEstado === "V"){
                        estado.innerText = "viudo";
                    } else {
                        estado.innerText = this.profesor.idEstado;
                    }
                    }
                    var gmail = document.getElementById('txtgmail');
                    if(gmail){
                    gmail.innerText = this.profesor.correo;
                    }
                
            },
            llenarDatosA(){
                var asig = document.getElementById('txtCurso');
                if(asig){
                    asig.innerText = this.curso.idCurso + " | " + this.curso.NombreCurso + " | Abierto";
                }
            },
            irListaEstudiante(aulaA){
                this.$router.push("/ListaEstudiantes");
                localStorage.setItem('aula',aulaA);
            },
            capturarAulas(){
                this.$axios.get("/detallematricula/secciones/"+this.idCurso+"/"+this.codigoD).then((res)=>{this.aulas=res.data;console.log(this.aulas)}).catch((error)=> error);
            },
            cerrarSesion(){
                this.$router.push("/");
            },
            regrezarMenu(){
                this.$router.push("/menu")
            }

        }
    };
    
    
    </script>
    <style src='../../views/MenuSecciones/menuSecciones.css'></style>
