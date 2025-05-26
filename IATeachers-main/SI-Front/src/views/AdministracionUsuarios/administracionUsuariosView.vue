<template >
    <v-container class="adminU">   
        
        <v-container class="cont2">
            <v-container class="logo"></v-container>
            <v-container class="contenedorP">
                <p class="titu">Datos del docente</p>
                <v-divider class="divi"></v-divider> 
                <v-row class="conten">
                    <!-- Primera fila -->
                    <v-col cols="12" md="3">
                    <v-text-field
                        label="Codigo Docente"
                        v-model="profesor.codigoD"
                        prepend-icon=""
                        variant="outlined"
                        required
                        :disabled="docenteSeleccionado"
                        
                    > </v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                    <v-text-field
                        label="Dni"
                        v-model="profesor.dniProf"
                        prepend-icon=""
                        variant="outlined"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                    <v-text-field
                        label="Correo"
                        v-model="profesor.correo"
                        prepend-icon=""
                        variant="outlined"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                    <v-combobox
                        label="Genero"
                        v-model="selectedGenero"
                        prepend-icon=""
                        :items="generos"
                        variant="outlined"
                        required
                    ></v-combobox>
                    </v-col>
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-combobox
                        label="Estado Civil"
                        prepend-icon=""
                        :items="estados"
                        variant="outlined"
                        v-model="selectedEstado"
                        required
                    ></v-combobox>
                    </v-col>

                    <!-- Segunda fila -->
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-text-field
                        label="Nombres"
                        v-model="profesor.nombresD"
                        prepend-icon=""
                        variant="outlined"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-text-field
                        label="Apellidos"
                        v-model="profesor.apellidosD"
                        prepend-icon=""
                        variant="outlined"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-text-field
                        label="Celular"
                        v-model="profesor.celular"
                        prepend-icon=""
                        variant="outlined"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-text-field
                        label="Dirección"
                        v-model="profesor.direccion"
                        prepend-icon=""
                        variant="outlined"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-combobox
                        label="Distrito"
                        prepend-icon=""
                        :items="distritos"
                        variant="outlined"
                        v-model="selectedDistrito"
                        required
                    ></v-combobox>
                    </v-col>
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-combobox
                        label="Tipo de usuario"
                        prepend-icon=""
                        :items="['Docente', 'Administrativo']"
                        variant="outlined"
                        v-model="selectedTipo"
                        required
                    ></v-combobox>
                    </v-col>
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-text-field
                        label="Usuario"
                        v-model="usuario.username"
                        prepend-icon=""
                        variant="outlined"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-text-field
                        label="Contraseña"
                        v-model="usuario.password"
                        prepend-icon=""
                        variant="outlined"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="mt-n6">
                    <v-text-field
                        label="Confirmar Contraseña"
                        v-model="confirmpassword"
                        prepend-icon=""
                        variant="outlined"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-container class="cont-b">                        
                        <v-btn prepend-icon="" @click="registrar"  :disabled="docenteSeleccionado" class="btn-registrar">
                            Registrar
                        </v-btn>                  
                        <v-btn prepend-icon=""  :disabled="!docenteSeleccionado" @click="modificar" class="btn-modificar">
                            Actualizar
                        </v-btn>
                        <v-btn prepend-icon=""  @click="limpiar" class="btn-limpiar">
                            Limpiar
                        </v-btn>
                    </v-container>
                    
                </v-row>

            </v-container>
            <v-table class="tabla-docentes">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>DNI</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Celular</th>
                    <th>Dirección </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(profesor, index) in paginatedProfesores" :key="index">
                    <tr>
                    <td class="c1" @click="seleccionar(profesor.p_codigoD)">{{profesor.p_codigoD}}</td>
                    <td class="c2">{{profesor.p_dniProf }}</td>
                    <td class="c3">{{profesor.p_nombresD}}</td>
                    <td class="c4">{{profesor.p_apellidosD}}</td>
                    <td class="c5">{{profesor.p_correo}}</td>
                    <td class="c6">{{profesor.p_celular}}</td>
                    <td class="c7">{{profesor.p_direccion}}</td>
                    <td class="c6">
                        <v-icon class=""  @click="handleIconClick(profesor.p_codigoD)"></v-icon>
                    </td>
                    </tr>
                </template>
                </tbody>
            </v-table>
            <v-container class="pagination">
                <v-btn @click="prevPage" :disabled="currentPage === 1" class="botonPag">Anterior</v-btn>
                <span class="utils">Página {{ currentPage }} de {{ totalPages }}</span>
                <v-btn @click="nextPage" :disabled="currentPage === totalPages" class="botonPag">Siguiente</v-btn>
            </v-container>
        </v-container>        
    
        <v-container class="fondoMitad">

                
            <v-container class="contenedorUser">
                <v-container class="cont-logoUCV">
                    <v-container class="logoPRIN">
                        <p class="textlogo">Acá iría la foto del usuario</p> 
                    </v-container>
                </v-container>
                <v-container class="contenedorInfo"> 
                <v-icon class=""></v-icon>
                

                <v-container>
                    <p class="usuarioEncontrado" id="">{{ nombresCompletos }}</p>
                </v-container>

                <v-container class="contenedorCodigo">
                    Código:<p id="">{{ codigoBuscado }}</p>
                </v-container>

                <v-container class="contenedorAcceso">
                    <v-row justify="center" dense>
                        <!-- Fila 1 -->
                        <v-col cols="6" sm="5" md="4" class="sepic d-flex justify-center">
                        <v-btn 
                            href="https://calendar.google.com/calendar/u/0/r?pli=1"
                            height="30"
                            target="_blank"
                            class="d-flex align-center"
                            style="min-width: 120px;"
                        >
                            <img
                            src="https://ssl.gstatic.com/images/branding/product/1x/calendar_2020q4_32dp.png"
                            alt="Calendario"
                            style="width:20px; height:20px; margin-right:8px;"
                            />
                            Calendario
                        </v-btn>
                        </v-col>
                        
                        <v-col cols="6" sm="5" md="4" class="sepic d-flex justify-center">
                        <v-btn 
                            href="https://www.google.com/intl/es-419/gmail/about/"
                            height="30"
                            target="_blank"
                            class="d-flex align-center"
                            style="min-width: 120px;"
                        >
                            <img
                            src="https://ssl.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png"
                            alt="Gmail"
                            style="width:20px; height:20px; margin-right:8px;"
                            />
                            Gmail
                        </v-btn>
                        </v-col>
                        
                        <!-- Fila 2 -->
                        <v-col cols="6" sm="5" md="4" class="sepic d-flex justify-center">
                        <v-btn 
                            href="https://docs.google.com/document/u/0/?tgif=d"
                            height="30"
                            target="_blank"
                            class="d-flex align-center"
                            style="min-width: 120px;"
                        >
                            <img
                            src="https://ssl.gstatic.com/images/branding/product/1x/docs_2020q4_32dp.png"
                            alt="Documentos"
                            style="width:20px; height:20px; margin-right:8px;"
                            />
                            Documentos
                        </v-btn>
                        </v-col>
                        
                        <v-col cols="6" sm="5" md="4" class="sepic d-flex justify-center">
                        <v-btn 
                            href="https://drive.google.com/drive/my-drive?hl=es"
                            height="30"
                            target="_blank"
                            class="d-flex align-center"
                            style="min-width: 120px;"
                        >
                            <img
                            src="https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"
                            alt="Drive"
                            style="width:20px; height:20px; margin-right:8px;"
                            />
                            Drive
                        </v-btn>
                        </v-col>
                    </v-row>

                </v-container>

                <v-container class="menubtn">
                    <v-btn class="btnmenu1 text-none" @click="irUsuarios">
                        Gestión de Usuarios
                    </v-btn>
                    <v-btn class="btnmenu1 text-none" @click="irReporte">
                        Reporte
                    </v-btn>
                    <v-btn class="btnmenu1 text-none" @click="cerrarSesion">
                        Cerrar Sesión
                    </v-btn>
                </v-container>

            </v-container>

        </v-container>
        </v-container>
    </v-container>
        <v-container class="aU-raya-blanca"> </v-container>
        <v-container class="aU-raya-roja">
        <v-container class="aU-pie">      
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
                @click="cancelar">
                Aceptar
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
                @click="deleteProfesor">
                Aceptar
                </v-btn>
                <v-btn class="btnclose1"
                @click="cancelar">
                Cancelar
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
    export default{
        name: 'Administracion',
        data(){
            return{
                nombresCompletos:'',
                codigoBuscado:'',
                profesorBuscado:'',
                profesores:[],
                distritos:[],
                usuarios:[],
                distritosBus:[],
                generos:[],
                generosBus:[],
                estados:[],
                estadosBus:[],
                profesor:{
                    codigoD:'',
                    dniProf: '',
                    nombresD: '',
                    apellidosD: '',
                    correo:'',
                    celular:'',
                    direccion:'',
                    idGenero:'',
                    idEstado:'',
                    idDistrito:'',
                },
                usuario:{
                    id: '',
                    username:'',
                    password:'',
                    issuperuser:false,
                    codigoD:'',
                },
                confirmpassword:'',
                codigoD: '',
                currentPage: 1,
                itemsPerPage: 4,
                dialogValidar: false,
                dialogError: false,
                dialogExit: false,
                mensaje: '',
                typemsg: "error",
                selectedGenero: '',
                selectedEstado: '',
                selectedDistrito:'',
                selectedTipo:'',
                errores:[],
                docenteSeleccionado: false,
            }
        },
        created(){
            this.capturarLista();
            this.buscarNombresDocente()
        },
        mounted(){
            this.capturarLista();
        },
        computed: {
            totalPages() {
            return Math.ceil(this.profesores.length / this.itemsPerPage);
            },
            paginatedProfesores() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = this.currentPage * this.itemsPerPage;
            return this.profesores.slice(start, end);
            }
        },
        methods: {
            cerrarSesion(){
                localStorage.removeItem('codigoD');
                this.$router.push("/adminLogin=admin");
            },

            irReporte(){
                this.$router.push("/dashBoardAdmin");
            },

            irUsuarios(){
                this.$router.push("/administracionUsuarios");
            },

            async capturarLista(){
                try{
                    const response= await this.$axios.get('/profesor/profesoresUsuarios');
                    this.profesores = response.data;

                    const responseGenero = await this.$axios.get('/genero');  
                    this.generos = responseGenero.data.map(genero => genero.descripcion); 
                    this.generosBus = responseGenero.data;

                    const responseEstados= await this.$axios.get('/estadocivil')
                    this.estados= responseEstados.data.map(estado=>estado.descripcionE);
                    this.estadosBus= responseEstados.data;

                    const responseDistrito = await this.$axios.get('/distrito')
                    this.distritos= responseDistrito.data.map(distrito=>distrito.Nombre_Di);
                    this.distritosBus = responseDistrito.data;
                }catch (error){
                    console.error('Error al obtener los datos:', error);
                }
            },
            buscarNombresDocente(){
                const codigoProfesor= localStorage.getItem('codigoD');
                this.codigoBuscado= codigoProfesor;
                this.$axios.get('/profesor/'+this.codigoBuscado).then((res)=>{this.profesorBuscado=res.data;this.nombresCompletos= this.profesorBuscado.nombresD + " "+this.profesorBuscado.apellidosD;}).catch((error)=>error)
            },
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                }
            },
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            },
            handleIconClick(codigoD) {
                this.profesor.codigoD= codigoD;
                this.mensaje= "¿Estas seguro que deseas eliminar al docente con código "+ codigoD+ " de nuestro registro?";
                this.typemsg='success';
                this.dialogValidar=true;
            },
            seleccionar(codigoD){
                this.profesor.codigoD=codigoD;
                const profesorSeleccionado = this.profesores.find(p => p.p_codigoD === codigoD);
                this.profesor.nombresD= profesorSeleccionado.p_nombresD;
                this.profesor.apellidosD= profesorSeleccionado.p_apellidosD;
                this.profesor.dniProf= profesorSeleccionado.p_dniProf;
                this.profesor.correo= profesorSeleccionado.p_correo;
                this.profesor.direccion= profesorSeleccionado.p_direccion;
                this.profesor.celular= profesorSeleccionado.p_celular;
                this.usuario.username= profesorSeleccionado.username;
                this.usuario.password= profesorSeleccionado.password;

                const distritoE= this.distritosBus.find(d => d.IDDistrito === profesorSeleccionado.p_idDistrito);
                if(distritoE){
                    this.selectedDistrito= distritoE.Nombre_Di;
                }
            
                const generoE= this.generosBus.find(g=>g.idGenero === profesorSeleccionado.p_idGenero);
                if(generoE){
                    this.selectedGenero= generoE.descripcion;
                }
            
                const estadoE= this.estadosBus.find(e=>e.idEstado=== profesorSeleccionado.p_idEstado);
                if(estadoE){
                    this.selectedEstado= estadoE.descripcionE;
                }
                
                if(profesorSeleccionado.issuperuser===1){
                    this.selectedTipo='Administrativo'
                }else{
                    this.selectedTipo='Docente'
                }
                this.docenteSeleccionado = true;
            },

            async deleteProfesor() {
                try {
                    const reponseUser= await this.$axios.delete(`/usuario/${this.profesor.codigoD}`);
                    const response = await this.$axios.delete(`/profesor/${this.profesor.codigoD}`);
                    this.profesores = this.profesores.filter(profesor => profesor.p_codigoD !== this.profesor.codigoD);
                    this.dialogValidar=false;
                    this.typemsg='success'
                    this.mensaje='El profesor con código '+this.profesor.codigoD+' ha sido eliminado con éxito'
                    this.dialogExit=true;
                } catch (error) {
                    this.mensaje='Error al eliminar profesor:'+ error;
                    this.dialogError= true
                }
            },
            cancelar(){
                this.dialogValidar= false;
                this.dialogError= false;
                this.dialogExit= false;
                this.mensaje= '';
            },
            validar() {
                this.errores = [];

                if (!this.profesor.codigoD) this.errores.push('Código Docente requerido.');
                if (!this.profesor.dniProf) this.errores.push('DNI requerido.');
                if (!this.profesor.nombresD) this.errores.push('Nombres requeridos')
                if (!this.profesor.apellidosD) this.errores.push('Apellidos requeridos')
                if (!this.profesor.celular) this.errores.push('Celular requerido')
                if (!this.profesor.direccion) this.errores.push('Dirección requerida')
                if (!this.profesor.correo) this.errores.push('Correo requerido.');
                if (!this.selectedGenero) this.errores.push('Género requerido.');
                if (!this.selectedEstado) this.errores.push('Estado requerido.');
                if (!this.selectedDistrito) this.errores.push('Distrito requerido.');
                if (!this.usuario.username) this.errores.push('Usuario requerido.');
                if (!this.usuario.password) this.errores.push('Contraseña requerido');
                if (!this.confirmpassword) this.errores.push('Confirmar Contraseña requerido.');

                return this.errores.length === 0;
            },
            async modificar(){
                if(!this.validar()){
                    this.mensaje='Faltan completar algunos campos, por favor proceda a completarlos'
                    this.typemsg= 'error';
                    this.dialogError=true;
                }else{
                    if(this.usuario.password!== this.confirmpassword){
                        this.mensaje= "Las contraseñas no concuerdan, por favor verifique estos campos";
                        this.typemsg='error';
                        this.dialogError=true;
                    }else{
                        try{    
                            this.profesor.idGenero= this.selectedGenero.charAt(0);
                            this.profesor.idEstado= this.selectedEstado.charAt(0);
                            const distritoSeleccionado = this.distritosBus.find(d => d.Nombre_Di === this.selectedDistrito);
                            if (distritoSeleccionado) {
                                this.profesor.idDistrito = distritoSeleccionado.IDDistrito;
                            } else {
                                console.log('No encontrado');
                            }   
                            const profesorActualizado={
                                dniProf: this.profesor.dniProf,
                                nombresD: this.profesor.nombresD,
                                apelldosD: this.profesor.apellidosD,
                                correo: this.profesor.correo,
                                celular: this.profesor.celular, 
                                direccion: this.profesor.direccion,
                                idGenero: this.profesor.idGenero,
                                idEstado: this.profesor.idEstado,
                                idDistrito: this.profesor.idDistrito
                            }

                            const responseP= await this.$axios.patch(`/profesor/${this.profesor.codigoD}`,profesorActualizado)

                            const usuarioEn= await this.$axios.get('/usuario/'+this.profesor.codigoD);
                            this.usuario.codigoD= this.profesor.codigoD;
                            if(this.selectedTipo==='Docente'){
                                    this.usuario.issuperuser=false;
                            }else if(this.selectedTipo==='Administrativo'){
                                    this.usuario.issuperuser=true;
                            }

                            if(!usuarioEn){
                                await this.registrarUsuario();
                            }else{
                                const usuarioActualizado = {
                                        username: this.usuario.username,
                                        password: this.usuario.password,
                                        issuperuser: this.usuario.issuperuser,
                                        };
                                const response = await this.$axios.patch(`/usuario/${this.usuario.codigoD}`, usuarioActualizado);
                            }

                            this.mensaje="Los datos del docente con código de identificación "+this.profesor.codigoD+" han sido actualizados con éxito";
                            this.typemsg='success';
                            this.dialogExit=true;
                            this.limpiar();
                        }catch(error){
                            this.mensaje="Error al realizar la actualización de los datos";
                            this.typemsg="error";
                            this.dialogError=true;
                        }
                    }
                }
            },
            async registrar(){
                if (!this.validar()){
                    this.mensaje='Faltan completar algunos campos, por favor proceda a completarlos'
                    this.typemsg= 'error';
                    this.dialogError=true;
                }else{
                    if(this.usuario.password!== this.confirmpassword){
                        this.mensaje= "Las contraseñas no concuerdan, por favor verifique estos campos";
                        this.typemsg='error';
                        this.dialogError=true;
                    }else{
                        const profesorE = this.profesores.find(p => p.p_codigoD === this.profesor.codigoD);
                        if(!profesorE){
                            this.mensaje='No se puede registrar, ya existe un profesor con ese codigo';
                            this.typemsg='error';
                            this.dialogError=true;
                        }else{
                            try {
                            this.profesor.idGenero= this.selectedGenero.charAt(0);
                            this.profesor.idEstado= this.selectedEstado.charAt(0);
                            const distritoSeleccionado = this.distritosBus.find(d => d.Nombre_Di === this.selectedDistrito);
                            if (distritoSeleccionado) {
                                this.profesor.idDistrito = distritoSeleccionado.IDDistrito;
                            } else {
                                console.log('No encontrado');
                            }   
                            const response = await this.$axios.post('/profesor', this.profesor);
                            await this.capturarLista();
                            this.currentPage = Math.ceil(this.profesores.length / this.itemsPerPage);

                            this.usuario.codigoD= this.profesor.codigoD;
                            this.usuario.id= this.profesor.codigoD;
                            if(this.selectedTipo==='Docente'){
                                this.usuario.issuperuser=false;
                            }else if(this.selectedTipo==='Administrativo'){
                                this.usuario.issuperuser=true;
                            }
                            await this.registrarUsuario();
                            this.limpiar();
                            this.mensaje= 'Profesor '+ this.profesor.nombresD+ ' '+this.profesor.apellidosD +' ha sido registrado con éxito';
                            this.typemsg='success';
                            this.dialogExit= true;
                        } catch (error) {
                            this.mensaje='Error al registrar profesor';
                            this.typemsg='error'
                            this.dialogError=true;
                            this.limpiar();
                        }
                        }
                    }
                }
            },
            limpiar() {
                this.profesor = {
                    codigoD: '',
                    dniProf: '',
                    nombresD: '',
                    apellidosD: '',
                    correo: '',
                    celular: '',
                    direccion: '',
                    idGenero: '',
                    idEstado: '',
                    idDistrito: ''
                };
                this.usuario={
                    id:'',
                    username:'',
                    password:'',
                    codigoD:'',
                }
                this.confirmpassword='';
                this.selectedGenero = '';
                this.selectedDistrito = '';
                this.selectedEstado = '';
                this.docenteSeleccionado=false;
            },
            async registrarUsuario(){
                    const response= await this.$axios.post('/usuario',this.usuario);
            }

        }
    }
</script>
<style src="../AdministracionUsuarios/adminU.css"></style>