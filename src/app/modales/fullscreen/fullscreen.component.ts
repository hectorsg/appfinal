import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';


declare var videojs : any ;

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
})
export class FullscreenComponent implements OnInit {


  
  public toPause : string;
  public estaEnPlay : boolean;
  playerFull: any ;
  public VivoConfig : string;

  constructor(public app : TriviaService, public sanitaizer : DomSanitizer, public modal : ModalController) { }

  ngOnInit() {
    
    this.toPause = 'opacity:0;'

  
  }

  ionViewDidEnter(){
    this.playerFull = videojs(document.getElementById('video-full'))
    this.playerFull.poster('../../../assets/other/asd.jpg')
    
    this.app.getEnVivoConfig().subscribe(item =>{
     let config:any  = item

       this.VivoConfig = config[0].tvLink 

       let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.VivoConfig)

       const web:string = link.changingThisBreaksApplicationSecurity
      this.playerFull.src({
        type: 'video/youtube',
        src: web,
      });

      
    this.playerFull.play()
    this.estaEnPlay = true

      
    })
  }

  
  pauseStre(){
    this.estaEnPlay = false
    this.playerFull.pause()
  }

  playStrea(){
    this.estaEnPlay = true
    this.playerFull.play()
  }

  async playPuaseAction(){   
    if(this.toPause === 'opacity:0;'){

      this.toPause = 'opacity:1;'
    }else{
      
    this.toPause = 'opacity:0;'
    }

  }

  closeFullScreen(){
    this.modal.dismiss()
  }

}
