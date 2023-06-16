import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() titulo!: string;
  @Input() iconClass = "bi bi-speedometer";
  @Input() subtitulo = 'Server Eye';
  @Input() botaoListar = false;

  constructor() { }

  ngOnInit(): void {}

  listar(): void {

  }

}

