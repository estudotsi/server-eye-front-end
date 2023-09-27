import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Application } from 'src/app/models/appplication';
import { Db } from 'src/app/models/db';
import { Server, ServerAdd } from 'src/app/models/server';
import { ApplicationService } from 'src/app/services/application.service';
import { DbService } from 'src/app/services/db.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-application-novo',
  templateUrl: './application-novo.component.html',
  styleUrls: ['./application-novo.component.scss']
})
export class ApplicationNovoComponent implements OnInit {

  form!: FormGroup;
  app!: Application
  server!: Server[];
  database!: Db[];

  constructor(private fb: FormBuilder,
    private serverService: ServerService,
    private spinner: NgxSpinnerService,
    private dbService: DbService,
    private toastr: ToastrService,
    private router: Router,
    private appService: ApplicationService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.validation();
    this.carregarServer();
    this.carregarDb();
  }

  public validation(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      serverId: ['',  [Validators.required]],
      dbId: ['',  [Validators.required]],
    });
  }

  public carregarServer(): void{
    this.serverService.getServer().subscribe({
      next: (serverRecebido: any[]) => {
        this.server = serverRecebido;
        console.log("Aqui: ", this.server);
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

  public carregarDb(): void{
    this.dbService.getDb().subscribe({
      next: (dbRecebido: any[]) => {
        this.database = dbRecebido;
        console.log("Aqui: ", this.database);
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

  public AddApp(){
    this.app = this.form.value;
    this.spinner.show();
    if(this.form.valid){
      this.appService.Add(this.app).subscribe({
        next: (data) => {
          console.log("Retor app: ", data);
          this.toastr.success('Aplicação salva com sucesso', 'Sucesso');
          this.router.navigate([ '/application' ]);
        },
        error: (erro: any)=> {
          console.log("Erro os: ", erro);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar a aplicação', 'Erro');
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }
  }



  save(){
    this.AddApp();
  }

}

