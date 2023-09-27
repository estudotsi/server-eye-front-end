import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Db } from 'src/app/models/db';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-db-lista',
  templateUrl: './db-lista.component.html',
  styleUrls: ['./db-lista.component.scss']
})
export class DbListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public dbs: Db[] = [];
  public dbsFiltrados: Db[] = [];
  private filtroListado = '';
  public idDelete!: number;

  constructor(private service: DbService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private router: Router) { }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.dbsFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.dbs;
  }

  public filtrarEventos(filtrarPor: string): Db[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.dbs.filter(
      dbs => dbs.name.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.carregarDb();
  }

  public carregarDb(): void{
    this.service.getDb().subscribe({
      next: (dbsRecebido: Db[]) => {
        this.dbs = dbsRecebido;
        this.dbsFiltrados = this.dbs;
        console.log("Dbs: ", this.dbsFiltrados);
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
  }

  confirm(){
    console.log("Confirmou");
    this.modalRef?.hide();
    this.spinner.show();
    this.service.Delete(this.idDelete).subscribe({
      next: () =>  {
        this.carregarDb();
        this.toastr.success('Banco deletado com sucesso', 'Sucesso');
      },
      error: (erro: any)=> {
        this.toastr.error('Erro ao deletar o Banco', 'Erro');
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }

  decline(): void {
    console.log("Declinou");
    this.modalRef?.hide();
  }

  alterarDb(id: number){
    console.log(id);
    this.router.navigate([`database/detalhe/${id}`]);
  }

}
