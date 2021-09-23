import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Live } from 'src/app/shared/model/live.model';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {


  public liveForm!: FormGroup;
  public send!: Live;

  constructor(public dialogRef: MatDialogRef<LiveFormDialogComponent>,
              public fb: FormBuilder,
              public rest: LiveService) { }

  ngOnInit(): void {
     this.liveForm = this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveDate: ['2020-08-01T20:00:00', [Validators.required]],
      liveTime: ['2020-08-01T20:00:00', [Validators.required]],
      liveLink: ['', [Validators.required]],
      registrationDate: ['', [Validators.required]],
      urlSafe: ['', [Validators.required]],
    })
    
  }

  cancelar(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

  createLive(){
    
      // Manipulando o html do youtube
    var link: string = this.liveForm.controls.liveLink.value.replace('watch?v=','embed/');
    // Faz um post passando os itens do formulario
    this.rest.postLives(this.liveForm.value, link).subscribe();
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
