import { Component, ElementRef, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Server } from 'src/app/models/server';
import { ServerService } from 'src/app/services/server.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-server-por-rede',
  templateUrl: './server-por-rede.component.html',
  styleUrls: ['./server-por-rede.component.scss']
})
export class ServerPorRedeComponent implements OnInit {

  public receivedRede: string = "";
  public servers: Server[] = [];
  public serversFiltrados: Server[] = [];
  private filtroListado = '';
  public controlData: string = "";

  constructor(private sharedService: SharedService, private service: ServerService, private spinner: NgxSpinnerService) {}

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
    this.receiveData();
    this.spinner.show();
    this.carregarServers();
  }

  public receiveData(){
    this.sharedService.getData().subscribe(data => {
        this.receivedRede = data;
    });
  }

  public carregarServers(): void{
    this.service.getServerByRede(this.receivedRede).subscribe({
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
