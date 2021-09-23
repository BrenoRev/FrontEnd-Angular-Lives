import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivesRoutingModule } from './lives-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocalDateTimePipe } from 'src/app/shared/pipe/local-date-time.pipe';
import { LiveFormDialogComponent } from './home/live-form-dialog/live-form-dialog.component';
import { LiveListComponent } from './home/live-list/live-list.component';

@NgModule({
  declarations: [HomeComponent, LiveListComponent, LiveFormDialogComponent, LocalDateTimePipe],
  imports: [
    CommonModule,
    LivesRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,

    ],
  providers: [
    LocalDateTimePipe
  ]
})
export class LivesModule { }
