import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  logo: string = '../assets/atos.png';

  @Input() color: string;

  constructor(private router: Router) {}

  changeUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  ngOnInit(): void {}
}
