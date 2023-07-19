import { Component, OnInit } from '@angular/core';
import { Os } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.scss']
})
export class OsComponent implements OnInit {

  public oss: Os[] = [];

  constructor(private service: OsService, private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {

  }

}
