import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Db } from 'src/app/models/db';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-db-lista',
  templateUrl: './db-lista.component.html',
  styleUrls: ['./db-lista.component.scss']
})
export class DbListaComponent implements OnInit {

  public dbs: Db[] = [];
  public dbsFiltrados: Db[] = [];
  private filtroListado = '';

  constructor(private service: DbService, private spinner: NgxSpinnerService) { }

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
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

}
