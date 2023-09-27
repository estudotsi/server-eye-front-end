import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Db } from 'src/app/models/db';
import { Server } from 'src/app/models/server';
import { DbService } from 'src/app/services/db.service';
import { ToastrService } from 'ngx-toastr';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-db-detalhe',
  templateUrl: './db-detalhe.component.html',
  styleUrls: ['./db-detalhe.component.scss']
})
export class DbDetalheComponent implements OnInit {

  form!: FormGroup;
  db!: Db;
  dbId!: any;
  server!: Server[];

  constructor(private spinner: NgxSpinnerService,
              private activatedRouter: ActivatedRoute,
              private dbService: DbService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private serverService: ServerService,
              private router: Router) { }

  ngOnInit(): void {
    this.carregarDb();
    this.validation();
    this.carregarServer();
  }

  public validation(): void{
    this.form = this.fb.group({
      id: [''],
      ip: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      serverId: ['',  [Validators.required]]
    });
  }


  carregarDb(): void{
    this.dbId = this.activatedRouter.snapshot.paramMap.get('id');
    if (this.dbId !== null && this.dbId !== 0) {
      this.spinner.show();
      this.dbService.getDbById(this.dbId).subscribe({
        next: (dbRecebido: Db) => {
          this.db = {...dbRecebido};
          console.log("Aqui db: ", this.db);
          this.form.patchValue(this.db);
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

  public alterarDb(){
    this.db = this.form.value;
    this.spinner.show();
    if(this.form.valid){
      this.dbService.UpdateDb(this.db).subscribe({
        next: (db: Db) => {
          console.log("Retor db: ", db);
          this.toastr.success('Banco atualizado com sucesso', 'Sucesso');
          this.router.navigate([ '/database' ]);
        },
        error: (erro: any)=> {
          console.log("Erro server: ", erro);
          this.spinner.hide();
          this.toastr.error('Erro ao atualizar o banco', 'Erro');
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }
  }

}
