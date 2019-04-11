import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TareasService } from '../../services/tareas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { SnackBarOverviewExample } from '../../utils/message';
import { Tareas } from '../../models/tareas.model';
import * as _moment from 'moment';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
  providers: [
    TareasService, UsuariosService, SnackBarOverviewExample
  ]
})
export class TareasComponent implements OnInit {

  public tareas = 'Registrar';
  public listUsers: any;
  public tasks = new Tareas();
  public tasksList: Tareas[];
  public inscription = new FormGroup({
    description: new FormControl(''),
    dateExecution: new FormControl(''),
    userId: new FormControl(''),
    status: new FormControl('')
  });
  public loader = false;
  public displayedColumns: string[] = ['Id', 'Description', 'DateExcecution', 'Status', 'User'];
  public dataSource: MatTableDataSource<Tareas>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public router: Router,
    public params: ActivatedRoute,
    public tareasService: TareasService,
    public usuariosService: UsuariosService,
    public messageService: SnackBarOverviewExample) { }

  // Metodo que trae todas las tareas registradas
  getAllTasksComponent() {
    this.tareasService.getAllTasks().subscribe(res => {
      res.forEach(e => {
        (e.estado) ? e.estado = 'Activo' : e.estado = 'Inactivo';
        e.fechaEjecucion = _moment(e.fechaEjecucion).format('DD/MM/YYYY');
        e['email'] = e.usuarioId.email;
      });
      this.tasksList = res;
      this.dataSource = new MatTableDataSource(this.tasksList);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.error(err);
    });
  }

  // Metodo que trae todos los usuarios registrados
  getAllUsersComponent() {
    this.usuariosService.getAllUsers().subscribe(res => {
      this.listUsers = res;
    }, err => {
      console.error(err);
    });
  }


  ngOnInit() {
    this.getAllTasksComponent();
    this.getAllUsersComponent();
    (this.getParams() === 'resgistrar') ? this.tareas = 'Registrar' : this.tareas = 'Listado';
  }

  // Retorna los parametros para mostrar listado o registro de tareas
  getParams(): string {
    return this.params.snapshot.paramMap.get('action');
  }

  // Retorna al home
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Guarda nuevas tareas en BD
  saveTasks(tarea: Tareas) {
    this.loader = true;
    this.tareasService.saveTasks(tarea).subscribe(res => {
      this.loader = false;
      this.showMessage('La tarea se registro exitosamente', 'Correcto');
      this.inscription.reset();
    }, err => {
      this.loader = false;
      this.showMessage('Error al guardar la tarea', 'Error');
      return err;
    })
  }

  // Metodo para filtrar por todos los parametros(Usuario, Fecha y estado)
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  // Muestra los mensajes de confirmación
  showMessage(message: string, status: string) {
    setTimeout(() => {
      this.messageService.openSnackBar(message, status)
    }, 100);
  }

}
