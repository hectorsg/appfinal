import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { PipeModule } from './../pipes/pipe/pipe/pipe.module';

import { HomePageRoutingModule } from './home-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PipeModule,
    DragDropModule,
    InfiniteScrollModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
