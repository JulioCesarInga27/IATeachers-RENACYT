<template>
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css" rel="stylesheet">

  <v-container class="multi">
    <v-container class="cont-archi">
      <v-container v-container class="cont1">
        <v-container class="logoUCV"></v-container>
        <v-container class="docente">
          <v-icon class=""></v-icon>
          <p class="d-1" id="txtNombreP"></p>
        </v-container>
      </v-container>

      <v-container class="cont2">
        <p class="t-1">Revisión de Archivos Multiples</p>
      </v-container>

      <v-container class="cont3">
        <p class="t-2" id="txtCurso"></p>
        <v-container class="cont-btn">
              <p class="t-3">Unidad</p>
              <select
                v-model="selectedOptionUnidad"
                class="selec-1"
                @change="handleSelectChange">
                <option value="U1">1</option>
                <option value="U2">2</option>
                <option value="U3">3</option>
              </select>
          <button class="btn-1" @click="conectarIA()">
              Revisar
            </button>
          <button class="btn-2" @click="Regresar()">
            Regresar
          </button>
        </v-container>
      </v-container>

      <v-container class="cont-pdf">
        <v-container class="cajapdf">
          <div id="pdfContainer">
            <div v-for="(pdf, index) in pdfs" :key="index" class="pdf-item">
              <p class="tituPDF">
                <i class=""></i>
                {{ pdf.name }}
                <button @click="eliminarArchivo(index)" class=""></button>
              </p>
              <embed :src="pdf.src" type="application/pdf" width="100%" height="200px" />
            </div>
          </div>
        </v-container>
      </v-container>
      
    </v-container>
  </v-container>
  <v-container class="multi-raya-blanca"> </v-container>
  <v-container class="multi-raya-roja">
    <v-container class="mu-pie">
      <p>© UCV - Docentes 2024</p>
    </v-container>
  </v-container>
  <v-dialog v-model="dialogValidar" :width="900" >
  <v-card color="#002854">
    <v-card-title>
      <span class="mx-auto">Confirmación de registro de exámenes</span>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="estudiantesRe"
        item-key="nombreEstudiante"
      >
        <template v-slot:top>
          <v-alert
            v-if="mensaje !== ''"
            color="white"
            :type="typemsg"
            outlined
          >
            {{ mensaje }}
          </v-alert>
        </template>
        <template v-slot:item.calificacion="{ item }">
          {{ item.calificacion }}
        </template>
        <template v-slot:header> 
          <thead>
            <tr class="red darken-2"> 
              <th>Estudiante</th>
              <th>calificacion</th>
            </tr>
          </thead>
        </template>
        
      </v-data-table>
    </v-card-text>
    <v-card-actions class="prueba">
      <v-btn class="btnclose1" @click="CargarNota">
        Aceptar
      </v-btn>
      <v-btn class="btnclose1" @click="cancelar">
        Cancelar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
<v-dialog v-model="dialogPro" :width="500">
        <v-card color="#002854">
          <v-card-title>
            <span class="mx-auto">Procesando</span>
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
          <v-card-text></v-card-text>
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
              @click="ir">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombres:'',
      puntaje: '',
      profesor: "",
      idUnidad: "U1",
      curso: {},
      estudiantes: [],
      matriculas: [],
      codigoD: "",
      idCurso: "",
      aula: "",
      archivos: [],
      pdfSrc: null,
      pages: [],
      pdfs: [],
      selectedOptionUnidad: null,
      idUnidad: "U1",
      estudiantesRe:[],
      mensaje:'',
      dialogError: false,
      dialogExit: false,
      dialogPro: false,
      dialogValidar:false,
      typemsg:'',
      estudiantesE:[],
      codigoE:'',
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
    };
  },
  created() {
    this.capturarLista();
    
  },
  mounted() {
    this.obtenerbase64();
    this.capturarDatos();
    this.selectFirstOption();
  },
  methods: {
    selectFirstOption() {
      if (this.$refs.selectCalif && this.$refs.selectCalif.options.length > 0) {
        this.selectedOptionCalif = this.$refs.selectCalif.options[0].value;
      }
    },
    capturarLista() {
      this.codigoD = localStorage.getItem("codigoD");
      this.idCurso = localStorage.getItem("idCurso");
      this.aula = localStorage.getItem("aula");

      this.$axios
        .get("/curso/by-id/" + this.idCurso)
        .then((res) => {
          this.curso = res.data;
          this.llenarDatosCurso();
        })
        .catch((error) => {
          console.error(error);
        });

      this.$axios
        .get(
          "/matricula/condicion-nota/" +
            this.codigoD +
            "/" +
            this.idCurso +
            "/" +
            this.aula +
            "/" +
            this.idUnidad
        )
        .then((res) => {
          this.estudiantes = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    llenarDatosCurso() {
      var asig = document.getElementById("txtCurso");
      if (asig) {
        asig.innerText = this.curso.NombreCurso + " " + this.aula;
        localStorage.setItem("nombreCurso", this.curso.NombreCurso);
      } else {
        console.log("Elemento con id 'txtCurso' no encontrado.");
      }
    },
    handleSelectChange(event) {
      const selectedValue = event.target.value;
      console.log("Selected value:", selectedValue);
      this.idUnidad = selectedValue;
      this.capturarLista();
    },
    capturarDatos() {
      this.$axios.get("/matricula").then((res)=>{this.matriculas=res.data;console.log(this.matricula);}).catch((error)=>error);
      this.profesor = localStorage.getItem("nombreDocente");
      var nombreP = document.getElementById("txtNombreP");
      if (this.profesor !== null && this.profesor !== undefined) {
        if (nombreP) {
          nombreP.innerText = this.profesor;
        } else {
          console.log("Elemento con id 'nomb_Profesor' no encontrado.");
        }
      } else {
        console.log("El nombre del profesor es nulo o no está definido.");
      }
    },
    Regresar() {
      this.$router.push("/ListaEstudiantes");
    },
    obtenerbase64() {
      const serializedFiles = JSON.parse(localStorage.getItem("pdfFiles"));
      if (serializedFiles) {
        this.pdfs = serializedFiles.map(file => ({
          name: file.name,
          src: `data:${file.type};base64,${file.fileToUpload}`
        }));
      } else {
        console.log("No se encontraron archivos en el localStorage.");
      }
    },

    eliminarArchivo(index) {
      this.pdfs.splice(index, 1);
      localStorage.setItem("pdfFiles", JSON.stringify(this.pdfs));
    },

    async conectarIA() {
      this.mensaje="Los exámenes están siendo procesados por el sistema por favor espere un momento";
      this.dialogPro= true;
      let pdfFiles = JSON.parse(localStorage.getItem("pdfFiles"));
      
      if (pdfFiles && pdfFiles.length > 0) {
        const pdfBase64Array = pdfFiles.map(file => file.fileToUpload.replace('data:application/pdf;base64,', ''));
        
        try {
          const response = await axios.post('http://localhost:5000/evaluar', { pdf_base64: pdfBase64Array });
          console.log(response.data)
          this.handleResponse(response.data);
          this.dialogPro=false;
          this.mensaje='Las calificaciones de los estudiantes son las siguientes, por favor verifiquelas, si desea eliminar alguna seleccione la opción'
          this.dialogValidar=true;
        } catch (error) {
          this.dialogPro=false;
          this.mensaje='No se pudo completar el proceso de calificación, por favor intentarlo nuevamente'
          this.dialogError=true;
        }
      } else {
        this.mensaje='No se encontraron archivos para cargar en localStorage.'
        this.dialogError=true;
      }
    },

    handleResponse(data) {

        let numeroDeResultados = data.resultados_pdf.length;
        for (let i = 0; i < numeroDeResultados; i++) {
            this.nombres = data.resultados_pdf[i].json_content.Nombres;
            this.puntaje = data.resultados_pdf[i].json_content.PuntajeTotal;
            
            let nombresConcatenados = this.nombres[0][0] + ' ' + this.nombres[1][0];
            
            this.estudiantesRe.push({ nombreEstudiante: nombresConcatenados, puntaje: this.puntaje });
        }
      },
      cancelar(){
            this.dialogError = false;
            this.dialogPro= false;
            this.dialogExit= false;
            this.dialogValidar= false;
            this.mensaje= "";
      },
      ir(){
        this.dialogExit = false;
        this.Regresar();
      },

    async CargarNota() {
    try {
        console.log(this.estudiantesRe);
        for (let estudianteR of this.estudiantesRe) {
            const estudianteE= this.estudiantes.find(estudiante=>{return estudiante.nombresE + ' '+ estudiante.apellidosE===estudianteR.nombreEstudiante});
            // Encontrar IDMatricula
            const matriculaE = this.matriculas.find(matricula => matricula.codigoE == estudianteE.codigoE);
            this.detallenota.nota= estudianteR.puntaje;
            if (matriculaE) {
                this.nota.idMatricula= matriculaE.idMatricula;
                this.nota.idCurso=this.idCurso;
                this.detallenota.idUnidad=this.idUnidad;
                this.detallenota.idMatricula=matriculaE.idMatricula;

                const notaResponse = await this.$axios.get('/notas');
                const detalleResponse= await this.$axios.get('/detallenota');
                const notas = notaResponse.data;
                const detallenotas = detalleResponse.data;

                // Determinar el último ID de las notas existentes
                let ultID = 0;
                console.log('ID'+ultID)
                if (notas.length > 0) {
                    ultID = parseInt(notas.sort((a, b) => b.idDetalleMC - a.idDetalleMC)[0].idDetalleMC);
                }

                const notaE = notas.find(nota => nota.idMatricula === this.nota.idMatricula && nota.idCurso === this.nota.idCurso);
                const detallenotaE= detallenotas.find(detalle=> detalle.idDetalleMC=== this.detallenota.idDetalleMC && detalle.idTipo===this.detallenota.idTipo && detalle.idUnidad===this.detallenota.idUnidad);
                console.log(notaE);
                console.log(detallenotaE);
                if (!notaE) {
                    // Asignar el nuevo ID a la nota y al detalle de nota actual
                    this.nota.idDetalleMC = (ultID + 1).toString();
                    this.detallenota.idDetalleMC = (ultID + 1).toString();
                    await this.$axios.post("/notas", this.nota);
                    await this.$axios.post("/detallenota", this.detallenota);
                } else {
                    if(!detallenotaE){
                      this.detallenota.idDetalleMC= notaE.idDetalleMC;
                      await this.$axios.post("/detallenota", this.detallenota);
                    }else{
                      this.mensaje='Los estudiantes ya poseen notas'
                      this.dialogError=true;
                    }
                } 
            } else {
                console.log("Error al entregar datos para el estudiante ");
            }
          }  
        if(this.dialogError===false){
            this.dialogValidar=false;
          // Mensaje global si todos los procesos fueron exitosos
          this.mensaje = "Las notas de todos los estudiantes han sido registradas satisfactoriamente";
          this.dialogExit = true;
        }

    } catch (error) {
        console.error(error);
        this.mensaje = "Las notas de los estudiantes no han podido ser registradas";
        this.dialogError = true;
    }
}

  },
};
</script>

<style src="../../views/MultiArchivos/MultiArchivos.css"></style>
