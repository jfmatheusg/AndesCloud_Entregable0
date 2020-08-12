import { Component, OnInit } from '@angular/core';
import {UserSessionService} from '../../services/user-session.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public user: UserSessionService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
  }

}
