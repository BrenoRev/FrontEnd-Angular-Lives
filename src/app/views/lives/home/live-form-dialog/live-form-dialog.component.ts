import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
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
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
    })
    
  }

  cancelar(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

  createLive(){
    let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();

          // Manipulando a data passada no formulário
    this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveForm.value.liveTime;
          // Manipulando o html do youtube
    this.liveForm.value.liveLink = this.liveForm.controls.liveLink.value.replace('watch?v=','embed/');
    console.log(this.liveForm.value)
    
    // Faz um post passando os itens do formulari
    this.rest.postLives(this.liveForm.value).subscribe();
    this.dialogRef.close();
    this.liveForm.reset();
    if(this.liveForm.valid){
    window.location.reload();
    }
  }

}
