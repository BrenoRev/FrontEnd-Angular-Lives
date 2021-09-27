import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';
import { HomeComponent } from '../home.component';
import { LiveFormDialogComponent } from '../live-form-dialog/live-form-dialog.component';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  // Armazenar as lives que já aconteceram
  livesPrevious: Live[] = [];
  livesNext: Live[] = [];
  next: boolean = false;
  previous: boolean = false;
 
  constructor(public liveService: LiveService,
              public sanitizer: DomSanitizer,
              public add: HomeComponent,
              ) { }

  ngOnInit(): void {
    this.sendId(0);
    this.getLives();
  }
  
  // Vai pegar todas as lives
  getLives(){
    this.liveService.getLivesWithFlag('previous').subscribe((data) => {
      this.livesPrevious = data.content;
      this.livesPrevious.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      })
      this.previous = true;
    })

    this.liveService.getLivesWithFlag('next').subscribe((data) => {
      this.livesNext = data.content;
      this.livesNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      })
      this.next = true; 
    })
    this.sendId(0);
  }
  
  deleteLive(id: Number){
    if(confirm("Deseja confirmar a exclusão da live?")){
    this.liveService.deleteLives(id).subscribe();
    window.location.reload();
    this.sendId(0);
    this.getLives();
  }
  }
  
  sendId(id: Number){
    LiveFormDialogComponent.id = id;
  }

}
