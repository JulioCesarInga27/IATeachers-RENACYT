<template>

<v-container class="m-general"> 

<v-container class="menuView">

  <v-container class="cont-infoper"> 
    <v-container class="">
      <v-container class=""></v-container>
    </v-container>

    <v-icon class=""></v-icon>

    <div class="contenedor">
      <div class="logo">
          Acá iría la foto del usuario
      </div>
    </div>
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
        <v-icon class=""></v-icon>
        Correo:  <p  class="correo" id="txtgmail"></p>
      </v-container>
    </v-container>
    

    <v-btn variant="tonal" class="btn-cerrar" @click="cerrarSesion()">
      Cerrar Sesión 
    </v-btn>  

  </v-container>

  <v-container class="cont-asignatura">
    <v-container class="cont-titulo">
      <p>Asignaturas</p>
    </v-container>
    
    <v-container class="contenido-desplazable all">

      <v-row>
        <v-col v-for="(asignatura, index) in asignaturas" :key="index" cols="4">
          <v-card class="cursor-pointer asig" @click="irMenuSeccion(asignatura.idCurso)">
            <v-img src="" height="200"></v-img>
            <v-card-text>{{ asignatura.idCurso }}</v-card-text>
            <v-card-title>{{ asignatura.NombreCurso }}</v-card-title>
            <v-card-subtitle>Abierto | Ciclo: {{ asignatura.idCiclo }}</v-card-subtitle>
            <v-card-text></v-card-text>
            <v-divider thick></v-divider> 
            <v-card-actions>
            <v-card-text>{{ profesor.nombresD + " "+ profesor.apellidosD }}</v-card-text>
            </v-card-actions>
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
  name: 'MenuView',

  data(){
    return{
      profesor: "",
      asignaturas: [],
      codigoD: "",
      username: "",
      mensaje:"",
      typemsg: "error",
      columnSize: 3 ,
      dialogError: false
    }
  },
  created(){
    this.cargarDatos();
  },
  methods:{
    cargarDatos(){
        this.capturarCodigoD();
        this.capturarAsignaturas();
    },
    capturarCodigoD(){
        this.codigoD = localStorage.getItem("codigoD");
        this.$axios.get("/profesor/"+this.codigoD).then((res)=>{this.profesor=res.data;this.llenarDatosD()}).catch((error)=> error);
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
    capturarAsignaturas(){
      this.$axios.get("/curso/by-codigoD/"+this.codigoD).then((res)=>{this.asignaturas=res.data;console.log(this.asignaturas)}).catch((error)=> error);
    },
    irMenuSeccion(idCurso){
      this.$router.push("/menuSecciones");
      localStorage.setItem('idCurso',idCurso);
      localStorage.setItem('nombreDocente',this.profesor.nombresD+' '+this.profesor.apellidosD);
    },
    cerrarSesion(){
      this.$router.push("/");
    }

  }
};


</script>
<style src='../../views/Menu/menu.css'></style>
