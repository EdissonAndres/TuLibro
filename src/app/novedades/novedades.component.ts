import { Component, OnInit } from '@angular/core';
import { BookService } from './../core/services/book.service';
import { Book } from './../core/models/book.model';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements OnInit {

  categorias: any = ['Novelas', 'Cuentos', 'Drama'];
  booksList!: Book[];
  elemento!: any;

  a!: any;

  constructor(
    private bookService: BookService,
  ) {}

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

}
