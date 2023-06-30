import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Server } from 'src/app/models/server';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-server-lista',
  templateUrl: './server-lista.component.html',
  styleUrls: ['./server-lista.component.scss']
})
export class ServerListaComponent implements OnInit {

  public servers: Server[] = [];
  public serversFiltrados: Server[] = [];
  private filtroListado = '';

  constructor(private service: ServerService, private spinner: NgxSpinnerService) { }

  public get filtroLista(): string{
    return this.filtroListado;
  }

  public set filtroLista(value: string){
    this.filtroListado = value;
    this.serversFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.servers;
  }

  public filtrarEventos(filtrarPor: string): Server[]{{
    filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.servers.filter(
      servers => servers.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    this.carregarServers();
  }

  public carregarServers(): void{
    this.service.getServer().subscribe({
      next: (serversRecebidos: Server[]) => {
        this.servers = serversRecebidos;
        this.serversFiltrados = this.servers;
        console.log("Aqui: ", serversRecebidos)
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

}
