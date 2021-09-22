import { Component, OnInit } from '@angular/core';
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

  constructor(public liveService: LiveService) { }

  ngOnInit(): void {
    this.getLives();
  }

  // Vai pegar todas as lives
  getLives(){
    this.liveService.getLivesWithFlag('previous').subscribe((data) => {
      this.livesPrevious = data.content;
    })

    this.liveService.getLivesWithFlag('next').subscribe((data) => {
      this.livesNext = data.content;
    })
  }
  
  
  
}
