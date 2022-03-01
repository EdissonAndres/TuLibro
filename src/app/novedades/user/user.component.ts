import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  booksList!: Book[];
  elemento!: any;

  user$: Observable<any> = this.userService.af.user;
  correo!: any;
  User!: any;

  constructor(
    private bookService: BookService,
    private userService: UsersService,
    private router: Router
  ) {
    this.user$.subscribe(result => this.observabledata(result.email));
   }

  ngOnInit(): void {
    this.bookService.getBooks()
    .snapshotChanges()
    .subscribe(item => {
      this.booksList = [];
      item.forEach(element => {
        this.elemento = element.payload.toJSON();
        // tslint:disable-next-line: no-string-literal
        this.elemento['$id'] = element.key;
        this.booksList.push(this.elemento as Book);
      });
    });
  }

  suscribe(): void{
    alert('Subscripcion exitosa!\nAhora ya podras recivir en primicia las ultimas novedades de Tu Libro');
  }

  observabledata(datos: any): void {
    this.correo = datos;
    this.userService.firebase.database.ref('/users').orderByChild('correo').equalTo(this.correo).on('child_added', (snapshot): any => {
      this.User = (snapshot.val());
    });
  }

}
