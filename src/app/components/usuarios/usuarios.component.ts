import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios.model';
import { UsuariosService } from '../../services/usuarios.service';
import { SnackBarOverviewExample } from '../../utils/message';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [
    UsuariosService, SnackBarOverviewExample
  ]
})
export class UsuariosComponent implements OnInit {

  public inscription = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dateCreated: new FormControl(''),
    email: new FormControl(''),
    status: new FormControl('')
  })
  public users = new Usuarios();
  public loader = false;

  constructor(public router: Router,
    public usuariosService: UsuariosService,
    public messageService: SnackBarOverviewExample) { }

  ngOnInit() {
  }

  // Retorna al home
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Guarda nuevos usuarios en BD
  saveUser(user: Usuarios) {
    this.loader = true;
    this.usuariosService.saveUsers(user).subscribe(res => {
      this.loader = false;
      this.showMessage('El usuario se registro exitosamente', 'Correcto');
      this.inscription.reset();
    }, err => {
      this.loader = false;
      this.showMessage('Error al guardar el usuario', 'Error');
      return err;
    })
  }

  // Muestra los mensajes de confirmación
  showMessage(message: string, status: string) {
    setTimeout(() => {
      this.messageService.openSnackBar(message, status)
    }, 100);
  }

}
