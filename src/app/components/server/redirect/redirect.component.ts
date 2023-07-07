import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
})
export class RedirectComponent implements OnInit {

  receivedRede!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['server-por-rede']);

  }

}
