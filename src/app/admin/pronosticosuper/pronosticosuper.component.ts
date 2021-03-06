import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonSlides, ModalController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import * as numeral from 'numeral'
import { AngularFirestore } from '@angular/fire/firestore';
import sortBy from 'sort-by';
import { AngularFireStorage } from '@angular/fire/storage';
declare var videojs : any ;

@Component({
  selector: 'app-pronosticosuper',
  templateUrl: './pronosticosuper.component.html',
  styleUrls: ['./pronosticosuper.component.scss'],
})
export class PronosticosuperComponent implements OnInit {

  public pronList : any;
  public preview : boolean;
  public blur : string;
  public currentVideoDuration : string;
  public isPlayin : boolean;
  public isPaused : boolean;
  public previewItem : any;
  public FullMonth : string;

  hipoDate={
    initialSlide:0,
    slidesPerView:1,
    speed:800,
    autoplay:{
      delay:2000
    }
  }

  
  @ViewChild('hipDate', { static: false}) HIAdmindate: IonSlides;
  
  prevAdminVideo :any
  constructor(public modal : ModalController, public app : TriviaService, public sanitaizer : DomSanitizer, 
              public db : AngularFirestore, public storage : AngularFireStorage) { }

  ngOnInit() {}

  ionViewDidEnter(){
    let d = new Date();
    let n = d.getMonth()
    
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
    this.app.getPronostico().subscribe(item=>{
      this.pronList = item
      this.pronList = this.pronList.filter(item => item.date.includes(this.FullMonth))
      this.pronList.sort(sortBy('-fecha'))
     })
  }

  descargarVideo(){
    this.storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/grtv-2c63e.appspot.com/o/pronosticos%2F0l1vojsi5cz?alt=media&token=30f39a89-70fa-46b0-b0e8-d005d3ef9031').getDownloadURL().subscribe(item =>{
      let res : any = item
      console.log(res)


      
   let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(res)

   const web:string = link.changingThisBreaksApplicationSecurity

       // This can be downloaded directly:
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', res);
  xhr.send();
    })
  }

  cerrarModal(){
    this.modal.dismiss()
  }

  goBack(){
    this.preview = false
    this.previewItem = null
    this.prevAdminVideo.pause()
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   aprobar(item){
    this.db.collection('pronostico').doc(item.id).update({
      aproved:'aprobado'
    })
   }

   desaprobar(item){
     this.db.collection('pronostico').doc(item.id).update({
       aproved:'desaprobado'
     })
   }

   pendiente(item){
     this.db.collection('pronostico').doc(item.id).update({
       aproved:'pendiente'
     })
   }

   downloadFile(){
    let link = document.createElement("a");
    link.download = "filename.mp4";
    link.href = "https://firebasestorage.googleapis.com/v0/b/grtv-2c63e.appspot.com/o/pronosticos%2F5ya7z2r557o?alt=media&token=7e422777-a418-4b73-9c4d-24ea528851df";
    link.click();
}

  
  async previewVideo(item){
    this.preview = true
    this.previewItem = item
  await  this.sleep(1000)

    this.prevAdminVideo = videojs(document.getElementById('prevAdmin'))

   this.prevAdminVideo.poster('../../../../assets/other/poster2.jpg')
   
   this.HIAdmindate.update()


   
   let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.videoUrl)

   const web:string = link.changingThisBreaksApplicationSecurity

   this.prevAdminVideo.src({
     type: 'video/mp4',
     src: web
   });

   this.prevAdminVideo.play()
   var timer = setInterval(()=>{
     let current = this.prevAdminVideo.currentTime()
     current = numeral(current).format(0)
     if(current < 10){
       current = '0:0'+current
     }else{

       current = '0:'+current
     }
     let duration = this.prevAdminVideo.duration()
     duration = numeral(duration).format(0)

     if(duration < 10){
       duration = '0:0'+duration
     }else{
       duration = '0:'+duration
     }
     this.currentVideoDuration = current+' / '+duration
   })
   this.isPlayin = true
   this.isPaused  = false
  }

}
