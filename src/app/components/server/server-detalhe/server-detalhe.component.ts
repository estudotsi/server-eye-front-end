import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Os } from 'src/app/models/os';
import { Rede, Server } from 'src/app/models/server';
import { OsService } from 'src/app/services/os.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-server-detalhe',
  templateUrl: './server-detalhe.component.html',
  styleUrls: ['./server-detalhe.component.scss']
})
export class ServerDetalheComponent implements OnInit {

  form!: FormGroup;
  server!: Server;
  serverId!: any;
  os!: Os[];
  rede: Rede[] = [
    {
      nomeRede: 'Sutic'
    },
    {
      nomeRede: 'Interna'
    },
    {
      nomeRede: 'Sutic Antiga'
    }
];

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private activatedRouter: ActivatedRoute,
              private osService: OsService,
              private serverService: ServerService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.carregarServer();
    this.validation();
    this.carregarOs();
  }

  public validation(): void{
    this.form = this.fb.group({
      id: [''],
      ip: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      rede: ['',  [Validators.required]],
      osId: ['', [Validators.required]]
    });
  }

  public carregarServer(): void{
    this.serverId = this.activatedRouter.snapshot.paramMap.get('id');
    if (this.serverId !== null && this.serverId !== 0) {
      this.spinner.show();
      this.serverService.getServerById(this.serverId).subscribe({
        next: (serverRecebido: Server) => {
          this.server = {...serverRecebido};
          this.form.patchValue(this.server);
          console.log("Aqui os: ", this.server);
        },
        error: (error: any) => {
          this.toastr.error("Erro ao carregar servidor");
          console.log("Error: ",error);
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }
  }

  public carregarOs(): void{
    this.osService.GetOs().subscribe({
      next: (ossRecebido: Os[]) => {
        this.os = ossRecebido;
        console.log("Aqui: ", this.os);
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

  public alterarServer(){
    this.server = this.form.value;
    this.spinner.show();
    if(this.form.valid){
      this.serverService.UpdateServer(this.server).subscribe({
        next: (server: Server) => {
          console.log("Retor os: ", server);
          this.toastr.success('Servidor atualizado com sucesso', 'Sucesso');
          this.router.navigate([ '/server' ]);
        },
        error: (erro: any)=> {
          console.log("Erro server: ", erro);
          this.spinner.hide();
          this.toastr.error('Erro ao atualizar o sistema', 'Erro');
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }
  }

}
