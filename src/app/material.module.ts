import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyOptionModule as MatOptionModule } from "@angular/material/legacy-core";
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }