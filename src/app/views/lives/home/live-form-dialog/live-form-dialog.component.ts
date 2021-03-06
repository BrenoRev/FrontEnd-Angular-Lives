import { identifierModuleUrl } from '@angular/compiler';
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
  static id: Number = 0;
  public acess: Number = LiveFormDialogComponent.id;
  constructor(public dialogRef: MatDialogRef<LiveFormDialogComponent>,
              public fb: FormBuilder,
              public rest: LiveService) { }

  ngOnInit(): void {
      LiveFormDialogComponent.id = 0;
      this.liveForm = this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
    })
    
  }

  cancelar(): void {
    LiveFormDialogComponent.id = 0;
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
    
    if(LiveFormDialogComponent.id != 0){
      this.liveForm.value.id = LiveFormDialogComponent.id;
      this.rest.updateLives(this.liveForm.value.id, this.liveForm.value).subscribe();
      LiveFormDialogComponent.id = 0;
    }else{
      // Faz um post passando os itens do formulario
      this.rest.postLives(this.liveForm.value).subscribe();
      LiveFormDialogComponent.id = 0;
    }

    this.dialogRef.close();
    this.liveForm.reset();
    window.location.reload();
  }

}
