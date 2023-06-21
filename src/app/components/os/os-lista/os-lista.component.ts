import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Os } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-lista',
  templateUrl: './os-lista.component.html',
  styleUrls: ['./os-lista.component.scss']
})
export class OsListaComponent implements OnInit {

  public oss: Os[] = [];
  public ossFiltrados: Os[] = [];
  private filtroListado = '';

  constructor(private service: OsService, private spinner: NgxSpinnerService,) { }

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
        this.spinner.hide();;
      },
      complete: () => this.spinner.hide()
    });
  }

}
