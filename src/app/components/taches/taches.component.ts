import { Component } from '@angular/core';
import { Tachess } from 'src/app/models/tachess';
import { TachesService } from 'src/app/services/taches.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent {
  textRecherch = '';
  frachFormAjoute = false;
  refreshButton = false;
myTache:Tachess={
      "label": '',
      "completed": false
};
  tch:Tachess[] = [];
  resultatTaches:Tachess[] = [];
  constructor(private tachService:TachesService){}
  ngOnInit(){
    this.gettache();
  }
gettache(){
  this.tachService.findAll()
  .subscribe(tch=>{
    this.resultatTaches = this.tch=tch
  })
}

deletTache(id: number | undefined){
this.tachService.delete(id)
.subscribe(()=>{
  this.tch = this.tch.filter(taches => taches.id != id)
  this.resultatTaches = this.resultatTaches.filter(taches => taches.id != id)
})
}

AjouteTache(){
  this.tachService.enregister(this.myTache).subscribe((tachesAjouter)=>{
  this.tch = [tachesAjouter, ...this.tch]
  this.resultatTaches = this.tch;
  this.resetTache();
  this.frachFormAjoute = false;
  })
}

resetTache(){
this.myTache={
  "label": '',
  "completed": false
}
}
modifcompleted(tachesmd:Tachess){
this.tachService.funcCompleted(tachesmd.id,tachesmd.completed)
.subscribe(()=>{
  tachesmd.completed = !tachesmd.completed
})
}

editTache(tachesEdit:Tachess){
this.myTache = tachesEdit
this.refreshButton = true;
}

updateTache(){
  this.tachService.updateTachesr(this.myTache)
  .subscribe(tachesUpdt => {
    this.resetTache();
    this.refreshButton = false;
  })
}
recherch(){
this.resultatTaches = this.tch.filter((taches)=>taches.label.includes(this.textRecherch.toLowerCase()))
}

}
