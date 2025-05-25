<template>
  <v-container class="generalle">
    <v-container class="contenedorle">
      <v-container class="parte-1">
        <v-container class="logole"></v-container>

        <v-container class="docente">
          <v-icon class=""></v-icon>
          <!-- AQUÍ SE COLOCA EL NOMBRE DEL DOCENTE -->
          <p class="d-1" id="nomb_Profesor"></p>
        </v-container>
      </v-container>

      <v-container class="parte-2">
        <p class="t-1">Lista de Estudiantes</p>
      </v-container>

      <v-container class="parte-3">
        <!-- AQUÍ SE COLOCA LA ASIGNATURA Y LA SECCIÓN -->
        <p class="t-2" id="txtCurso"></p>

        <v-container class="cont-btn">
          <button class="btn-1" @click="BoletaNotas()">
            Boleta de Notas
          </button>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            accept=".pdf"
            multiple
            @change="abrirArchivos" />
          <button class="btn-1" @click="openFileInput2">
            Cargar Archivos
          </button>
          <button class="btn-2" @click="Regresar()">
            Regresar
          </button>
        </v-container>
      </v-container>

      <v-container class="parte-4 contenido-desplazable">
        <v-container class="tabla">
          <v-container class="parte-5">
            <v-container class="p-1">
              <p class="t-2">Buscar Estudiante</p>

              <v-container class="busc">
                <v-card flat>
                  <template v-slot:text>
                    <v-text-field
                      v-model="search"
                      label="Buscar"
                      prepend-inner-icon=""
                      variant="outlined"
                      hide-details
                      single-line></v-text-field>
                  </template>
                </v-card>
              </v-container>
            </v-container>

            <v-container class="p-2">
              <v-container class="p-3">
                <p class="t-2">Estado de Examen</p>
                <select
                  ref="selectCalif"
                  v-model="selectedOptionCalif"
                  class="selec-1 seleccalif">
                  <option :value="null" disabled selected hidden></option>
                  <option value="calificado">Calificado</option>
                  <option value="nocalificado">No Calificado</option>
                </select>
              </v-container>

              <v-container class="p-4">
                <button class="btn-3" @click="selectFirstOption">Limpiar
                </button>
              </v-container>
            </v-container>

            <v-container class="p-5">
              <p class="t-2">Unidad</p>
              <select
                v-model="selectedOptionUnidad"
                class="selec-1"
                @change="handleSelectChange">
                <option value="U1">1</option>
                <option value="U2">2</option>
                <option value="U3">3</option>
              </select>
            </v-container>
          </v-container>

          <v-table class="tabla-estudiantes">
            <thead>
              <tr>
                <th>N°</th>
                <th>Código E</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Condición Nota</th>
                <th>Nota</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="(item, index) in filteredStudents"
                :key="item.codigoE">
                <tr>
                  <td class="c1">{{ index + 1 }}</td>
                  <td class="c2">{{ item.codigoE }}</td>
                  <td class="c3">{{ item.nombresE }}</td>
                  <td class="c3">{{ item.apellidosE }}</td>
                  <td class="c4">{{ item.condicionNota }}</td>
                  <td class="c5">{{ item.nota }}</td>
                  <td class="c6">
                      <span @click="direccionar" class="clickable-text">Boleta</span>
                  </td>
                  <td class="c6">
                     <span @click="openFileInput(index)" class="clickable-text">Revisar</span>
                    <input
                      type="file"
                      :ref="'fileInput' + index"
                      @change="
                        handleFileChange(
                          $event,
                          index,
                          item.nombresE + ' ' + item.apellidosE,
                          item.codigoE,
                          item.nota
                        )
                      " 
                      accept=".pdf"
                      style="display: none" />
                  </td>
                </tr>
              </template>
            </tbody>
          </v-table>
        </v-container>
      </v-container>
    </v-container>
  </v-container>

  <v-container class="raya-blanca"> </v-container>

  <v-container class="raya-roja">
    <v-container class="pie">
      <p>© UCV - Docentes 2024</p>
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
            <v-btn class="btncerrar"
              @click="cerrar">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
     </v-dialog>
</template>

<script>

export default {
  data() {
    return {
      search: "",
      codigoE: "",
      selectedOptionCalif: null,
      selectedOptionUnidad: null,
      nombreE: "",
      apellidosE: "",
      profesor: "",
      idUnidad: "U1",
      idCurso: "",
      estudiantes: [],
      archivos: [],
      dialogError:false,
      mensaje:'',
      typemsg:'error'
    };
  },
  created() {
    this.capturarLista();
  },
  mounted() {
    this.capturarDatos();
    this.selectedOptionUnidad = "U1";
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
        .catch((error) => error);
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
      }
    },
    capturarDatos() {
      this.profesor = localStorage.getItem("nombreDocente");
      var nombreP = document.getElementById("nomb_Profesor");
      this.idCurso = localStorage.getItem("idCurso");
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

    handleSelectChange(event) {
      const selectedValue = event.target.value;
      console.log("Selected value:", selectedValue);
      this.idUnidad = selectedValue;
      this.capturarLista();
    },

    BoletaNotas() {
      this.$router.push("/boletaNotas");
    },

    Regresar() {
      this.$router.push("/menuSecciones");
    },

    openFileInput(index) {
      this.$refs["fileInput" + index][0].click();
    },

    handleFileChange(event, index, nombreEstudiante,codigoE,nota) {
      if(nota===0){
          localStorage.setItem("nombreEst", nombreEstudiante);
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
          const reader = new FileReader();
          reader.onload = () => {
            localStorage.setItem("fileToUpload", reader.result);
            localStorage.setItem('unidad', this.idUnidad)
            localStorage.setItem('codigoEstudiante',codigoE);
            this.$router.push({ path: "/SubirArchivo" });
          };
          reader.readAsDataURL(file);
        } else {
          alert("Por favor, seleccione un archivo PDF válido.");
        }
      }else{
          this.mensaje= "No puede continuar con el proceso,ya que el estudiante seleccionado posee una nota registrada, por favor verificar "
          this.dialogError=true;
      }
      
    },

    openFileInput2() {
      this.$refs.fileInput.click();
    },

    abrirArchivos(event) {
      const files = event.target.files;
      const serializedFiles = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          file.type === "application/pdf" ||
          file.type === "application/x-pdf" ||
          file.type === "application/x-bzpdf" ||
          file.type === "application/x-gzpdf"
        ) {
          const reader = new FileReader();
          reader.onload = () => {
            const fileContent = reader.result.split(";base64,")[1];
            const serializedFile = {
              name: file.name,
              type: file.type,
              size: file.size,
              fileToUpload: fileContent,
            };
            serializedFiles.push(serializedFile);
            if (serializedFiles.length === files.length) {
              localStorage.setItem("pdfFiles", JSON.stringify(serializedFiles));
              this.$router.push("/multiArchivos");
            }
          };
          reader.readAsDataURL(file);
        } else {
          console.log(`El archivo ${file.name} no es un archivo PDF válido.`);
        }
      }
    },

    
    cerrar() {
            this.dialogError = false;
            this.mensaje= " ";
        },
    direccionar(){
      this.$router.push("/boletaNotas");
    }
  },

  computed: {
    filteredStudents() {
      let filteredList = this.estudiantes;
      if (this.search) {
        const searchTerm = this.search.trim().toLowerCase();
        filteredList = filteredList.filter(
          (estudiante) =>
            estudiante.nombresE.toLowerCase().includes(searchTerm) ||
            estudiante.apellidosE.toLowerCase().includes(searchTerm)
        );
      }
      if (this.selectedOptionCalif === "calificado") {
        console.log("Filtrando por calificado");
        filteredList = filteredList.filter(
          (estudiante) => estudiante.condicionNota === "Calificado"
        );
      } else if (this.selectedOptionCalif === "nocalificado") {
        console.log("Filtrando por no calificado");
        filteredList = filteredList.filter(
          (estudiante) => estudiante.condicionNota !== "Calificado"
        );
      } else {
        console.log("Mostrando todos los estudiantes");
      }
      return filteredList;
    },
  },
};
</script>

<style src="../../views/ListaEstudiantes/listaEstudiantes.css"></style>
