import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Os } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';
import { SharedService } from 'src/app/services/shared.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os-lista',
  templateUrl: './os-lista.component.html',
  styleUrls: ['./os-lista.component.scss']
})
export class OsListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public oss: Os[] = [];
  public ossFiltrados: Os[] = [];
  private filtroListado = '';
  public idDelete!: number;

  constructor(private sharedService: SharedService,
              private service: OsService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private router: Router) { }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.ossFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.oss;
  }

  public filtrarEventos(filtrarPor: string): Os[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.oss.filter(
      oss => oss.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.carregarOs();
  }

  public carregarOs(): void{
    this.service.getOs().subscribe({
      next: (ossRecebido: Os[]) => {
        this.oss = ossRecebido;
        this.ossFiltrados = this.oss;
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

  sendData(button: boolean){
    const data = button;
    this.sharedService.setData(data);
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.idDelete = id;
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.service.Delete(this.idDelete).subscribe({
      next: () =>  {
        this.carregarOs();
        this.toastr.success('Sistema deletado com sucesso', 'Sucesso');
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

}
