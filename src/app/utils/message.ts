import { OnInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-snackBarOverviewExample',
})

export class SnackBarOverviewExample implements OnInit {

    constructor(public snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            panelClass: (action !== 'Error') ? ['blue-snackbar'] : ['red-snackbar']
        });
    }
    ngOnInit() { }
}
