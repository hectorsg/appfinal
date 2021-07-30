import { AngularFirestore } from '@angular/fire/firestore';
import { TriviaService } from './../../servicios/trivia.service';
import { ModalController, IonSlides, NavParams } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

declare var videojs : any ;


@Component({
  selector: 'app-hipodromo',
  templateUrl: './hipodromo.component.html',
  styleUrls: ['./hipodromo.component.scss'],
})
export class HipodromoComponent implements OnInit {

  @ViewChild('hipodromo', { static: false}) hipodromos: IonSlides;

  hipodromoSlide = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  }

  public sliderLoad:boolean;
  public hip :any;
  public livelink:string;
  public raceAll:any;
  public infoCarrera:any;
  public horseArray:any;
  public CurrentRaceHorse:any;
  public vida:any;
  public day:any;
  public pdfSrc:string;
  public playerHip : any;
  public stream : SafeResourceUrl;

  //Dias de carrera
  public racesLun : number;
  public racesMar:number;
  public racesMie:number;
  public racesJue:number;
  public racesVie:number;
  public racesSab:number;
  public racesDom:number;

  //user 
  public userAny : any;

  
  
  //necesario para video js
  playerss: any ;

  constructor(public modal : ModalController, public nav : NavParams, 
      public sanitaizer : DomSanitizer, public app : TriviaService,
      public db : AngularFirestore, private InBrowser : InAppBrowser, public afAuth : AngularFireAuth) {}

  ngOnInit() {
    
    this.hip  = this.nav.get('item')

   
    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;          
        })
       }
      })


   

  }


  getLink(){

    return this.sanitaizer.bypassSecurityTrustResourceUrl(this.hip.link)
  
 
  }

  

  dismissModal(){

    this.modal.dismiss().then(()=>{

      this.hip= null
    })
  }

  dismissAndSave(){
    this.db.collection('users').doc(this.userAny.uid).collection('config').doc('floatVideo').set({
      videoUrl:this.hip.link,
      hipodromo:this.hip.nombre,
      pais:this.hip.pais
    }).then(()=>{
      this.dismissModal()
    })
  }
  ionViewDidEnter(){
    let d = new Date();
    let n = d.getDay();
    switch(n) {
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

    this.app.getRacesAll(this.hip.id).subscribe(item =>{
      this.raceAll = item  

      let Lun : any = this.raceAll.filter(item=> item.day === 'Lun')
      this.racesLun= Lun.length


      let Mar : any = this.raceAll.filter(item=> item.day === 'Mar')
      this.racesMar= Mar.length

      

      let Mie : any = this.raceAll.filter(item=> item.day === 'Mie')
      this.racesMie= Mie.length
      
      
      let Jue : any = this.raceAll.filter(item=> item.day === 'Jue')
      this.racesJue= Jue.length

      

      let Vie : any = this.raceAll.filter(item=> item.day === 'Vie')
      this.racesVie= Vie.length
      

      let Sab : any = this.raceAll.filter(item=> item.day === 'Sab')
      this.racesSab= Sab.length

      

      let Dom : any = this.raceAll.filter(item=> item.day === 'Dom')
      this.racesDom = Dom.length
      

    
      
    })

   

    let liiink: string = this.hip.link

    this.stream=  this.sanitaizer.bypassSecurityTrustResourceUrl(liiink)

    

  
    this.abrirVideo()
    this.hipodromos.update()
    this.hipodromos.lockSwipes(true)

  }
  openHorse(ite){
    
    this.CurrentRaceHorse = ite
    this.db.collection('caballos').doc(ite.id).valueChanges().subscribe(item =>{
      this.horseArray = item
      this.vida= this.horseArray.vida
    })
    this.hipodromos.lockSwipes(false);
    this.hipodromos.slideTo(3);
    this.hipodromos.lockSwipes(true);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

  async abrirVideo(){

    await this.sleep(1000)

    this.playerss = videojs(document.getElementById('video-hipodromo'));
    
    this.playerss.poster('../../../../assets/other/poster1.jpg')

    

    this.playerss.src({
      type: 'video/youtube',
      src: this.hip.link
    });

    
    this.playerss.play();
   
  }
  VolverGaceta(){
    this.hipodromos.lockSwipes(false);
    this.infoCarrera=null
    this.horseArray=null
    this.CurrentRaceHorse=null
    this.hipodromos.slideTo(2);
    this.hipodromos.lockSwipes(true);
  }
  openInfoHipodromo(){
    this.hipodromos.lockSwipes(false);
    this.hipodromos.slideTo(0);
    this.hipodromos.lockSwipes(true)
  }
  openInfoCarrera(item){
    this.infoCarrera = item
    this.hipodromos.lockSwipes(false);
    this.hipodromos.slideTo(1);
    this.hipodromos.lockSwipes(true)
  }

  changeDay(dayC){
    this.day = dayC
    this.raceAll= null;
    this.app.getRaces(this.hip.id, this.day).subscribe(item =>{
      this.raceAll = item
      
    })
  }

  abrirRetrospecto(){
    this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    this.hipodromos.lockSwipes(false);
    this.hipodromos.slideTo(3);
    this.hipodromos.lockSwipes(true);
  }

  openLinkBrowser(){
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.hip.web)

    const web:string = link.changingThisBreaksApplicationSecurity
    this.InBrowser.create(web, '_self')
  }

  slideMaker(e:any){

    if(e.detail.value === 'historia'){
      this.hipodromos.lockSwipes(false)
      this.hipodromos.slideTo(1)
      this.hipodromos.lockSwipes(true)
    }else{
      this.hipodromos.lockSwipes(false)
      this.hipodromos.slideTo(0)
      this.hipodromos.lockSwipes(true)
    }
  }

}
