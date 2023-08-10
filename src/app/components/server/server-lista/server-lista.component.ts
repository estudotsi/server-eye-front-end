import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Server } from 'src/app/models/server';
import { ServerService } from 'src/app/services/server.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-server-lista',
  templateUrl: './server-lista.component.html',
  styleUrls: ['./server-lista.component.scss']
})
export class ServerListaComponent implements OnInit {

  public servers: Server[] = [];
  public serversFiltrados: Server[] = [];
  private filtroListado = '';
  modalRef?: BsModalRef;
  public idDelete!: number;

  constructor(private service: ServerService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private modalService: BsModalService,
              private toastr: ToastrService,) { }

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
    this.router.navigate(['/server'])
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

  openModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.idDelete = id;
    console.log("Delete id: ", this.idDelete);
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.service.Delete(this.idDelete).subscribe({
      next: () =>  {
        this.carregarServers();
        this.toastr.success('Servidor deletado com sucesso', 'Sucesso');
      },
      error: (erro: any)=> {
        this.toastr.error('Erro ao deletar o sistema', 'Erro');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }

  decline(): void {
    this.modalRef?.hide();
  }

  alterarServer(id: number): void{
    console.log(id);
    this.router.navigate([`server/detalhe/${id}`]);
  }

}
