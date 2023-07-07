import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private sharedService: SharedService, private router: Router) { }

  sendData(rede: string){
    const data = rede;
    this.sharedService.setData(data);
  }

  ngOnInit(): void {
  }

}
