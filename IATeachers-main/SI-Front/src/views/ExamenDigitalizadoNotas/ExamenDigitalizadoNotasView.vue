<template>

    <v-container class="generaldig">

        <v-container class="contenedor">

            <v-container class="parte-1">

                <v-container class="logodig"></v-container>

                <v-container class="docente">
                    <v-icon class=""></v-icon>
                    <!-- AQUÍ SE COLOCA EL NOMBRE DEL DOCENTE -->
                    <p class="d-1" id="nomb_Profe"></p>
                </v-container>

            </v-container>

            <v-container class="parte-2">
                <!-- AQUÍ SE COLOCA EL NOMBRE DE LA ASIGNATURA -->
                <p class="t-1" id="txtCurso"></p>
            </v-container>

            <v-container class="parte-3">
                <!-- AQUÍ SE COLOCA LA SECCIÓN Y EL NOMBRE DEL ESTUDIANTE -->
                <p class="t-2" id="txtAlumno"></p>

                <v-container class="cont-btn">
                    <v-container class="notafin" :class="notafinClass">
                        <p>{{ totalNota }}/{{ totalNotaMax }}</p>
                    </v-container>
                    <button class="btn-1" @click="CargarNota()">
                        <v-icon left></v-icon>
                        Cargar Nota</button>
                    <button class="btn-2" @click="SubirArchivo()">
                        <v-icon left></v-icon>
                        Regresar
                    </button>
                </v-container>

            </v-container>

            <v-container class="parte-4 contenido-desplazable">
                <v-row>
                    <v-col cols="2" v-for="(pregunta, index) in preguntas" :key="index">
                        <v-card class="lista">
                        <v-container class="cont_a">
                            <v-container class="cont_b">
                            <v-card-text class="card1">Pregunta {{ index + 1 }}</v-card-text>
                            </v-container>
                            <v-container class="cont_c" :class="preguntaClass(pregunta)">
                            <p class="text_nota">{{ pregunta.nota }}/{{ pregunta.notaMax }}</p>
                            </v-container>
                        </v-container>
                        <v-card-text class="card2">{{ pregunta.textoPregunta }}</v-card-text>
                        <v-card-text class="card3">{{ pregunta.textoRespuesta }}</v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

        </v-container>

    </v-container>

    <v-container class="raya-blanca"> </v-container>

    <v-container class="raya-roja">

    <v-container class="pie">      
        <p> © UCV - Docentes 2024 </p>
    </v-container>
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
                @click="aceptar">
                Aceptar
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
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
        </v-container>

</template>

<script>

export default {
    name: 'ExamenDigitalizadoNotasView',

    data() {
        return {
            profesor: "",
            idCurso: "",
            codigoE:'',
            curso: '',
            aula: '',
            estudiante: '',
            matriculas:[],
            preguntasR: [],
            respuestas: [],
            puntos:[],
            puntajesPorPregunta: [],
            puntaje: '',
            dialogError: false,
            dialogExit: false,
            mensaje: '',
            typemsg: "error",
            preguntas: [],
            notasConsolidado:[],
            nota: {
                idDetalleMC:'',
                idCurso:'',
                idMatricula:'',
                promedioPonderado:'0',
                estado:'desaprobado',
            },
            detallenota:{
                idDetalleMC:'',
                idTipo:'EP',
                idUnidad:'',
                nota:'',
            },
            notas:[],
        };
    },
    components:{

    },
    created(){
        this.CargarDatosProcesados();

    },
    computed: {
        totalNota() {
        this.detallenota.nota=this.preguntas.reduce((total, pregunta) => total + pregunta.nota, 0);
        return this.preguntas.reduce((total, pregunta) => total + pregunta.nota, 0);
        },
        totalNotaMax() {
        return this.preguntas.reduce((total, pregunta) => total + pregunta.notaMax, 0);
        },
        notafinClass() {
        const aprobatoria = this.totalNota / this.totalNotaMax >= 0.6;
        return aprobatoria ? 'notafin-aprobatoria' : 'notafin-desaprobatoria';
        }
    },
    mounted(){
        this.capturarDatos();
    },
    methods:{
        capturarDatos() {            
            this.$axios.get("/matricula").then((res)=>{this.matriculas=res.data;console.log(this.matricula);}).catch((error)=>error);
            
            this.codigoE= localStorage.getItem('codigoEstudiante');
            this.profesor = localStorage.getItem("nombreDocente");
            var nombreP = document.getElementById("nomb_Profe");
            this.idCurso = localStorage.getItem("idCurso");
            var cursoE = document.getElementById("txtCurso");
            this.curso = localStorage.getItem("nombreCurso");
            this.aula = localStorage.getItem("aula");
            this.estudiante = localStorage.getItem("nombreEst");
            var estcod = document.getElementById("txtAlumno");
            if (this.profesor !== null && this.profesor !== undefined) {
                if (nombreP) {
                    nombreP.innerText = this.profesor;
                    cursoE.innerText = "EXAMEN DE " + this.curso;
                    estcod.innerText = this.estudiante + " | " + this.aula;
                } else {
                console.log("Elemento con id 'nomb_Profesor' no encontrado.");
                }
            } else {
                console.log("El nombre del profesor es nulo o no está definido.");
            }
        },
        SubirArchivo() {
            this.$router.push("/SubirArchivo");
        },
        llenarDatosCurso() {
            var asig = document.getElementById("txtCurso");
            if (asig) {
            asig.innerText = "EXAMEN DE " + this.curso.NombreCurso;
            }
        },
        preguntaClass(pregunta) {
            const aprobatoria = pregunta.nota / pregunta.notaMax >= 0.6;
            return aprobatoria ? 'pregunta-aprobatoria' : 'pregunta-desaprobatoria';
        },
        CargarDatosProcesados(){
            this.preguntasR = JSON.parse(localStorage.getItem('preguntas'));
            this.respuestas = JSON.parse(localStorage.getItem('respuestas'));
            this.puntos = JSON.parse(localStorage.getItem('puntos'));
            this.puntajesPorPregunta = JSON.parse(localStorage.getItem('puntajesPorPregunta'));
            this.puntaje = JSON.parse(localStorage.getItem('puntaje'));
            if (this.preguntasR) {
                for (let i = 0; i < this.preguntasR.length; i++) {
                    this.preguntas.push({
                        nota: parseFloat(this.puntajesPorPregunta[i].toFixed(1)),
                        notaMax:  parseFloat(this.puntos[i]),
                        textoPregunta: this.preguntasR[i],
                        textoRespuesta: this.respuestas[i]
                    });
                }
            } else {
                this.mensaje="Los arreglos proporcionados no tienen la misma longitud.";
                this.dialogError=true;
            } 
        },

        aceptar(){
            this.dialogExit = false;
            this.mensaje= " ";
            this.$router.push("/ListaEstudiantes");
        },
        cerrar() {
            this.dialogError = false;
        },
        async CargarNota(){
            try{
                const matriculaE = this.matriculas.find(matricula => {
                    console.log("Comparando:", matricula.codigoE, this.codigoE); 
                    return matricula.codigoE == this.codigoE; 
                });
                console.log(matriculaE);
                
                if(matriculaE){
                    this.nota.idMatricula=matriculaE.idMatricula;
                    this.detallenota.idUnidad = localStorage.getItem('unidad');
                    this.nota.idCurso = this.idCurso;
                    await this.$axios.get('/notas').then((res)=>{this.notas=res.data;console.log(this.notas);});

                    const notaE= this.notas.find(nota=>nota.idMatricula===this.nota.idMatricula && nota.idCurso===this.nota.idCurso)
                    
                    console.log(this.notas);
                    let ultID = 0;
                    if (this.notas.length > 0) {
                        ultID = parseInt(this.notas.sort((a, b) => b.idDetalleMC - a.idDetalleMC)[0].idDetalleMC);
                        console.log("Hola"+ultID)
                    }
                    console.log("Ultimo id: ", ultID);
                if(!notaE){
                    this.nota.idDetalleMC = (ultID + 1).toString(); 
                    this.detallenota.idDetalleMC = (ultID + 1).toString();
                    const saveResponse = await this.$axios.post("/notas", this.nota);
                    const saveResponse1 = await this.$axios.post("/detallenota", this.detallenota);
                
                }else{
                    this.detallenota.idDetalleMC= notaE.idDetalleMC;
                    const saveResponse1 = await this.$axios.post("/detallenota", this.detallenota);
                
                }
                    this.mensaje= "La nota del estudiate "+this.estudiante+" ha sido registrada satisfactoriamente";
                this.dialogExit= true;
                }else{
                    this.mensaje="Error al entregar datos";
                    dialogError= true;
                }                
            }catch(error){
                this.mensaje= "La nota del estudiate "+this.estudiante+" no ha podido ser registrada";
                this.dialogError= true;
             }
        }
    
    },
};

</script>

<style src='../../views/ExamenDigitalizadoNotas/examenDigitalizadoNotas.css'></style>