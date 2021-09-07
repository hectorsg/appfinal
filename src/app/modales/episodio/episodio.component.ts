import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, IonSlides, NavParams } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TriviaService } from 'src/app/servicios/trivia.service';
import sortBy from 'sort-by';
//import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig,AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';


declare var videojs : any ;

@Component({
  selector: 'app-episodio',
  templateUrl: './episodio.component.html',
  styleUrls: ['./episodio.component.scss'],
})
export class EpisodioComponent implements OnInit {

  public episodioItem:any;
  
  //necesario para video js
  playerH: any ;
  playerHFull: any;

  public Episodios : any;
  public otherEpisodios:any;
  public isPlayin:string;
  public isPlayind:string;
  public onFullscreen : boolean;


  public toPause : string;
  public estaEnPlay : boolean;
  public VivoConfig : string;
  public episodiosMas : any;
  public isPropio : boolean;

  constructor(public modal : ModalController, public nav : NavParams,public sanitaizer : DomSanitizer, 
              public app : TriviaService /*, private admobFree: AdMobFree*/) { }

  @ViewChild('masCapitulos', { static: false}) masCapituloss: IonSlides;

  masEpisodios={
      initialSlide: 0,
      slidesPerView: 2,
      speed: 600
  }

  ngOnInit() {
    this.episodioItem = this.nav.get('item')
    this.toPause = 'opacity:0;'


  }


  onFullscreengive(){
    this.estaEnPlay = true
  }


 async openFullScreen(){


    let currentTi : number = this.playerH.currentTime()
    this.playerH.pause()
    this.onFullscreen = true


    

    await this.sleep(1000)


      
    this.playerHFull = videojs(document.getElementById('episodioFulll'))

    this.playerHFull.poster('../../../assets/other/asd.jpg')
    
    


    
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.episodioItem.link)
    const web:string = link.changingThisBreaksApplicationSecurity

    this.playerHFull.src({
      type: 'video/youtube',
      src: web
    });
    this.playerHFull.currentTime(currentTi)
    this.playerHFull.play()

    this.estaEnPlay = true
  }

  pauseStre(){
    this.estaEnPlay = false
    this.playerH.pause()
  }

  pauseStreFull(){
    this.estaEnPlay = false
    this.playerHFull.pause()
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

  playStrea(){
    this.estaEnPlay = true
    this.playerH.play()
  }

  
  playStreaFullscreen(){
    this.estaEnPlay = true
    this.playerHFull.play()
  }

  async playPuaseAction(){   
    if(this.toPause === 'opacity:0;'){

      this.toPause = 'opacity:1;'
    }else{
      
    this.toPause = 'opacity:0;'
    }

  }

 async closeFullScreen(){
    let playerFullTime : number = this.playerHFull.currentTime()
    this.onFullscreen = false
    this.playerHFull.pause()
    await this.sleep(1000)


    this.playerH = videojs(document.getElementById('episodio'))

    this.playerH.poster('../../../../assets/other/poster1.jpg')
    
    


    
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.episodioItem.link)
    const web:string = link.changingThisBreaksApplicationSecurity

    this.playerH.src({
      type: 'video/youtube',
      src: web
    });
    this.playerH.currentTime(playerFullTime)
    this.playerH.play()

    this.estaEnPlay = true

  }

  getLink(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file='+this.episodioItem.link)
    }

  dissmissModal(){
    this.modal.dismiss();
  }
  ionViewDidEnter(){
    
    this.playerH = videojs(document.getElementById('episodio'))

    this.playerH.poster('../../../../assets/other/poster1.jpg')
    
    


    
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.episodioItem.link)
    const web:string = link.changingThisBreaksApplicationSecurity

    this.playerH.src({
      type: 'video/youtube',
      src: web
    });

    this.playerH.play()

    this.estaEnPlay = true


    this.app.getMisEpisodiosVermas().subscribe(item => { 
      this.episodiosMas = item

      this.episodiosMas = this.episodiosMas.filter(item => item.longDate === this.episodioItem.longDate)
      this.episodiosMas.sort(sortBy('horaEnd'));
    })


    
  }
/*
  showInterstitialAds(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
        autoShow: true,
        id: "ca-app-pub-1546004963529341/8553930529"
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => alert(e));
}

showRewardVideoAds(){
  let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
      isTesting: true, // Remove in production
      autoShow: true//,
      //id: "ca-app-pub-1546004963529341/8553930529"
  };
  this.admobFree.rewardVideo.config(RewardVideoConfig);
  this.admobFree.rewardVideo.prepare().then(() => {
  }).catch(e => alert(e));
}
*/

}
