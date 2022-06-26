import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatTabsModule,
      MatPaginatorModule,
      MatExpansionModule,
      MatMenuModule,
      FormsModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatDialogModule,
      MatAutocompleteModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatCardModule,
      MatSlideToggleModule,
      MatSliderModule,
      MatSnackBarModule,
      MatStepperModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatSelectModule,
      MatFormFieldModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatChipsModule,
      MatTooltipModule,
      MatTabsModule,
      MatTableModule,
      MatPaginatorModule,
      MatExpansionModule,
      MatMenuModule,
      FormsModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatDialogModule,
      MatAutocompleteModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatCardModule,
      MatNativeDateModule,
      MatSlideToggleModule,
      MatSliderModule,
      MatSnackBarModule,
      MatStepperModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatSelectModule,
      MatFormFieldModule
   ],
   providers: [
      MatDatepickerModule,
      {
         provide: MAT_RADIO_DEFAULT_OPTIONS,
         useValue: { color: 'primary' },
      },
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
      {
         provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
         useValue: { color: 'primary' },
      }
   ]
})

export class AngularMaterialModule { }
