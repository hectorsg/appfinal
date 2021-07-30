import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import * as numeral from 'numeral'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';


declare var videojs : any ;


@Component({
  selector: 'app-pronosticoadmin',
  templateUrl: './pronosticoadmin.component.html',
  styleUrls: ['./pronosticoadmin.component.scss'],
})
export class PronosticoadminComponent implements OnInit {

  uploadPercent : Observable<number>;
  urlImage : Observable<number>;
  
  public url:string;

  public hipodromos : any;
  public paises : any;
  public hipodroName : string;
  public pais:string;
  public type:string;
  public descripcion : string;
  public userAny :any;
  public FullMonth : string;
  public LongDate : string;
  public preview : boolean;



  //vainas del preview

  @ViewChild('hipDate', { static: false}) HIdate: IonSlides;

  prevVideo :any
  public isPlayin:boolean;
  public isPaused : boolean;
  public currentVideoDuration : string;
  public blur : string;

  hipoDate={
    initialSlide:0,
    slidesPerView:1,
    speed:800,
    autoplay:{
      delay:2000
    }
  }

  constructor(public modal : ModalController, public afAuth : AngularFireAuth ,
              public app : TriviaService, public storage : AngularFireStorage,
              public db: AngularFirestore, public sanitaizer : DomSanitizer,
              public toastController : ToastController, public loadingController : LoadingController) { }

  ngOnInit() {
    
    this.preview = false

    this.app.getHipodromo().subscribe(item =>{
      this.hipodromos = item
    })

    this.app.getPaisName().subscribe(item =>{
      this.paises = item
    })

    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;
        })
       }
      })

      
    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    let year = d.getFullYear()
    let today = d.getDay();
   

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

      
     this.LongDate = day.toString() + ' de ' + this.FullMonth;
  }

  dismissModal(){
    this.modal.dismiss()
  }


  onUpload(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `pronosticos/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges(); 
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
 
    
   }

   sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   async previewVideo(){
     this.preview = true

   await  this.sleep(1000)

     this.prevVideo = videojs(document.getElementById('prev'))

    this.prevVideo.poster('../../../../assets/other/poster2.jpg')
    
    this.HIdate.update()


    
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.url)

    const web:string = link.changingThisBreaksApplicationSecurity

    this.prevVideo.src({
      type: 'video/mp4',
      src: web
    });

    this.prevVideo.play()
    var timer = setInterval(()=>{
      let current = this.prevVideo.currentTime()
      current = numeral(current).format(0)
      if(current < 10){
        current = '0:0'+current
      }else{

        current = '0:'+current
      }
      let duration = this.prevVideo.duration()
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

   goBack(){
     this.prevVideo.pause()
     this.preview = false
   }

   sendRevision(){
     this.presentLoading()
     let d = new Date();
     let hour = d.getHours();
    let minutes= d.getMinutes();


    let hourFilter = hour+':'+minutes
     this.db.collection('pronostico').add({
       hipodromo:this.hipodroName,
       pais:this.pais,
       type:this.type,
       descripcion:this.descripcion,
       videoUrl:this.url,
       talentName:this.userAny.displayName,
       date:this.LongDate,
       talentPhoto:this.userAny.photoURL,
       aproved:'pendiente' ,
       hour:hourFilter
     }).then(()=>{
      this.successToast()
      this.modal.dismiss()
     })
   }

   async successToast(){
    const toast = await this.toastController.create({
      message: 'Has enviado tu '+ this.type+ ' correctamente.' ,
      duration: 3000
    });
    toast.present();
  
   }

   async presentLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espera a que se envie tu '+this.type,
      duration: 1000,
      spinner:'crescent'
    });
    await loading.present();
  }

}
