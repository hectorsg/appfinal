import { AngularFirestore } from '@angular/fire/firestore';
import { AccComponent } from './../juegos/acc/acc.component';
import { TriviaService } from './../servicios/trivia.service';
import { HipodromoComponent } from './../modales/hipodromo/hipodromo.component';
import { EpisodioComponent } from './../modales/episodio/episodio.component';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonSlides, MenuController, ModalController, ActionSheetController, ToastController, IonInfiniteScroll, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service';
import { AccService } from '../servicios/acc.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEpisodioComponent } from '../admin/add-episodio/add-episodio.component';
import sortBy from 'sort-by';
import { GacetaComponent } from '../modales/gaceta/gaceta.component';
import { LoginemailComponent } from '../modales/loginemail/loginemail.component';
import { HipodromoadminComponent } from '../admin/hipodromoadmin/hipodromoadmin.component';
import { EncuestasComponent } from '../modales/encuestas/encuestas.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PronosticoComponent } from '../modales/pronostico/pronostico.component';
import { PronosticoadminComponent } from '../admin/pronosticoadmin/pronosticoadmin.component';
import { StoriesadminComponent } from '../admin/storiesadmin/storiesadmin.component';
import { PronosticosuperComponent } from '../admin/pronosticosuper/pronosticosuper.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { FullscreenComponent } from '../modales/fullscreen/fullscreen.component';
import { PushnotficacionsService } from '../servicios/pushnotficacions.service';
import { FundacionComponent } from '../modales/fundacion/fundacion.component';
import { AtreveanarrarComponent } from '../modales/atreveanarrar/atreveanarrar.component';

declare var videojs : any ;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('contenido', { static: false}) contenidoss: IonSlides;
  @ViewChild('programacion', { static: false}) progra: IonSlides;
  @ViewChild('quic', {static:false}) quick : IonSlides;
  @ViewChild('cintillo',{static:false}) cint : IonSlides;


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  

  public audios : any;
  public audio: any;
  public login : boolean;
  public start:boolean;
  public videoMenuOpen:string;
  public EnVivoActive:string;
  public EpisodiosActive:string;
  public HipodromosActive:string;
  public JuegosActive:string;
  public EnCentro:string;
  public ToSearch:boolean;
  public ToSearchG:boolean;
  public onVivoBoton:string;
  public transpDiv:string;
  public despuesActive:string;
  public destacadoActive:string;
  public progamaActive:string;
  public loginEmail : boolean;
  public gacetaActive:string;
  public episodiosAll : any;
  public turfIcon : string;
  public dismissBotonDiauno:string;
  public dissmissBotonDiaDos :  string; 
  public dissmissBotonDiaTres :string;
  public botonScale : string;
  public hipodromosAll:any;
  public PaisName:any;
  public hipodromosTitle:string;
  public EpisodioLongDate:string;
  public FullMonth:string;
  public day:string;
  public episodioTitle:string;
  public textoBuscar='';
  public catName:any;
  public buscarEpisodio = '';
  public textoGaceta = '';
  public ToSearchE:boolean;
  public gacetaIcon:string;
  public userAny:any;
  public episodiosDestacado:any;
  public episodiosByDay:any;
  public MisEpisodiosMasTarde:any;
  public salaAllArray:any;
  public salasDisponibles :any;

  //necesario para video js
  player: any ;
  playerMin:any;

  public howManyMaxMin:string;
  //variables del ionrange
  public valueRuedita :number;
  public step : number;
  public min : number;
  public max:number;

  public howMuchBack:string;

  public otherTime:number;
  public registro : boolean;
  public isPlayin : string;

  public dateRuedita:string;
  public myCurrentHour:string;
  public lastfive:string;
  public month:string;
  public lastten:string;
  public Laterfive:string;
  public LaterTen:string;
  public VivoConfig:string;
  public dataSetup:string;
  public gacetaTitle:string;
  public gacetaHipodromos:any;
  public splashScreen:string;
  public episodiosPropios : any;
  public ProgramaName : any;
  public episodioDestacadoOtros : any;
  public encuestas:any;
  public accActive:any;
  public accConfig : any;
  public encuestaActive : any;
  public pronosticos : any;
  public pronosticosHoy: any;
  public pronosticosOtros : any;
  public soporte : boolean;
  public Rnombre : string;
  public Rapellido : string;
  public Rcorreo : string;
  public Rpassword : string;
  public photoAlt: string;
  public newsArray : any;
  public newCont : string;
  public newData : any;
  public pronostiHoy : any;
  public pronostiViejos : any;
  public viewheight:string;
  public streamConfig :any;
  public streamCount :number;
  public inputdePrueba : string
  //Fix ipads
  public logoT : string;
  public showBotFix : string;
  public liveFix : string;
  public botonFix : string;
  public avatarFix : string;
  public redesDatas : any;
  public slice: number = 5; 
  public videoProgress : string;

  uploadPercent : Observable<number>;
  urlImage : Observable<number>;

  public aHourComp : number;
  public indexOfDestacado : number = 4
  public indexOfPronostico : number = 3
  public indexOfEpisodio : number = 8
  public indexOfHipodromo : number = 8
  public indexOfGaceta : number = 8
  public url:string;
  public hipodromosAllRef : any;
  public myTalent : any;
  public whereIs : string;
  public toPause : string;
  public estaEnPlay : boolean;
  public encuestaConfig : any;
  public atreveteConfig : any;
  public fundacionConfigu : any;
  public qsConfig : any;
  public rsConfigu : any;
  public personalData : any;
  public talentsBios : any;
  episodios={
    initialSlide: 0,
    slidesPerView: 6,
    speed: 400,
    direction:'vertical'
  }
  sliderprog={
    initialSlide:0,
    speed:400
  }
  contenidos={
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  }

  miniInfo={
    initialSlide:0,
    slidesPerView:1,
    speed:400,
    autoplay:{
      delay:4000
    }
  }

  constructor(public modal : ModalController, public menu:MenuController, public app : TriviaService,
              public action : ActionSheetController, public afAuth : AngularFireAuth, public db :AngularFirestore, 
              public toast:ToastController, public auth : AuthService, public appSer : AccService,
              public sanitaizer : DomSanitizer,private inBro : InAppBrowser, public storage : AngularFireStorage,
              private videoEditor: VideoEditor, public pussh : PushnotficacionsService, public platform : Platform
              ) {

               
                
    
    
  }

  quesueltaInput(){
    
    this.videoEditor.transcodeVideo({
      fileUri: this.inputdePrueba,
      outputFileName: 'output.mp4',
      outputFileType: this.videoEditor.OutputFileType.MPEG4,
      progress: (info: number) => {
        //This gets called indefinitely ... with info = 0

        this.videoProgress = 'Progreso: '+ info
      }
    })
    .then((fileUri: string) =>  alert('video transcode success' + fileUri) )
    .catch((error: any) => alert('video transcode error ' + error) );

  }

  pruebaDeEditor(){
    this.videoEditor.transcodeVideo({
      fileUri: '/path/to/input.mov',
      outputFileName: 'output.mp4',
      outputFileType: this.videoEditor.OutputFileType.MPEG4
    })
    .then((fileUri: string) => console.log('video transcode success', fileUri))
    .catch((error: any) => console.log('video transcode error', error));
  }


  doInfinite(e){



    setTimeout(() => {
      this.indexOfDestacado += 4;
      e.target.complete()
      

      // App logic to determine if all data is loaded

      if(this.episodioDestacadoOtros.length <= this.indexOfDestacado){
        e.target.disabled = true;
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
    
  }


  doInfinitePronostico(){



    setTimeout(() => {
      

      // App logic to determine if all data is loaded

      if(this.pronostiViejos.length <= this.indexOfPronostico){
        
      }else{
        this.indexOfPronostico += 3;
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
    
  }
  doInfiniteEpisodio(){
    
    setTimeout(() => {
      

      // App logic to determine if all data is loaded

      if(this.episodiosPropios.length <= this.indexOfEpisodio){
        
      }else{
        this.indexOfEpisodio += 3;  
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
  }


  doInfiniteHipodromo(){
    
    setTimeout(() => {
    

      // App logic to determine if all data is loaded

      if(this.hipodromosAllRef.length <= this.indexOfHipodromo){
   
      }else{
        this.indexOfHipodromo += 3;   
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
  }

  doInfiniteGaceta(){
    
    setTimeout(() => {  

      // App logic to determine if all data is loaded

      if(this.hipodromosAllRef.length <= this.indexOfGaceta){
        
      }else{
        
      this.indexOfGaceta += 3;
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
  }

  pruebapruebaprueba(){

    setTimeout(() => {
     
      

      // App logic to determine if all data is loaded

      if(this.episodioDestacadoOtros.length <= this.indexOfDestacado){
       
      }else{
        this.indexOfDestacado += 3;
      }
      // and disable the infinite scroll
     
    }, 750);
   
  
  }

  ionViewDidEnter(){
    this.newCont = 'bottom:-41%;'
    this.toPause = 'opacity:0;'
    let view = document.getElementById("cont")
     let viewh :number = view.offsetHeight
     this.viewheight = 'height:' +viewh+'px;'

     if(viewh >= 1024){
       this.logoT = 'width:12%;'
       this.liveFix = 'width:10%;'
       this.showBotFix = 'font-size:18px;'
       this.botonFix = 'font-size:14px;'
       this.avatarFix = 'width:85%;'
     }

     
     
    this.soporte = false
    this.login = false
    this.registro = false
    this.loginEmail = false
    this.photoAlt = null

    this.howManyMaxMin = '10 seg'
    this.step = 1
    this.min = -10
    this.max = 10
    this.valueRuedita = 0

    this.quick.update()

    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;
          if(this.userAny){

            this.checkActive()
          

            this.app.getPopStream(this.userAny.uid).subscribe(item =>{
              this.streamConfig = item

              if(this.streamConfig.length> 0){
                this.streamCount = this.streamConfig.length
                this.verplayerMini()

              }else{
                this.streamCount = this.streamConfig.length
              }

              
              
    
          
            })

           


          }
          
        })
       }
      }

      


  )


  this.app.getaccConfiguracion().subscribe(item => {

    let fraarr : any = item

   let accConf= fraarr.filter(item => item.type === 'acc')
   let encuestas = fraarr.filter(item => item.type === 'encuestas')
   let atreveteConfig = fraarr.filter(item => item.type === 'Atrevete a Narrar')
   let fundacionConfi = fraarr.filter(item => item.type === 'Fundacion')
   let quienesSom = fraarr.filter(item => item.type === 'QS')

   let redesSo = fraarr.filter(item => item.type === 'RS')



   this.accConfig = accConf[Math.floor((Math.random()*accConf.length))]

   this.encuestaConfig = encuestas[Math.floor((Math.random()*encuestas.length))]

   this.atreveteConfig = atreveteConfig[Math.floor((Math.random()*atreveteConfig.length))]

   this.fundacionConfigu = fundacionConfi[Math.floor((Math.random()*fundacionConfi.length))]

   this.qsConfig = quienesSom[Math.floor((Math.random()*quienesSom.length))]

   
   this.rsConfigu = redesSo[Math.floor((Math.random()*redesSo.length))]

    
  })
  this.db.collection('entretenimientoConfig').doc('acc').valueChanges().subscribe(item =>{
    this.accActive = item
  })
  this.db.collection('entretenimientoConfig').doc('encuesta').valueChanges().subscribe(item =>{
    this.encuestaActive = item
  })
  this.appSer.salaALL().subscribe(item =>{
    this.salaAllArray = item
    this.salasDisponibles = this.salaAllArray.filter(item => item.isPublicRoom === true  && item.partidaDisponible === true);
  })

    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    let year = d.getFullYear()
    let today = d.getDay();

    let myHour = d.getHours()

    this.aHourComp = myHour

    this.knowMyDates()

  



    switch(today) {
      case 0:
        this.day = "Dom";
        break;
      case 1:
        this.day = "Lun";
        break;
      case 2:
        this.day = "Mar";
        break;
      case 3:
        this.day = "Mie";
        break;
      case 4:
        this.day = "Jue";
        break;
      case 5:
        this.day = "Vie";
        break;
      case 6:
        this.day = "Sab";
    }

    

    switch(n) {
      case 0:
        this.FullMonth = "Enero";
        break;
      case 1:
        this.FullMonth = "Febrero";
        break;
      case 2:
        this.FullMonth = "Marzo";
        break;
      case 3:
        this.FullMonth = "Abril";
        break;
      case 4:
        this.FullMonth = "Mayo";
        break;
      case 5:
        this.FullMonth = "Junio";
        break;
      case 6:
        this.FullMonth = "Julio";
        break;
      case 7:
          this.FullMonth = "Agosto";
          break; 
      case 8:
          this.FullMonth = "Septiembre";
          break; 
          
      case 9:
          this.FullMonth = "Octubre";
          break; 
      case 10:
          this.FullMonth = "Noviembre";
          break; 
          
      case 11:
          this.FullMonth = "Diciembre";
          break;
    }
    switch(n) {
      case 0:
        this.month = "January";
        
        break;
      case 1:
        this.month = "February";
        
        break;
      case 2:
        this.month = "March";
        
        break;
      case 3:
        this.month = "April";
        
        break;
      case 4:
        this.month = "May";
        
        break;
      case 5:
        this.month = "June";
        
        break;
      case 6:
        this.month = "July";
        
        break;
        case 7:
        this.month = "August";
        
        break;
        case 8:
        this.month = "September";
        
        break;
        case 9:
        this.month = "October";
        
        break;
        case 10:
        this.month = "November";
        
        break;
        case 11:
        this.month = "December";
        
        break;
    } 




     this.EpisodioLongDate = day.toString() + ' de ' + this.FullMonth + ' de ' + year.toString();

     this.dateRuedita = day.toString() + ' de ' + this.FullMonth
    this.contenidoss.update();
    this.progra.update();
    this.progra.lockSwipes(true)
    this.contenidoss.lockSwipes(true)
    this.videoMenuOpen = 'config-buttons'
    this.EnVivoActive = 'active';
    this.destacadoActive='color:white;background: #000000d6;border-radius:10px;'
    this.episodioTitle = 'Episodios Recientes'
    this.hipodromosTitle = 'Todos los Hipodromos' 
    this.gacetaTitle = 'Todos los Hipodromos'
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    

    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      //Aqui va el filtro de Episodios Destacado
      let firstFilter =  this.episodiosAll.filter(item => item.destacado === true);
      this.episodioDestacadoOtros = firstFilter.filter(item => item.longDate !== this.EpisodioLongDate)
      this.episodiosDestacado = firstFilter.filter(item => item.longDate === this.EpisodioLongDate)
      this.episodiosDestacado.sort(sortBy('horaEnd'))

      if(day === 1){

      }else{

        this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.longDate.includes(this.FullMonth))
      }


      this.episodioDestacadoOtros.sort(sortBy('-fecha'))


      this.episodiosPropios = this.episodiosAll.filter(item => item.propio === true);
      this.episodiosPropios = this.episodiosPropios.filter(item => item.fecha)
      this.episodiosPropios.sort(sortBy('-fecha'))
      //Aqui va el filtro de programacion y dias
      let secondFilter = this.episodiosAll.filter(item => item.semanaActiva === true);
      this.episodiosByDay = secondFilter.filter(item => item.day === this.day) 
      this.episodiosByDay.sort(sortBy('horaEnd'));
      
   // this.episodiosAll = this.episodiosAll.filter(item=> item.semanaActiva === true)


      this.closeAuto()
    })

   

    this.app.getNews().subscribe(item =>{
      this.newsArray = item
      this.newsArray = this.newsArray.filter(item => item.date === this.EpisodioLongDate)
      this.newsArray.sort(sortBy('hora'))

    })

    this.app.getPronostico().subscribe(item=>{
      let ShortDate = day.toString() + ' de ' + this.FullMonth 
      let pronosticosArray:any = item
      pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
      this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
      this.pronostiHoy.sort(sortBy('-hour'))

      this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)

      this.pronostiViejos.sort(sortBy('-fecha'))
    })

    this.app.getTalentos().subscribe(item => { 
    this.myTalent = item
    })



    


  
    this.app.getHipodromo().subscribe(item =>{
      this.hipodromosAll = item

      this.hipodromosAll.sort(sortBy('pais'))

      this.hipodromosAllRef = item

      this.gacetaHipodromos = this.hipodromosAll

    })

    this.app.getRedesData().subscribe(item => {
      this.redesDatas = item
    })

    this.app.getPaisName().subscribe(item =>{
      this.PaisName = item
      this.PaisName.sort(sortBy('name'))
      
    })

    this.app.getProgramaName().subscribe(item =>{
      this.ProgramaName = item
      
    })

    this.app.getEncuesta().subscribe(item =>{
      this.encuestas = item
    })

    this.app.getCatEpisodioName().subscribe(item =>{
      this.catName = item
    })
    this.player = videojs(document.getElementById('video-player'))
    this.player.poster('../../../assets/other/poster1.jpg')
    
    this.app.getEnVivoConfig().subscribe(item =>{
     let config:any  = item

       this.VivoConfig = config[0].tvLink 

       let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.VivoConfig)

       const web:string = link.changingThisBreaksApplicationSecurity
      this.player.src({
        type: 'video/youtube',
        src: web,
      });

      
    this.player.play()
    this.estaEnPlay = true

      
    })




    


  

   

  }

  async listenNotiPush(msg){
    const toastPush = await this.toast.create({
      message:msg.body,
      duration:3000
    });
    toastPush.present();
  }

  pauseStre(){
    this.estaEnPlay = false
    this.player.pause()
  }

  playStrea(){
    this.estaEnPlay = true
    this.player.play()
  }

  async playPuaseAction(){   
    if(this.toPause === 'opacity:0;'){

      this.toPause = 'opacity:1;'
    }else{
      
    this.toPause = 'opacity:0;'
    }

  }

  onUpload(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `perfilPhotos/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges(); 
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();


 
    
   }

   checkActive(){
    this.db.collection('activos').doc(this.userAny.uid).valueChanges().subscribe(item => {
      let res : any = item

      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


      let fechaOnString : string = day.toString() + ' de ' + this.FullMonth
      if(res){

        if(res.isActive === false){
          this.db.collection('activos').doc(this.userAny.uid).update({
            isActive : true,
            fecha: fechaOnString ,
            hora: hor+':'+minutes
          })
        }

      }else{
      
       this.db.collection('activos').doc(this.userAny.uid).set({
         uid : this.userAny.uid,
         nombre : this.userAny.displayName,
         foto: this.userAny.photoURL,
         isActive : true,
         estaEn: 'En Vivo',
         fecha: fechaOnString ,
         hora: hor+':'+minutes
       })
      }
    })
   }


   ngOnDestroy(){
    if(this.userAny){
      this.db.collection('activos').doc(this.userAny.uid).update({
        isActive: false
      })
    }
  }

   ActualizarFoto(){
    this.db.collection('users').doc(this.userAny.uid).update({
      photoURL: this.url
    }).then(()=>{
      this.url = null
      this.uploadPercent = null
    })
   }

  openNews(item){
    this.newCont = "bottom:0;"
    this.newData= item
  }
  async  dismissNews(){
    this.newCont = "bottom:-41%;"
    await this.sleep(2000)
    this.newData = null
  }

  async verplayerMini(){

    await this.sleep(1000)

    this.cint.update()
    
    this.playerMin = videojs(document.getElementById('miniplay'))
    this.playerMin.poster('../../../assets/other/poster1.jpg')


       let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.streamConfig[0].videoUrl)

       const web:string = link.changingThisBreaksApplicationSecurity
      this.playerMin.src({
        type: 'video/youtube',
        src: web,
      });

      
    this.playerMin.play()
  }
  volverLogin(){
    this.login = false  
    this.loginEmail = false
    this.registro = false
  }

  dismissVideoMini(){
    this.db.collection('users').doc(this.userAny.uid).collection('config').doc('floatVideo').delete().then(()=>{
      this.playerMin.dispose()
      this.streamCount = 0
    })
  }

  goLiveMini(){
    this.playerMin.currentTime(this.playerMin.duration())
    this.playerMin.play()
  }

  async askDismissVidMini(){
    const actionSheet = await this.action.create({
      header: 'Espera un momento',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Eliminar Transmision Secundaria',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.dismissVideoMini()
          }
        },{
        text: 'Cancelar',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }


  createProfilePhoto(){
    if(this.photoAlt === null){
      let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl('https://ui-avatars.com/api/?size=128&background=random&name='+this.Rnombre+'+'+this.Rapellido)

      this.photoAlt = link.changingThisBreaksApplicationSecurity
    }
  }

  RegisterNewUserEmail(){
    let displayName : string = this.Rnombre+' '+this.Rapellido
    this.auth.registerUsuario(displayName, this.photoAlt, this.Rcorreo, this.Rpassword).then(()=>{
      
      this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
            this.userAny = item;
            this.volverLogin()
            if(this.userAny){
              this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
                this.MisEpisodiosMasTarde = item
                
              })
            }
            
          })
         }
        })
    })
  }

  soporteAction(){
    this.menu.close('config')
    this.soporte = false
  }

 
  dismissSplash(){
    this.splashScreen = 'top:100%;'
  }

  pronosticoAdmin(){
    this.estaEnPlay = false
    this.player.pause()
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: PronosticoadminComponent ,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())

  }


  openEnVivoFullScreen(){
    this.estaEnPlay = false
    this.player.pause()
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: FullscreenComponent ,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())

  }

  myStories(){
    this.estaEnPlay = false
    this.player.pause()
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: StoriesadminComponent ,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())
  }

  knowMyDates(){

    var timer = setInterval(()=>{

      let how = this.howManyMaxMin


      if(how === '10 seg'){
        this.myCurrentHour = null
        this.lastfive = null
        this.lastten = null
        this.Laterfive = null
        this.LaterTen = null
      //Current Hour
      let d = new Date();
      let currentHour = d.getHours();
      let currentMinutes = d.getMinutes();
      let currentSeconds = d.getSeconds();
      if(currentMinutes < 10){
        if(currentSeconds<10){
          
        this.myCurrentHour = currentHour+ ':0'+currentMinutes+':0'+currentSeconds
        }else{
          this.myCurrentHour = currentHour+ ':0'+currentMinutes+':'+currentSeconds

        }
      }else{
        if(currentSeconds <10){
          this.myCurrentHour = currentHour+ ':'+currentMinutes+':0'+currentSeconds
        }else{
          
        this.myCurrentHour = currentHour+ ':'+currentMinutes+':'+currentSeconds
      }}

      //past 5 Hour
      
      let h = new Date();
      h.setSeconds(h.getSeconds()-5);
      let pastFiveHours = h.getHours();
      let pastFiveMinutes = h.getMinutes();
      let pastFiveSeconds = h.getSeconds();

    

      if(pastFiveMinutes < 10){
        if(pastFiveSeconds < 10){
          
        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes+':0'+pastFiveSeconds
        }else{
          
        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes+':'+pastFiveSeconds
        }
      }else{
        if(pastFiveSeconds < 10){
          
        this.lastfive = pastFiveHours + ':'+pastFiveMinutes+':0'+pastFiveSeconds
        }else{
          
        this.lastfive = pastFiveHours + ':'+pastFiveMinutes+':'+pastFiveSeconds
        }
      }

      //past 10 hour

      let t = new Date();
      t.setSeconds(t.getSeconds()-10)
      let pastTenHours = t.getHours();
      let pastTenMinutes = t.getMinutes();
      let pastTenSeconds = t.getSeconds();
      if(pastTenMinutes < 10){
        if(pastTenSeconds < 10){
        this.lastten = pastTenHours + ':0'+pastTenMinutes+':0'+pastTenSeconds
        }else{
          
        this.lastten = pastTenHours + ':0'+pastTenMinutes+':'+pastTenSeconds
        }
        }else{
          if(pastTenSeconds < 10){
            this.lastten = pastTenHours + ':'+pastTenMinutes+':0'+pastTenSeconds
          }else{
            this.lastten = pastTenHours + ':'+pastTenMinutes+':'+pastTenSeconds
          }
          

        }

      // later 5 hour
      let L = new Date();
      L.setSeconds(L.getSeconds()+5)
      let LateFiveHours = L.getHours();
      let LateFiveMinutes = L.getMinutes();
      let LateFiveSeconds = L.getSeconds();
      if(LateFiveMinutes < 10){
        if(LateFiveSeconds<10){
          
        this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes+':0'+LateFiveSeconds
        }else{
          
        this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes+':'+LateFiveSeconds
        }
        
        }else{
          if(LateFiveSeconds<10){
            
        this.Laterfive = LateFiveHours + ':'+LateFiveMinutes+':0'+LateFiveSeconds
          }else{
            
        this.Laterfive = LateFiveHours + ':'+LateFiveMinutes+':'+LateFiveSeconds
          }
          
        }

       // later 10 hour
       let T = new Date()
       T.setSeconds(T.getSeconds()+10)
       let LateTenHours = T.getHours();
       let LateTenMinutes = T.getMinutes();
       let LateTenSeconds = T.getSeconds();
       if(LateTenMinutes < 10){
         if(LateTenSeconds<10){

          this.LaterTen = LateTenHours + ':0'+LateTenMinutes+':0'+LateTenSeconds
         }else{
           
          this.LaterTen = LateTenHours + ':0'+LateTenMinutes+':'+LateTenSeconds
         }
        
       }else{
         if(LateTenSeconds<10){
           
          this.LaterTen = LateTenHours + ':'+LateTenMinutes+':0'+LateTenSeconds
         }else{
           
          this.LaterTen = LateTenHours + ':'+LateTenMinutes+':'+LateTenSeconds
         }
         
       }

      }
      if(how === '10 min'){
        this.myCurrentHour = null
        this.lastfive = null
        this.lastten = null
        this.Laterfive = null
        this.LaterTen = null
      //Current Hour
      let d = new Date();
      let currentHour = d.getHours();
      let currentMinutes = d.getMinutes();
      let currentSeconds = d.getSeconds();
      if(currentMinutes < 10){
        this.myCurrentHour = currentHour+ ':0'+currentMinutes
      }else{
        this.myCurrentHour = currentHour+ ':'+currentMinutes
      }

      //past 5 Hour
      
      let h = new Date();
      h.setMinutes(h.getMinutes()-5)
      let pastFiveHours = h.getHours();
      let pastFiveMinutes = h.getMinutes();
      let pastFiveSeconds = h.getSeconds();

    
      if(pastFiveMinutes < 10){

        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes
      }else{

        this.lastfive = pastFiveHours + ':'+pastFiveMinutes
      }


      //past 10 hour

      let t = new Date();
      t.setMinutes(t.getMinutes()-10)
      let pastTenHours = t.getHours();
      let pastTenMinutes = t.getMinutes();
      let pastTenSeconds = t.getSeconds();
      if(pastTenMinutes < 10){
        
        this.lastten = pastTenHours + ':0'+pastTenMinutes
        }else{
          
        this.lastten = pastTenHours + ':'+pastTenMinutes
        }

      // later 5 hour
      let L = new Date();
      L.setMinutes(L.getMinutes()+5)
      let LateFiveHours = L.getHours();
      let LateFiveMinutes = L.getMinutes();
      let LateFiveSeconds = L.getSeconds();
      if(LateFiveMinutes < 0){
        
        this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes
        }else{
          
        this.Laterfive = LateFiveHours + ':'+LateFiveMinutes
        }

       // later 10 hour
       let T = new Date()
       T.setMinutes(T.getMinutes()+10)
       let LateTenHours = T.getHours();
       let LateTenMinutes = T.getMinutes();
       let LateTenSeconds = T.getSeconds();
       if(LateTenMinutes < 10){
        
        this.LaterTen = LateTenHours + ':0'+LateTenMinutes
       }else{
         this.LaterTen = LateTenHours + ':'+LateTenMinutes
       }

      }
      if(how === '10 hr'){
        this.myCurrentHour = null
        this.lastfive = null
        this.lastten = null
        this.Laterfive = null
        this.LaterTen = null
      //Current Hour
      let d = new Date();
      let currentHour = d.getHours();
      let currentMinutes = d.getMinutes();
      let currentSeconds = d.getSeconds();

      if(currentMinutes < 10){
        this.myCurrentHour = currentHour+ ':0'+currentMinutes
      }else{
        this.myCurrentHour = currentHour+ ':'+currentMinutes
      }
  
    

      //past 5 Hour
      let h = new Date();
      h.setHours(h.getHours()-5)
      let pastFiveHours = h.getHours();
      let pastFiveMinutes = h.getMinutes();
      let pastFiveSeconds = h.getSeconds();

    
      if(pastFiveMinutes < 10){

        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes
      }else{

        this.lastfive = pastFiveHours + ':'+pastFiveMinutes
      }


      //past 10 hour
      let t = new Date();
      t.setHours(t.getHours()-10)
      let pastTenHours = t.getHours();
      let pastTenMinutes = t.getMinutes();
      let pastTenSeconds = t.getSeconds();
      if(pastTenMinutes < 10){
        
      this.lastten = pastTenHours + ':0'+pastTenMinutes
      }else{
        
      this.lastten = pastTenHours + ':'+pastTenMinutes
      }

      // later 5 hour
      let L = new Date();
      L.setHours(L.getHours()+5)
      let LateFiveHours = L.getHours();
      let LateFiveMinutes = L.getMinutes();
      let LateFiveSeconds = L.getSeconds();

      if(LateFiveMinutes < 0){
        
      this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes
      }else{
        
      this.Laterfive = LateFiveHours + ':'+LateFiveMinutes
      }


       // later 10 hour
       let T = new Date()
       T.setHours(T.getHours()+10)
       let LateTenHours = T.getHours();
       let LateTenMinutes = T.getMinutes();
       let LateTenSeconds = T.getSeconds();
      if(LateTenMinutes < 10){
        
       this.LaterTen = LateTenHours + ':0'+LateTenMinutes
      }else{
        this.LaterTen = LateTenHours + ':'+LateTenMinutes
      }

      }

    
    },1000)
  
  }


  openAddEpisodio(){
    this.estaEnPlay = false
    this.player.pause()
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: AddEpisodioComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())
  }

  openAdminPronostico(){
    this.estaEnPlay = false
    this.player.pause()
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: PronosticosuperComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())
  }

  async closeAuto(){
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    await sleep(4000)
    
    this.dismissSplash()
  }

  emailLogin(email, password){    
    this.auth.loginUser(email.value, password.value).then(()=>{
      
      this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
            this.userAny = item;
            this.volverLogin()
            if(this.userAny){
              this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
                this.MisEpisodiosMasTarde = item
                
              })
            }
            
          })
         }
        })
        
    })
  }

  async errorLoign(item) {
    const toast = await this.toast.create({
      message: 'Disculpe, El usuario '+item+' no existe en nuestra plataforma, por favor registrese.',
      duration: 6000,
      color:"danger"
    });
    toast.present();
  }

  openLinkBrowser(){
    this.estaEnPlay = false
    this.player.pause()
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://grtv.us/quienes-somos/")

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_self')
  }
  openLinkContacto(){
    this.estaEnPlay = false
    this.player.pause()
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://grtv.us/contacto/")

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_self')
  }

  openEncuesta(){

    console.log('estas en la encuesta')
    this.modal.create({
      component: EncuestasComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())
  }

  openFundacion(){

    this.estaEnPlay = false
    this.player.pause()
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: FundacionComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())
  }

  openAdminHipodromo(){
    this.estaEnPlay = false
    this.player.pause()
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: HipodromoadminComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present().then(i=>{
      this.player.pause()
    }))
  }

 
async  goToLive(){
  await  this.player.currentTime(this.player.duration()-1)
   await this.player.play()
    this.howMuchBack = null
    this.valueRuedita = 0
    
  }
 async  puntito(e){
    this.valueRuedita = e.detail.value
    this.otherTime =e.detail.value

    
  
    if(e.detail.value < 0){
      if(this.valueRuedita === -1){
        
        
        this.intervaloTrigger()
        
      }
      if(this.valueRuedita === -60){
        this.intervaloTrigger()
      }
      if(this.valueRuedita  === -3600){
        this.intervaloTrigger()
      }

      if(this.otherTime >= -59){
        this.howMuchBack= this.otherTime + ' seg'
      }
      if(this.otherTime <= -60 && this.otherTime >= -3599 ){
        this.howMuchBack = Math.floor(this.otherTime % 3600 / 60) + ' min'
      }
      if(this.otherTime <= -3600){
        this.howMuchBack = Math.floor(this.otherTime / 3600)+ ' hr'
      }


      





      let back = Math.abs(e.detail.value) 
      let time =  this.player.currentTime()
    await this.player.currentTime(this.player.currentTime() - back)
     await this.player.play()
    }
    
    
  }


  intervaloTrigger(){

    
    var timer = setInterval(() => {

      this.player.on('play', () => {
        this.isPlayin = 'true'
       });
       this.player.on("waiting", function(){ 
         this.isPlayin = 'false'
       });
       this.player.on("pause", function(){ 
        this.isPlayin = 'false'
      });

      if(this.isPlayin === 'false'){
      }else{
        if(this.otherTime === 0){

          clearInterval(timer)
          this.valueRuedita = 0
          this.howMuchBack = null
        }else{
      
  
          
            this.otherTime += 1
            if(this.otherTime >= -59){
              this.howMuchBack= this.otherTime + ' seg'
            }
            if(this.otherTime <= -60 && this.otherTime >= -3599 ){
              this.howMuchBack = Math.floor(this.otherTime % 3600 / 60) + ' min'
            }
            if(this.otherTime <= -3600){
              this.howMuchBack = Math.floor(this.otherTime / 3600)+ ' hr'
            }
            
  
          
      
        }
      }
    

       
        
      
  }, 1000);
  }


  addTimeTrim(){
    if(this.howManyMaxMin === '10 seg'){
      this.howManyMaxMin = '10 min'
      this.step = 60
    this.min = -600
    this.max = 600
    }else{
      this.howManyMaxMin = '10 hr'
      this.step = 3600
    this.min = -36000
    this.max = 36000
    }
    
  }
  restTimeTrim(){
    if(this.howManyMaxMin === '10 hr'){
      this.howManyMaxMin = '10 min'
      this.step = 60
    this.min = -600
    this.max = 600
    }else{
      this.howManyMaxMin = '10 seg'
      this.step = 1
    this.min = -10
    this.max = 10
    }
  }

  changeDayEpisodio(da){
    this.day = da
    let secondFilter = this.episodiosAll.filter(item => item.semanaActiva === true);
    this.episodiosByDay = secondFilter.filter(item => item.day === this.day)
     this.episodiosByDay.sort(sortBy('horaEnd')) 
  }
//Aqui van los botones de navegacion
  onEnVivo(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(0)
    
    this.goToLive()
    this.player.play()
    this.EpisodiosActive= null;
    this.HipodromosActive=null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EnCentro='right:5%;';
    this.EnVivoActive = 'active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)

    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'En vivo',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
    
  }

  onEpisodios(){
    this.contenidoss.lockSwipes(false);
    this.contenidoss.slideTo(1)
    this.estaEnPlay = false
    this.player.pause()
    this.HipodromosActive=null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EpisodiosActive= 'active';
    this.EnCentro='right: 15%;'
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)


    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Episodios',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    



    
  }


 
  onHipodromos(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(2)
    this.estaEnPlay = false
    this.player.pause()
    this.EpisodiosActive= null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EnCentro='right:20%;';
    this.HipodromosActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 1;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)
    this.dismissNews()


    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Hipodromos',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
  }
  onGaceTurf(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(3)
    this.estaEnPlay = false
    this.player.pause()
    this.EpisodiosActive= null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.EnCentro='right:20%;';
    this.HipodromosActive=null;
    this.gacetaActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:1;filter: invert(0);'
    this.contenidoss.lockSwipes(true)

    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Gaceta Turf',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
  }
  onJuegos(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(4);
    this.estaEnPlay = false
    this.player.pause()
    this.EpisodiosActive= null;
    this.HipodromosActive=null;
    this.EnVivoActive = null;
    this.gacetaActive=null;
    this.EnCentro='right:25%;';
    this.JuegosActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)

    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Comunidad',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
  }

  //Aqui van los botones del en vivo
  onDestacado(){
    this.progra.lockSwipes(false)
    this.progra.slideTo(0)
    this.onVivoBoton = 'left:3%;'
    this.transpDiv='left: 10%;'
    this.destacadoActive='color:white;background: #000000d6;border-radius:10px;'
    this.progamaActive=null
    this.despuesActive = null;
    this.progra.lockSwipes(true)
  }
  onProgramas(){
    this.progra.lockSwipes(false)
    this.progra.slideTo(1)
    this.onVivoBoton = 'left:35%;'
    this.transpDiv='left: 43%;'
    this.destacadoActive=null
    this.despuesActive = null;
    this.progamaActive='color:white;background: #000000d6;border-radius:10px;'
 

    this.progra.lockSwipes(true)


    
  }
  onVerDespues(){
    this.progra.lockSwipes(false)
    this.progra.slideTo(2)
    this.onVivoBoton = 'left:68%;'
    this.transpDiv='left: 75%;'
    this.despuesActive='color:white;background: #000000d6;border-radius:10px;'
    this.destacadoActive=null
    this.progamaActive=null
    this.progra.lockSwipes(true)
  }

  openMenu(){
    this.menu.enable(true, 'config');
    this.menu.open('config'); 
  }

  redesSocialesOpen(){
    this.menu.enable(true, 'redessociales');
    this.menu.open('redessociales');
  }
  openmenuPerfil(){
    this.menu.enable(true, 'perfil');
    this.menu.open('perfil'); 
  }

  openPerfilFromMenu(){
    this.menu.close('config')
    this.menu.enable(true, 'perfil');
    this.menu.open('perfil'); 
  }


  openMisionVision(){
    this.menu.close('config')
    this.menu.enable(true, 'misionvision');
    this.menu.open('misionvision'); 
  }

  backToconfigFromMision(){
    this.menu.close('misionvision')
    this.menu.enable(true, 'config');
    this.menu.open('config'); 
  }


  openSobreNosotros(){
    this.app.getBiosQS().subscribe(item=>{
      this.talentsBios = item

      this.talentsBios.sort(sortBy('spot'))
    })
    this.menu.close('config')
    this.menu.enable(true, 'nosotros');
    this.menu.open('nosotros'); 
  }

  backToConfigFromNosotros(){
    this.menu.close('nosotros ')
    this.menu.enable(true, 'config');
    this.menu.open('config'); 
  }

  verBioTalent(item){
    this.personalData = item
  }










  videoMenu(){
    if(this.videoMenuOpen === 'config-buttons-active'){
      this.videoMenuOpen = 'config-buttons'
    }else{
      this.videoMenuOpen = 'config-buttons-active'
    }
    
  }


  goToLink(url: string){

    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(url)

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_system')
}


  

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   openEpisodio(item){

    this.estaEnPlay = false
    this.player.pause()
    if(this.streamCount> 0){
      this.playerMin.pause()
    }

    var currentD = new Date();
    var endHappyHourD = new Date(item.endHour);
    
    
    if(currentD > endHappyHourD ){
      this.modal.create({
        component: EpisodioComponent,
        cssClass:'my-custom-class',
        componentProps:{
          item:item
        }
        
      }).then((modal)=> modal.present())
    }else{
      this.episodioNoDisponible()
    }


    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Viendo un episodio',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    

    
   
   }
   async episodioNoDisponible(){
    const actionSheet = await this.action.create({
      header: 'Este episodio aun no esta disponible, que deseas hacer?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Notificarme cuando este  disponible',
          role: 'destructive',
          icon: 'notifications',
          handler: () => {
            
          }
        },{
        text: 'Cancelar',
        role: 'destructive',
        icon: 'close',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }
   openHipodromo(item){
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: HipodromoComponent,
      cssClass:'my-custom-class',
      componentProps:{
        item:item
      }
      
    }).then((modal)=> modal.present())


    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Viendo el '+ item.nombre,
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
   }



   openAtreveANarrar(){
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: AtreveanarrarComponent,
      cssClass:'my-custom-class'
      
    }).then((modal)=> modal.present())

    
   }

   openGaceta(item){
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: GacetaComponent,
      cssClass:'my-custom-class',
      componentProps:{
        item:item
      }
      
    }).then((modal)=> modal.present())

    this.dismissNews()
    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Viendo la Gaceta de ' + item.nombre,
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
   }

   openPronostico(item){
    this.estaEnPlay = false
     this.player.pause()
     if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: PronosticoComponent,
      cssClass:'my-custom-class',
      componentProps:{
        item:item
      }
      
    }).then((modal)=> modal.present())

    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Viendo pronostico de '+item.talentName,
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
   }

   scrollFunction(e){
   
    if(e.srcElement.scrollTop > 30){
     
      this.botonScale = 'bottom: -13%;'
    }
    else{
     
      this.botonScale = null
    }
   }


   async EpisodioFiltroAction() {
    const actionSheet = await this.action.create({
      header: 'Filtro de episodios',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Todos',
        
        handler: () => {
         this.episodiosPropios = null;
         this.app.getEpisodio().subscribe(item =>{
           this.episodiosPropios = item
           this.episodiosPropios = this.episodiosPropios.filter(item => item.propio === true);
           this.episodiosPropios.sort(sortBy('-fecha'))
           this.episodioTitle = 'Todos los Episodios'

         })
        }
      } ,{
        text: 'Por Pais',
        
        handler: () => {

          
         this.PaisFiltroEpisodiosAction()
        }
      },{
        text: 'Por Nombre',
        
        handler: () => {
         this.NombreFiltroEpisodiosAction()
        }
      } ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  async HipodromoFiltroAction() {
    const actionSheet = await this.action.create({
      header: 'Filtro',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'En vivo',
        
        handler: () => {
         
        this.hipodromosAll = this.hipodromosAll.filter(item => item.enVivo === true)
        
        this.hipodromosAll.sort(sortBy('pais'))
        this.hipodromosTitle = 'En Vivo'
        }
      }  ,{
        text: 'Todos',
        
        handler: () => {
          this.hipodromosAll = null
        this.app.getHipodromo().subscribe(item =>{
          this.hipodromosAll = item
          
      this.hipodromosAll.sort(sortBy('pais'))
          this.hipodromosTitle = 'Todos los Hipodromos'
        })
        }
      }  ,{
        text: 'Por pais',
        
        handler: () => {
         this.PaisFiltroAction()
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }




  async GacetaFiltroAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Con actividad hoy',
        
        handler: () => {
      this.gacetaHipodromos = this.gacetaHipodromos.filter(item => item.actividad === true)
      
      this.gacetaTitle = 'Con Actividad Hoy'
        }
      }  ,{
        text: 'Todos',
        
        handler: () => {
          this.gacetaHipodromos = null
        this.app.getHipodromo().subscribe(item =>{
          this.gacetaHipodromos = item
          this.gacetaTitle = 'Todos los Hipodromos'
        })
        }
      }  ,{
        text: 'Por pais',
        
        handler: () => {
         this.PaisFiltroActionGaceta()
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }



  async redesSociales(){
    const actionSheet = await this.action.create({
      header: 'Filtro',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Instagram',
        
        handler: () => {
         /* let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://www.instagram.com/grtv.us/")
      
          const web:string = link.changingThisBreaksApplicationSecurity
          this.inBro.create(web)*/
        }
      }  ,{
        text: 'Facebook',
        
        handler: () => {
        /*  let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://www.facebook.com/Grtv.us/")
      
          const web:string = link.changingThisBreaksApplicationSecurity
          this.inBro.create(web)*/
        }
      }  ,{
        text: 'Twitter',
        
        handler: () => {
        /*  let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://twitter.com/grtvus")
      
          const web:string = link.changingThisBreaksApplicationSecurity
          this.inBro.create(web)*/
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


hipodromoToSearch(){
  this.ToSearch = true
  this.hipodromosAll = null
  this.app.getHipodromo().subscribe(item =>{
    this.hipodromosAll = item
    this.hipodromosAllRef = item
    
    this.hipodromosAll.sort(sortBy('pais'))

    this.indexOfHipodromo = this.hipodromosAllRef.length
    this.hipodromosTitle = 'Buscar en Todos los Hipodromos'
  })
}
GacetaToSearch(){
  this.ToSearchG = true
  this.gacetaHipodromos = null
  this.app.getHipodromo().subscribe(item =>{
    this.gacetaHipodromos = item

    this.indexOfGaceta = this.hipodromosAllRef.length
    this.gacetaTitle = 'Buscar en Todos los Hipodromos'
  })
}
hipodromoToSearchClose(){
  this.ToSearch = false
  this.hipodromosAll = null
  this.textoBuscar=''
  this.app.getHipodromo().subscribe(item =>{
    this.hipodromosAll = item
    
    this.hipodromosAll.sort(sortBy('pais'))
    this.hipodromosTitle = 'Todos los Hipodromos'
  })
  
}
GacetaToSearchClose(){
  this.ToSearchG = false
  this.gacetaHipodromos = null
  this.textoGaceta= ''
  this.app.getHipodromo().subscribe(item =>{
    this.gacetaHipodromos = item
    this.gacetaTitle = 'Todos los Hipodromos'
  })
  
}

async filtroPronosHoy(){
  const actionSheet = await this.action.create({
    header: 'Filtro de Pronostico Hoy',
    cssClass: 'my-custom-class',
    buttons: [
      {
        text: 'Todos',
        handler: () => {
          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiHoy = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
            this.pronostiHoy.sort(sortBy('-hour'))
          })
        }
      },{
        text: 'Por Pais',
        handler: () => {
          this.PaisFiltroActionPronostico()
        }
      }, {
        text: 'Por Talento',
        handler: () => {
          this.TalentoFiltroActionPronostico()
        }
      },{
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close',
      handler: () => {
        
      }
    }]
  });
  await actionSheet.present();

}

async filtroPronosOtrosDias(){
const actionSheet = await this.action.create({
  header: 'Filtro de Pronostico Dias Anteriores',
  cssClass: 'my-custom-class',
  buttons: [
    {
      text: 'Todos',
      handler: () => {
        let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiViejos = null
        this.app.getPronostico().subscribe(item=>{
          let ShortDate = day.toString() + ' de ' + this.FullMonth 
          let pronosticosArray:any = item
          pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
    
          this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)
    
          this.pronostiViejos.sort(sortBy('-fecha'))
        })
      }
    },{
      text: 'Por Pais',
      handler: () => {
        this.PaisFiltroActionPronosticoOtrosDias()
      }
    }, {
      text: 'Por Talento',
      handler: () => {
        this.TalentoFiltroActionPronosticootrosDias()
           }
    },{
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => {
      
    }
  }]
});
await actionSheet.present();

}




async filtroDestacadoOtrosDias(){
  const actionSheet = await this.action.create({
    header: 'Filtro de Destacado Dias Anteriores',
    cssClass: 'my-custom-class',
    buttons: [
      {
        text: 'Todos',
        handler: () => {

          let firstFilter =  this.episodiosAll.filter(item => item.destacado === true);
          this.episodioDestacadoOtros = firstFilter.filter(item => item.longDate !== this.EpisodioLongDate)
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.longDate.includes(this.FullMonth))
          this.episodioDestacadoOtros.sort(sortBy('-fecha'))
        }
      },{
        text: 'Por Pais',
        handler: () => {

          this.PaisFiltroActionDestacado()
        }
      }, {
        text: 'Por Hipodromo',
        handler: () => {
          this.porHipodFiltroActionDestacado()

             }
      },{
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close',
      handler: () => {
        
      }
    }]
  });
  await actionSheet.present();
  
  }



async PaisFiltroActionPronostico(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Pais',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsPronosticoPais()
  });
  await actionSheet.present();
}



async PaisFiltroActionDestacado(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Pais',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsDestacadoPais()
  });
  await actionSheet.present();
}

async porHipodFiltroActionDestacado(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Pais',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsDestacadoHipodromo()
  });
  await actionSheet.present();
}

async PaisFiltroActionPronosticoOtrosDias(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Pais',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsPronosticoPaisOtrosDias()
  });
  await actionSheet.present();
}

async TalentoFiltroActionPronostico(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Talento',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsPronosticoTalento()
  });
  await actionSheet.present();
}

async TalentoFiltroActionPronosticootrosDias(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Talento',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsPronosticoTalentootrosDias()
  });
  await actionSheet.present();
}
  async PaisFiltroAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtons()
    });
    await actionSheet.present();
  }

  async PaisFiltroEpisodiosAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtonsEpisodiosPais()
    });
    await actionSheet.present();
  }


  async NombreFiltroEpisodiosAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons:  this.createButtonsEpisodiosNombre()
    });
    await actionSheet.present();
  }

  async PorEpisodioFiltroEpisodiosAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons:  this.createButtonsEpisodiosNombre()
    });
    await actionSheet.present();
  }

  async PaisFiltroActionGaceta(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtonsGaceta()
    });
    await actionSheet.present();
  }

  createButtonsEpisodiosPais(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {
          this.episodiosPropios = null
          this.app.getEpisodiobyPais(index.name).subscribe(item =>{
            this.episodiosPropios = item
            this.episodiosPropios = this.episodiosPropios.filter(item => item.propio === true)
            this.episodioTitle = index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  


  createButtonsPronosticoTalento(){
    let buttons = [];
    for (let index of this.myTalent) {
      let button = {
        text:index.displayName,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiHoy = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
            this.pronostiHoy = this.pronostiHoy.filter(item => item.talentName === index.displayName)
            this.pronostiHoy.sort(sortBy('-hour'))
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  /*createButtonsPronosticoTalento(){
    let buttons = [];
    for (let index of this.myTalent) {
      let button = {
        text:index.displayName,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiHoy = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
            this.pronostiHoy = this.pronostiHoy.filter(item => item.talentName === index.displayName)
            this.pronostiHoy.sort(sortBy('-hour'))
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }*/
// aqui va el pronosticootros dias
  createButtonsPronosticoTalentootrosDias(){
    let buttons = [];
    for (let index of this.myTalent) {
      let button = {
        text:index.displayName,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiViejos = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)
            this.pronostiViejos = this.pronostiViejos.filter(item => item.talentName === index.displayName)
            this.pronostiViejos.sort(sortBy('-fecha'))
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  createButtonsPronosticoPais(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiHoy = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
            this.pronostiHoy = this.pronostiHoy.filter(item => item.pais === index.name)
            this.pronostiHoy.sort(sortBy('-hour'))
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }



  createButtonsDestacadoPais(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {




          let firstFilter =  this.episodiosAll.filter(item => item.destacado === true);
          this.episodioDestacadoOtros = firstFilter.filter(item => item.longDate !== this.EpisodioLongDate)
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.longDate.includes(this.FullMonth))
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.pais === index.name )
          this.episodioDestacadoOtros.sort(sortBy('-fecha'))
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  createButtonsDestacadoHipodromo(){
    let buttons = [];
    for (let index of this.hipodromosAll) {
      let button = {
        text:index.nombre,
        handler: () => {




          let firstFilter =  this.episodiosAll.filter(item => item.destacado === true);
          this.episodioDestacadoOtros = firstFilter.filter(item => item.longDate !== this.EpisodioLongDate)
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.longDate.includes(this.FullMonth))
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.nombre.includes(index.nombre) )
          this.episodioDestacadoOtros.sort(sortBy('-fecha'))
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  createButtonsPronosticoPaisOtrosDias(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiViejos = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item

            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
    
            this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)
            this.pronostiViejos = this.pronostiViejos.filter(item => item.pais === index.name)
      
            this.pronostiViejos.sort(sortBy('-fecha'))
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  


  createButtonsEpisodiosNombre(){
    let buttons = [];
    for (let index of this.ProgramaName) {
      let button = {
        text:index.nombre,
        handler: () => {
          this.episodiosPropios = null
          this.app.getEpisodiobyNombre(index.nombre).subscribe(item =>{
            this.episodiosPropios = item
            
            this.episodiosPropios = this.episodiosPropios.filter(item => item.propio === true)
            this.episodioTitle = index.nombre
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  

  createButtons(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {
          this.hipodromosAll = null
          this.app.getHipodromobyPais(index.name).subscribe(item =>{
            this.hipodromosAll = item
            
      this.hipodromosAll.sort(sortBy('pais'))
            this.hipodromosTitle = 'Hipodromos de ' + index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  createButtonsGaceta(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {
          this.gacetaHipodromos = null
          this.app.getHipodromobyPais(index.name).subscribe(item =>{
            this.gacetaHipodromos = item
            this.gacetaTitle = 'Hipodromos de ' + index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  async CategoriaFiltroAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtonsEpisodios()
    });
    await actionSheet.present();
  }

  createButtonsEpisodios(){
    let buttons = [];
    for (let index of this.catName) {
      let button = {
        text:index.name,
        handler: () => {
          this.episodiosAll = null;
          this.app.getEpisodiobyCat(index.name).subscribe(item =>{
            this.episodiosAll = item
            this.episodioTitle = index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }
  buscarG(event){
    this.textoGaceta = event.detail.value;
  }

  buscarE(event){
    this.buscarEpisodio = event.detail.value
  }


  EpisodioToSearch(){

    this.ToSearchE = true
    this.episodiosAll = null
    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      this.episodiosPropios = this.episodiosAll.filter(item => item.propio === true);
      let forFilter : any = this.episodiosAll.filter(item => item.propio === true)
      this.episodiosPropios = this.episodiosPropios.filter(item => item.fecha)
      this.episodiosPropios.sort(sortBy('-fecha'))


      this.indexOfEpisodio = forFilter.length
      
      this.episodioTitle = 'Buscar en Todos los Episodios'
    })
  }
  EpisodioToSearchClose(){
    this.ToSearchE = false
    this.episodiosAll = null
    this.buscarEpisodio=''
    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      this.episodiosPropios = this.episodiosAll.filter(item => item.propio === true);
      this.episodiosPropios = this.episodiosPropios.filter(item => item.fecha)
      this.episodiosPropios.sort(sortBy('-fecha'))
      this.episodioTitle = 'Episodios Reciente'
    })
    
  }

  openJuego(){
    this.modal.create({
      component: AccComponent ,
      cssClass:'my-custom-class',
    }).then((modal)=> modal.present())
   }

   openLogin(){
    this.modal.create({
      component: LoginemailComponent,
      cssClass:'my-custom-class',
    }).then((modal)=> modal.present())
   }

   funcionPrueba(){

    var currentD = new Date();
    /*  var startHappyHourD = new Date();
      startHappyHourD.setHours(10,0,0); // 5.30 pm*/
      var endHappyHourD = new Date('11/14/2021 00:00');



    
   }

   async guardarEpisodio(item){
    var currentD = new Date();
    /* Esta es la forma correcta para armar el DATE 
                    11/14/2021 00:00                */
                    console.log(item.endHour)
      var endHappyHourD = new Date(item.endHour);
      
      if(currentD > endHappyHourD ){
        const actionSheet = await this.action.create({
          header: 'Deseas guardar este episodio?',
          cssClass: 'my-custom-class',
          buttons: [
            {
              text: 'Guardar para mas tarde',
              role: 'destructive',
              icon: 'bookmark',
              handler: () => {
                this.addGuardarEpisodio(item);
              }
            },{
            text: 'Cancelar',
            role: 'destructive',
            icon: 'close',
            handler: () => {
              
            }
          }]
        });
        await actionSheet.present();
      }else{
        this.episodioNoDisponible()
      }
     
    
  } 
  addGuardarEpisodio(item){

    this.db.collection('users').doc(this.userAny.uid).collection('vermastarde').doc(item.id).set({
      capitulo : item.capitulo,
      categoria:item.categoria,
      cover:item.cover,
      day:item.day,
      descripcion:item.descripcion,
      horario:item.horario,
      link:item.link,
      longDate:item.longDate,
      nombre:item.nombre,
      shortDate:item.shortDate,
      visto:false
    }).then(i =>{
      if(this.userAny){
        this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
          this.MisEpisodiosMasTarde = item
        })
      }
      this.episodioGuardado(item);
      this.onVerDespues()
    })
  }

  async episodioGuardado(item) {
    const toast = await this.toast.create({
      message: 'El Capitulo '+item.nombre+' a sido guardado para ver mas tarde',
      duration: 6000
    });
    toast.present();
  }

/*
  async onLoginGoogle(){

    try{
     this.auth.loginAndroidGoogle().then(i=>{

        this.afAuth.onAuthStateChanged((user)=>{
          if(user){
            this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
              this.userAny = item;
              this.volverLogin()
              if(this.userAny){
                this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
                  this.MisEpisodiosMasTarde = item
                  
                })
              }else{
                this.db.collection('users').doc(user.uid).set({
                  uid:user.uid,
                  email:user.email,
                  displayName:user.displayName,
                  photoURL:user.photoURL
                }).then(()=>{
                  this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
                    this.MisEpisodiosMasTarde = item
                    
                  })
                })
              }
              
            })
           }
          }


        )
      })
     
    }
    catch(error){console.log(error)}
  }
*/
  getLink(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file=https://www.youtube.com/watch?v=wq8cfsdnuz4')
    }

  async onLogOut(){
    try{
      this.auth.logout().then(ite =>{
        this.userAny = null
        
          this.menu.enable(true, 'perfil');
          this.menu.close('perfil');

          window.location.reload();
          
        
      })

    }catch(error){console.log(error)}
  }
}
