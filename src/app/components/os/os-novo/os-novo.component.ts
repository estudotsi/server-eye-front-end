import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Os } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-novo',
  templateUrl: './os-novo.component.html',
  styleUrls: ['./os-novo.component.scss']
})
export class OsNovoComponent implements OnInit {

  form!: FormGroup;
  os!: Os;
  imagemPath = 'assets/upload.png';
  file!: File;
  image: any;
  msgFile!: string;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private service: OsService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      imagemURL: ['', [Validators.required]]
    });
  }

  public AddOs(){
    this.os = this.form.value;
    this.os.imagemURL = this.file.name;
    this.spinner.show();
    if(this.form.valid){
      this.service.Add(this.os).subscribe({
        next: (os: Os) => {
          console.log("Retor os: ", os);
          this.toastr.success('Sistema salvo com sucesso', 'Sucesso');
          this.router.navigate([ '/os' ]);
        },
        error: (erro: any)=> {
          console.log("Erro os: ", erro);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar o sistema', 'Erro');
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }
  }

  uploadImagem(): void {
    this.spinner.show();
    this.service.postUpload(this.file).subscribe(
      () => {
      },
      (error: any) => {
        this.toastr.error('Erro ao fazer upload de imagem', 'Erro!');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }

  onFileChange(ev: any): void {
    this.msgFile = "";
    const reader = new FileReader();
    reader.onload = (event: any) => this.image = event.target.result;
    this.file = ev.target.files[0];

    if (this.file && this.file.type !== 'image/svg+xml') {
      this.form.reset();
      this.msgFile = "Arquivo inválido, soment .svg";
      return;
    }

    reader.readAsDataURL(this.file);
    this.searchFile(this.file.name)
  }

  searchFile(nomeArquivo: string){
    this.service.SearchImage(nomeArquivo).subscribe({
      next: (data: any) => {
        console.log("Searchfile", data);
      },
      error: (erro: any)=> {
        console.log("Erro os: ", erro);
        this.spinner.hide();
        this.form.reset();
        this.toastr.error('Troque o nome do arquivo', 'Erro');
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }

  save(){
    this.uploadImagem();
    this.AddOs();
  }

}
