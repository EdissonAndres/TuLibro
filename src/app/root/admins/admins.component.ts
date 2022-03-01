import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements AfterViewInit  {

  users!: any[];
  elemento!: any;

  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'fechaNacimiento', 'lugarNacimiento', 'direccion', 'genero', 'usuario', 'correo', 'opciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    this.adminService.getUsers()
      .snapshotChanges()
      .subscribe(item => {
        this.users = [];
        item.forEach(element => {
          this.elemento = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          this.elemento['$id'] = element.key;
          this.users.push(this.elemento);
        });
        this.dataSource = new MatTableDataSource(this.users);
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // tslint:disable-next-line: typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agregarAdmin(): void {

  }
}
