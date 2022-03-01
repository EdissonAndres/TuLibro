import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-header-root',
  templateUrl: './header-root.component.html',
  styleUrls: ['./header-root.component.scss']
})
export class HeaderRootComponent implements OnInit {

  user$: Observable<any> = this.userService.af.user;
  correo!: any;
  User!: any;

  constructor(
    private userService: UsersService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user$.subscribe(result => this.observabledata(result.email));
  }

  ngOnInit(): void {
  }

  observabledata(datos: any): void {
    this.correo = datos;
    this.userService.firebase.database.ref('/users').orderByChild('correo').equalTo(this.correo).on('child_added', (snapshot): any => {
      this.User = (snapshot.val());
      this.ngZone.run(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.router.url]);
        });
      });
    });
  }

  // tslint:disable-next-line: typedef
  logOut(){
    this.userService.logout().then(() => {
      this.router.navigate(['/novedades']);
    });
  }

}
