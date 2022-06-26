import { DialogRef } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../dialogs/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';


@Injectable({ providedIn: 'root' })
export class DialogService {

    constructor(private dialog: MatDialog) { }

    alert(message: string): MatDialogRef<any> {
        return this.dialog.open(AlertDialogComponent, {
            width: 'auto',
            height: 'auto',
            data: message
        });
    }

    confirmation(message: string): MatDialogRef<any> {
        return this.dialog.open(ConfirmationDialogComponent, {
            width: 'auto',
            height: 'auto',
            data: message
        });
    }
}
