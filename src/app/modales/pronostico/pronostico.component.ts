import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonSlides, ModalController, NavParams } from '@ionic/angular';
import * as numeral from 'numeral'


declare var videojs : any ;

@Component({
  selector: 'app-pronostico',
  templateUrl: './pronostico.component.html',
  styleUrls: ['./pronostico.component.scss'],
})
export class PronosticoComponent implements OnInit {

  
  @ViewChild('hipDate', { static: false}) HIdate: IonSlides;

  pronVideo :any
  public isPlayin:boolean;
  public isPaused : boolean;
  public currentVideoDuration : string;
  public blur : string;
  public data : any;

  hipoDate={
    initialSlide:0,
    slidesPerView:1,
    speed:800,
    autoplay:{
      delay:2000
    }
  }
  constructor(public modal : ModalController, public nav : NavParams,  public sanitaizer : DomSanitizer) { }

  ngOnInit() {}

  ionViewDidEnter(){

    this.data = this.nav.get('item')
    
    this.pronVideo = videojs(document.getElementById('pron'))

    this.pronVideo.poster('../../../../assets/other/poster2.jpg')
    
   


    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.data.videoUrl)

    const web:string = link.changingThisBreaksApplicationSecurity
    

    this.pronVideo.src({
      type: 'video/mp4',
      src: web
    });

    this.pronVideo.play()
    var timer = setInterval(()=>{
      let current = this.pronVideo.currentTime()
      current = numeral(current).format(0)
      if(current < 10){
        current = '0:0'+current
      }else{

        current = '0:'+current
      }
      let duration = this.pronVideo.duration()
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

    this.updateSlider()
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

 async updateSlider(){
 await this.sleep(1000)

 
 this.HIdate.update()
  }

  playPauseVideo(){
    if(this.isPlayin=== true){
      this.pronVideo.pause()
      this.isPlayin = false
      this.isPaused = true
     
      this.blur = 'background: rgba(0, 0, 0, 0.473);'
    }else{
      this.pronVideo.play()
      this.isPlayin = true
    this.isPaused  = false
    this.blur = null
    }
   
  }

  closeModal(){
    this.modal.dismiss()
  }


}
