import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DbAdd } from 'src/app/models/db';
import { Os } from 'src/app/models/os';
import { Server } from 'src/app/models/server';
import { DbService } from 'src/app/services/db.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-db-novo',
  templateUrl: './db-novo.component.html',
  styleUrls: ['./db-novo.component.scss']
})
export class DbNovoComponent implements OnInit {

  form!: FormGroup;
  db!: DbAdd;
  server!: Server[];

  constructor(private fb: FormBuilder,
              private serverService: ServerService,
              private spinner: NgxSpinnerService,
              private dbService: DbService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.validation();
    this.carregarServer();
    }

    public validation(): void{
      this.form = this.fb.group({
        ip: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        serverId: ['',  [Validators.required]]
      });
    }

    public carregarServer(): void{
      this.serverService.getServer().subscribe({
        next: (serverRecebido: Server[]) => {
          this.server = serverRecebido;
          console.log("Aqui: ", this.server);
        },
        error: (error: any) => {
          this.spinner.hide();
        },
        complete: () => this.spinner.hide()
      });
    }

    public AddDb(){
      this.db = this.form.value;
      this.spinner.show();
      if(this.form.valid){
        this.dbService.Add(this.db).subscribe({
          next: (data) => {
            console.log("Retor db: ", data);
            this.toastr.success('Banco salvo com sucesso', 'Sucesso');
            this.router.navigate([ '/database' ]);
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
      this.AddDb();
    }

}
