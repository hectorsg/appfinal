import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';

@Component({
  selector: 'app-storiesadmin',
  templateUrl: './storiesadmin.component.html',
  styleUrls: ['./storiesadmin.component.scss'],
})
export class StoriesadminComponent implements OnInit {

    public myStories : any;
    public userAny : any;
  constructor(public modal : ModalController, public app : TriviaService, public afAuth : AngularFireAuth, public db : AngularFirestore) { }

  ngOnInit() {

    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;
          this.app.getPronostico().subscribe(item=>{
            this.myStories = item
            this.myStories = this.myStories.filter(item => item.talentName === this.userAny.displayName)
      
          })
        })
       }
      })

   
  }

  dismissModal(){
    this.modal.dismiss()
  }

  DeleteStory(item){
    this.db.collection('pronostico').doc(item.id).delete()
  }

}
