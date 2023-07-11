import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() titulo!: string;
  @Input() iconClass = "bi bi-speedometer";
  @Input() subtitulo = 'Server Eye';

  public botaoListar: any = false;

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.receiveData();
    this.botaoListar = false;
  }

  public receiveData(){
    this.sharedService.getData().subscribe(data => {
        this.botaoListar = data;
        console.log("teste: ", this.botaoListar);
    });
  }

  listar(): void {
    this.botaoListar = false;
    this.router.navigate([`/os/lista`]);
  }

}

