import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';

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
              public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
  }
  
  
  
}
