import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

import { Book } from './../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookList!: AngularFireList<any>;
  selectedBook!: Book;

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  // tslint:disable-next-line: typedef
  getBooks() {
    return this.bookList = this.firebase.list('/books');
  }

  // tslint:disable-next-line: typedef
  addBook(book: Book) {
    this.bookList.push({
      $id: book.$id,
      titulo: book.titulo,
      autor: book.autor,
      genero: book.genero,
      añoPublicacion: book.añoPublicacion,
      paginas: book.paginas,
      editorial: book.editorial,
      issn: book.issn,
      idioma: book.idioma,
      fechaPublicacion: book.fechaPublicacion,
      estado: book.estado,
      precio: book.precio,
      image: book.image,
    });
  }

  // tslint:disable-next-line: typedef
  updateBook(book: Book){
    this.bookList.update(book.$id, {
      $id: book.$id,
      titulo: book.titulo,
      autor: book.autor,
      genero: book.genero,
      añoPublicacion: book.añoPublicacion,
      paginas: book.paginas,
      editorial: book.editorial,
      issn: book.issn,
      idioma: book.idioma,
      fechaPublicacion: book.fechaPublicacion,
      estado: book.estado,
      precio: book.precio,
      image: book.image,
    });
  }

  // tslint:disable-next-line: typedef
  deleteBook($id: string){
    this.bookList.remove($id);
  }
}
