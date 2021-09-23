import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LiveService } from 'src/app/shared/service/live.service';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {


  public liveForm!: FormGroup;

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
    // Faz um post passando os itens do formulario
    this.rest.postLives(this.liveForm.value).subscribe();
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
