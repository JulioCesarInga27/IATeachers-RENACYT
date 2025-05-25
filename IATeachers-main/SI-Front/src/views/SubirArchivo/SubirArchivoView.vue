<template>
    <v-container class="generalsa">
      <v-container class="contenedor">
        <v-container class="parte-1">
          <v-container class="logosub"></v-container>
  
          <v-container class="docente">
            <v-icon class=""></v-icon>
            <p class="d-1" id="nomb_Profesor"></p>
          </v-container>
        </v-container>
  
        <v-container class="parte-2">
          <p class="t-1">Subir Archivo</p>
        </v-container>
  
        <v-container class="parte-3">
          <p class="t-2" id="txtEst"></p>
  
          <v-container class="cont-btn">
            <button class="btn-1" @click="Confirmacion()">
              <v-icon left></v-icon>
              Revisar
            </button>
            <button class="btn-2" @click="ListaEstudiantes()">
              <v-icon left></v-icon>
              Regresar
            </button>
          </v-container>
        </v-container>
  
        <v-container class="parte-4 contenido-desplazable">
          <v-container class="imagen-1">
            <p class="t-3">Archivo Original</p>
            <v-container class="cont-img contenido-desplazable">
              <div v-if="pdfSrc">
                <VuePdf v-for="page in pages" :src="pdfSrc" :page="page" :key="page" />
              </div>
            </v-container>
          </v-container>
  
          <v-container class="imagen-1">
            <p class="t-3">Archivo digitalizado</p>
            <v-container class="cont-img contenido-desplazable">
              <v-container class="pdftitulo">
                <p class="pdtit">EXAMEN DE {{ CursoPdf }}</p>
              </v-container>
              <v-container class="cont-alum">
                <p class="txtan"><strong>Apellidos:</strong> {{ nombres[1] }}</p>
                <p class="txtan"><strong>Nombres:</strong> {{ nombres[0] }}</p>
              </v-container>
              <v-container class="cont-preg">
                <v-container v-for="(pregunta, index) in preguntas" :key="index" class="cont-ppr">
                  <v-container class="cont-pp">
                    <v-container class="izq"><p>{{ index + 1 }}. {{ pregunta }}</p></v-container>
                    <p>({{ puntos[index] }} pts.)</p>
                  </v-container>
                  <v-container class="cont-r">
                    <p>- {{ respuestas[index] }}</p>
                  </v-container>
                </v-container>
              </v-container>
            </v-container>
          </v-container>
        </v-container>
      </v-container>
    </v-container>
  
    <v-container class="raya-blanca"></v-container>
  
    <v-container class="raya-roja">
      <v-container class="pie">
        <p>© UCV - Docentes 2024</p>
      </v-container>
    </v-container>

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
              @click="cancelar">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
     </v-dialog>
  </template>
  
  <script>
  import axios from 'axios';

  import { createLoadingTask } from 'vue3-pdfjs/esm';
  import { VuePdf } from 'vue3-pdfjs/esm';

    export default {
    components: {
        VuePdf,
    },

    data() {
        return {
            profesor: '',
            pdfSrc: null,
            estudiante: '',
            estudiantes:'',
            pages: [],
            aula: '',
            curso: '',
            dialogError: false,
            dialogExit: false,
            mensaje: '',
            typemsg: "error",
            dialogValidar:false,
            pdfResults:[],
            CursoPdf: '',
            preguntas: [],
            puntos: [],
            respuestas: [],
            nombres:[],
            puntaje:""
        };
    },
    created() {
      this.loadFileFromRoute();
      this.conectarIA();
    },
    mounted(){
      this.capturarDatos();
    },
    methods: {
        capturarDatos() {
          this.profesor = localStorage.getItem("nombreDocente");
          var nombreP = document.getElementById("nomb_Profesor");
          this.idCurso = localStorage.getItem("idCurso");
          this.estudiante = localStorage.getItem("nombreEst");
          var nombreE = document.getElementById("txtEst");
          this.curso = localStorage.getItem("nombreCurso");
          this.CursoPdf= this.curso;
          this.aula = localStorage.getItem("aula");
          if (this.profesor !== null && this.profesor !== undefined && this.estudiante !== null) {
            if (nombreP && nombreE) {
              nombreP.innerText = this.profesor;
              nombreE.innerText = this.estudiante + " | " + this.aula + " | " + this.curso;
            } else {
              console.log("Elemento con id 'nomb_Profesor' no encontrado.");
            }
          } else {
            console.log("El nombre del profesor es nulo o no está definido.");
          }
        },
        Confirmacion(){
          this.mensaje = "¿Está seguro que quiere continuar?";
          this.typemsg = "success";
          this.dialogValidar = true;
        },
        ListaEstudiantes() {
            this.$router.push('/ListaEstudiantes');
            localStorage.removeItem('fileToUpload');
        },

        async loadPDF(pdfData) {
            const loadingTask = createLoadingTask({ data: atob(pdfData.split(',')[1]) });
            const pdf = await loadingTask.promise;
            this.pdfSrc = pdfData;
            this.pages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
        },

        loadFileFromRoute() {
            const fileData = localStorage.getItem('fileToUpload');
            if (fileData) {
                this.loadPDF(fileData);
            } else {
                console.error('No se encontró el archivo PDF en localStorage');
            }
        },
        irExamenDigitalizados(){
          this.$router.push({ path: '/ExamenDigitalizadoNotas' });
        },
        cancelar(){
            this.dialogValidar = false;
            this.mensaje= " ";
            this.ListaEstudiantes();
        },

        async aceptar(){
          const nombreCompleto =this.nombres[0][0]+ ' '+this.nombres[1][0];
          console.log(nombreCompleto)
          console.log(this.estudiante);
          if(nombreCompleto === this.estudiante){
            try {
                this.irExamenDigitalizados();
            } catch (error) {
                this.mensaje = "Hubo un error.";
                this.dialogError = true;
            }
          }else{
          this.dialogValidar=false;
          this.mensaje = "El nombre del estudiante registrado en el examen no coincide con el estudiante seleccionado, por favor verifique";
          this.dialogError= true;
          }
          
        },

        async conectarIA(){
          let pdfBase64 = localStorage.getItem("fileToUpload");
          if (pdfBase64) {
              pdfBase64 = pdfBase64.replace('data:application/pdf;base64,', '');
              try {
                  const response = await axios.post('http://localhost:5000/evaluar', { pdf_base64: [pdfBase64] });
                  console.log("Archivo enviado exitosamente:");
                  this.handleResponse(response.data);
              } catch (error) {
                  console.error("Error al enviar el archivo:", error);
              }
          } else {
              console.error("No se encontró ningún archivo para cargar en localStorage.");
          }
        },
        handleResponse(data) {
          this.preguntas = data.resultados_pdf[0].json_content.Preguntas;
          this.nombres = data.resultados_pdf[0].json_content.Nombres;
          this.respuestas = data.resultados_pdf[0].json_content.Respuestas;
          this.puntos = data.resultados_pdf[0].json_content.Puntos;
          this.puntajesPorPregunta = data.resultados_pdf[0].json_content.PuntajesPorPregunta;
          this.puntaje = data.resultados_pdf[0].json_content.PuntajeTotal;
          localStorage.setItem('preguntas',JSON.stringify(this.preguntas));
          localStorage.setItem('nombres',JSON.stringify(this.nombres));
          localStorage.setItem('respuestas',JSON.stringify(this.respuestas));
          localStorage.setItem('puntos',JSON.stringify(this.puntos));
          localStorage.setItem('puntajesPorPregunta',JSON.stringify(this.puntajesPorPregunta));
          localStorage.setItem('puntaje',JSON.stringify(this.puntaje));
      }
    },
};

  </script>
  
  <style src="../../views/SubirArchivo/subirArchivo.css"></style>
  