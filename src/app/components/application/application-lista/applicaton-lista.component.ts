import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Application } from 'src/app/models/appplication';
import { Server } from 'src/app/models/server';
import { ApplicationService } from 'src/app/services/application.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-applicaton-lista',
  templateUrl: './applicaton-lista.component.html',
  styleUrls: ['./applicaton-lista.component.scss']
})
export class ApplicationListaComponent implements OnInit {

  public apps: Application[] = [];
  public os!: string;
  public appsFiltrados: Application[] =[];
  private filtroListado = '';

  constructor(private service: ApplicationService, private spinner: NgxSpinnerService, private serviceServer: ServerService) { }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.appsFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.apps;
  }

  public filtrarEventos(filtrarPor: string): Application[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.apps.filter(
      apps => apps.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.carregarApp();
  }

  public carregarApp(): void{
    this.service.getApp().subscribe({
      next: (appsRecebidos: Application[]) => {
        this.apps = appsRecebidos;
        this.appsFiltrados = this.apps;
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

  public pesquisarOs(id: number): void{
    this.spinner.show();
    this.serviceServer.getServerById(id).subscribe({
      next: (serverRecebido: Server) => {
        this.os = serverRecebido.os.name;
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

}
