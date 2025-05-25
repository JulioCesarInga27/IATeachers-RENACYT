<template>
    <v-container class="dash">

        <v-container class="cont-blancoizq">
            <v-container class="cont-info"> 
                <v-container class="cont-logo">
                    
                    <v-container class="logo">
                        <p class="textlogo">Acá iría la foto del usuario</p> 
                    </v-container>
                </v-container>

                <v-container>
                    <p class="usuario" id="">{{ nombresCompletos }}</p>
                </v-container>

                <v-container class="cont-cod">
                    Código:<p id="">{{ codigoBuscado }}</p>
                </v-container>

                <v-container class="cont-pag">
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

        <v-container class="cont-blancoder">
            <v-container class="cont-arriba">
                <v-container class="c-arr-izq">
                    <v-container class="arr-izq">
                        <v-container class="izq-izq">
                            <v-container class="a"></v-container>
                            <v-container class="b">
                                <p class="p8">Dashboard - Análisis</p>
                                <p class="p9">Indicadores</p>
                            </v-container>
                        </v-container>
                        <v-container class="izq-der">
                                    
                        </v-container>
                    </v-container>
                    <v-container class="aba-izq">
                        <v-container class="infoizq4">
                            <v-container class="izq-4"></v-container>
                            <v-container class="der-4">
                                <p class="p10">{{totalProfesor.total}}</p>
                                <p class="p11">Profesores Totales</p>
                            </v-container>
                        </v-container>
                        <v-container class="infoizq4">
                            <v-container class="izquierda-4">
                                <v-progress-circular
                                :model-value="femenino.porcentaje"
                                :rotate="360"
                                :size="110"
                                :width="14"
                                color="#DD0919">
                                <p class="porc">{{ femenino.porcentaje }}%</p>
                                </v-progress-circular>
                            </v-container>
                            <v-container class="derecha-4">
                                <p class="p12">Fuerza femenina</p>
                                <p class="p13">Cantidad de profesoras</p>
                                <p class="p14">{{ femenino.cantidad }}</p>
                            </v-container>
                        </v-container>
                        <v-container class="infoizq4">
                            <v-container class="izquierda-4">
                                <v-progress-circular
                                :model-value="masculino.porcentaje"
                                :rotate="360"
                                :size="110"
                                :width="14"
                                color="#002854">
                                <p class="porc">{{ masculino.porcentaje }}%</p>
                            </v-progress-circular>
                            </v-container>
                            <v-container class="derecha-4">
                                <p class="p12">Fuerza masculina</p>
                                <p class="p13">Cantidad de profesores</p>
                                <p class="p14">{{ masculino.cantidad }}</p>
                            </v-container>
                        </v-container>
                    </v-container>
                </v-container>
                <v-container class="c-arr-der">
                    <p class="p15">Exportar en:</p>
                    <v-btn class="btn-desc" @click="descargarPDF">
                        <v-icon left class="iconform"></v-icon>
                        PDF
                    </v-btn>
                </v-container>
            </v-container>

            <v-container class="cont-abajo">
                <v-container class="columna1">
                    <v-container class="caja1_1">
                        <v-container class="izqarriba">
                            <v-container class="caja1izq">
                                <p class="l1">Nivel de distribución</p>
                                <p class="l2">Estudiantes por Categoria</p>
                            </v-container>
                            <v-container class="caja1der">
                                <v-icon right></v-icon>
                            </v-container>
                        </v-container>
                        <v-container class="cont_1">
                            <v-container class="cont_2">
                                <v-container class="c2_1">
                                    <p  v-for="(categoria, index) in categorias" :key="index" :class="'l' + (8 + index)">{{categoria.cantidad}}</p>
                                </v-container>
                                <v-container class="c2_2">
                                    <p v-for="(categoria, index) in categorias" :key="index" class="l11">{{categoria.descripcionCE}}</p>
                                </v-container>
                            </v-container>
                            <v-container class="grafica3">
                                <v-progress-circular
                                :model-value="porcentajeA"
                                :rotate="180"
                                :size="127"
                                :width="16"
                                color="#DD0919"
                                class="gc1"
                                >
                                    <v-progress-circular
                                    :model-value="porcentajeB"
                                    :rotate="180"
                                    :size="89"
                                    :width="16"
                                    color="#7e7e7e"
                                    class="gc2"
                                    >
                                        <v-progress-circular
                                        :model-value="porcentajeC"
                                        :rotate="180"
                                        :size="51"
                                        :width="16"
                                        color="#002854"
                                        class="gc3"
                                        >
                                        </v-progress-circular>
                                    </v-progress-circular>
                                </v-progress-circular>
                            </v-container>
                        </v-container>
                    </v-container>
                    <v-container class="caja1_2">
                        <v-container class="izqarriba">
                            <v-container class="caja1izq">
                                <p class="l1">Cantidad de Estudiantes</p>
                                <p class="l2">Matriculados por Curso</p>
                            </v-container>
                            <v-container class="caja1der">
                                <v-icon right>mdi-check</v-icon>
                            </v-container>
                        </v-container>
                        <v-container class="cont_2">
                            <v-container class="espacio">
                                <p v-for="(curso, index) in cursos" :key="index" class="m1">{{ curso }}</p>
                            </v-container>
                            <v-container class="p0">
                                <v-container v-for="(detalle,index) in detalles" :key="index" class="barra2">
                                    <v-progress-linear
                                        v-model="detalle.porcentaje"
                                        color="#DD0919"
                                        height="10">
                                    </v-progress-linear>
                                    <p class="c2">{{detalle.cantidad}}</p>
                                </v-container>
                            </v-container>
                        </v-container>
                    </v-container>
                </v-container>
                <v-container class="columna2">
                    <v-container class="caja2">
                        <v-container class="izqarriba">
                            <v-container class="caja1izq">
                                <p class="l1">Distribución de profesores</p>
                                <p class="l2">Por lugar de residencia</p>
                            </v-container>
                            <v-container class="caja1der">
                                <v-icon right>mdi-check</v-icon>
                            </v-container>
                        </v-container>
                        <v-container class="caja1abajo">
                            <v-container class="casa1abiz">
                                <p v-for="(distrito, index) in distritosProfesor" :key="index" class="l3">{{ distrito.distrito_Nombre_Di }}</p>
                            </v-container>
                            <v-container class="casa1abder">
                                <p  v-for="(distrito, index) in distritosProfesor" :key="index" class="l4">{{ distrito.cantidad }}</p>
                            </v-container>
                        </v-container>
                        <v-container class="caja1abajo1">
                            <v-container class="abajo1izq">
                                <p class="l5">Prom Profesores</p>
                                <p class="l6">Que residen en Cono Norte</p>
                            </v-container>
                            <v-container class="abajo1der">
                                <p class="l7">{{profesorTD.cantidad}}</p>
                            </v-container>
                        </v-container>
                    </v-container>
                </v-container>
                <v-container class="columna3">
                    <v-container class="caja3">
                        <v-container class="izqarriba">
                            <v-container class="caja1izq">
                                <p class="l1">Cantidad de notas registradas</p>
                                <p class="l2">Por tipología</p>
                            </v-container>
                            <v-container class="caja1der">
                                <v-icon right>mdi-star-outline</v-icon>
                            </v-container>
                        </v-container>
                                        <v-container class="cont_a">
                                            <v-container v-for="(tipo, index) in tipos " :key="index" :class="'cont_2 y' + (1 + index)">
                                                <p>{{ tipo.cantidad}}</p>
                                            </v-container>
                                        </v-container>
                                        <v-container class="cont_z">
                                            <v-progress-linear
                                            v-model="porcentajeEP"
                                            color="#002854"
                                            height="80"
                                            class="vertical-progress5"
                                            ></v-progress-linear>
                                            <v-progress-linear
                                            v-model="porcentajeIF"
                                            color="#7e7e7e"
                                            height="80"
                                            class="vertical-progress6"
                                            ></v-progress-linear>
                                            <v-progress-linear
                                            v-model="porcentajePC"
                                            color="#DD0919"
                                            height="80"
                                            class="vertical-progress6"
                                            ></v-progress-linear>
                                        </v-container>
                                    <v-container class="caja1_abc">
                                        <p v-for="(tipo, index) in tipos " :key="index" :class="'gen' + (12 + index)+' x'">{{ tipo.Tipo }}</p>
                                    </v-container>
                    </v-container>
                </v-container>
            </v-container>

        </v-container>

    </v-container>

    <v-container class="d-raya-blanca"></v-container>
    <v-container class="d-raya-roja">
        <v-container class="d-pie">
        <p>© UCV - Docentes 2024</p>
        </v-container>
    </v-container>

</template>

    <script>
    import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';
    export default {
        name: 'DashAdmin',
        data(){
            return{
                nombresCompletos:'',
                codigoBuscado:'',
                profesorBuscado:'',
                detalles:[],
                categorias: [],
                profesorGeneros: [],
                distritosProfesor: [],
                totalProfesor:'',
                cursos:['C. Comunicativa','F. Programación','I. Sistemas','Matemática I','P. Lógico','Tutoría I'],
                profesorTD: '',
                porcentajeA:'',
                porcentajeB:'',
                porcentajeC:'',
                tipos:[],
                totalEstudiante:'',
                porcentajeEP:'',
                porcentajeIF:'',
                porcentajePC:'',
                logoImage:'',
            }
        },
        created(){
            this.buscarNombresDocente();
            this.capturarDatos();
        },
        computed: {
            femenino() {
            return this.profesorGeneros.find(p => p.idGenero === 'F') || { cantidad: 0, porcentaje: 0 };
            },
            masculino() {
            return this.profesorGeneros.find(p => p.idGenero === 'M') || { cantidad: 0, porcentaje: 0 };
            },
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
            buscarNombresDocente(){
                const codigoProfesor= localStorage.getItem('codigoD');
                this.codigoBuscado= codigoProfesor;
                this.$axios.get('/profesor/'+this.codigoBuscado).then((res)=>{this.profesorBuscado=res.data;this.nombresCompletos= this.profesorBuscado.nombresD + " "+this.profesorBuscado.apellidosD;}).catch((error)=>error)
            },
            async capturarDatos(){
                try {
                    const response = await this.$axios.get('/estudiante/categoria');
                    this.categorias = response.data;
                    this.obtenerPorcentaje();
                    
                    const responseGenero=  await this.$axios.get('/profesor/genero');
                    this.profesorGeneros=responseGenero.data;

                    const responseProfesor= await this.$axios.get('/profesor/total');
                    this.totalProfesor= responseProfesor.data;

                    const responseEstudiante= await this.$axios.get('/estudiante/total');
                    this.totalEstudiante= responseEstudiante.data;

                    const responseDistrito= await this.$axios.get('/profesor/distrito');
                    this.distritosProfesor= responseDistrito.data;

                    const responseProfeDistrito= await this.$axios.get('/profesor/distritosTotal');
                    this.profesorTD= responseProfeDistrito.data;

                    const responseDetalle= await this.$axios.get('/detallematricula/cantidadCurso');
                    this.detalles= responseDetalle.data;

                    const responseTipo= await this.$axios.get('/detallenota/tipoNota');
                    this.tipos= responseTipo.data;
                    this.calcularPorcentajeTipo();

                } catch (error) {
                    console.error('Error data:', error);
                }
            },
            obtenerPorcentaje(){
                this.porcentajeA = (this.categorias.find(categoria => categoria.descripcionCE === 'Alumnos Especiales') || { porcentaje: 0 }).porcentaje;
                this.porcentajeB = (this.categorias.find(categoria => categoria.descripcionCE  === 'Normal') || { porcentaje: 0 }).porcentaje;
                this.porcentajeC = (this.categorias.find(categoria => categoria.descripcionCE  === 'Primeros puestos') || { porcentaje: 0 }).porcentaje;
            },
            calcularPorcentajeTipo(){
                const cantidadEP= (this.tipos.find(tipo=> tipo.Tipo==='Exámenes')||{cantidad:0}).cantidad;
                const cantidadIF= (this.tipos.find(tipo=> tipo.Tipo==='Investigación Formativa')||{cantidad:0}).cantidad;
                const cantidadPC= (this.tipos.find(tipo=> tipo.Tipo==='Practica Calificada')||{cantidad:0}).cantidad;
                const totalNotas= parseInt(this.totalEstudiante.total,10) * 18;
                this.porcentajeEP= ((cantidadEP/totalNotas)*100).toFixed(2);
                this.porcentajeIF= ((cantidadIF/totalNotas)*100).toFixed(2);
                this.porcentajePC= ((cantidadPC/totalNotas)*100).toFixed(2);

                console.log(''+this.porcentajeEP+' '+this.porcentajeIF+' '+this.porcentajePC )
            },
            descargarPDF() {
                const filename = 'dashboardInformativo.pdf';
                const element = document.querySelector('.cont-blancoder');
                const options = {
                scale: 3,
                useCORS: true,
                logging: true,
                };

                const pdf = new jsPDF('l', 'px', [element.offsetWidth, element.offsetHeight]);
                pdf.setFont('helvetica', 'bold');
                    pdf.setFontSize(56);
                    pdf.text('REPORTE GENERAL', pdf.internal.pageSize.getWidth() / 2, 230, {
                    align: 'center'
                    });

                    pdf.setFont('helvetica', 'normal');
                    pdf.setFontSize(30);

                    const fechaHora = new Date().toLocaleString();
                    pdf.text(`Fecha y hora: ${fechaHora}`, pdf.internal.pageSize.getWidth() / 2, 270, {
                    align: 'center'
                    });

                    pdf.text(`Generado por: ${this.nombresCompletos}`, pdf.internal.pageSize.getWidth() / 2, 300, {
                    align: 'center'
                    });

                    pdf.text(`Código de docente - ${this.codigoBuscado}`, pdf.internal.pageSize.getWidth() / 2, 330, {
                    align: 'center'
                    });

                    pdf.addPage();

                    html2canvas(element, options).then((canvas) => {
                        const imgData = canvas.toDataURL('image/png', 1.0);

                        const ratio = pdf.internal.pageSize.getHeight() / canvas.height;
                        const imgWidth = canvas.width * ratio;
                        const imgHeight = pdf.internal.pageSize.getHeight();

                        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

                        pdf.save(filename);
                    });
                },
        }
        
    }  
</script>

<style src="../../views/DashboardAdmin/dashboard.css"></style>