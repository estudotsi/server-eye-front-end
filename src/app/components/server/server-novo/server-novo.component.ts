import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Server } from 'http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Os } from 'src/app/models/os';
import { Rede, ServerAdd } from 'src/app/models/server';
import { OsService } from 'src/app/services/os.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-server-novo',
  templateUrl: './server-novo.component.html',
  styleUrls: ['./server-novo.component.scss']
})
export class ServerNovoComponent implements OnInit {

  form!: FormGroup;
  server!: ServerAdd;
  oss!: Os[];
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
              private serverService: ServerService,
              private spinner: NgxSpinnerService,
              private service: OsService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.validation();
    this.carregarOs();
    }

    public validation(): void{
      this.form = this.fb.group({
        ip: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        rede: ['',  [Validators.required]],
        osId: ['', [Validators.required]]
      });
    }

    public carregarOs(): void{
      this.service.GetOs().subscribe({
        next: (ossRecebido: Os[]) => {
          this.oss = ossRecebido;
          console.log("Aqui: ", this.oss);
        },
        error: (error: any) => {
          this.spinner.hide();
        },
        complete: () => this.spinner.hide()
      });
    }

    public AddServer(){
      this.server = this.form.value;
      this.spinner.show();
      if(this.form.valid){
        this.serverService.Add(this.server).subscribe({
          next: (data) => {
            console.log("Retor os: ", data);
            this.toastr.success('Servidor salvo com sucesso', 'Sucesso');
            this.router.navigate([ '/server' ]);
          },
          error: (erro: any)=> {
            console.log("Erro os: ", erro);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar o servidor', 'Erro');
          },
          complete: () => {
            this.spinner.hide();
          }
        })
      }
    }

    save(){
      this.AddServer();
    }

  }



