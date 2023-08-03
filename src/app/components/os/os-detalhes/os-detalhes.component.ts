import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Os } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-detalhes',
  templateUrl: './os-detalhes.component.html',
  styleUrls: ['./os-detalhes.component.scss']
})
export class OsDetalhesComponent implements OnInit {

  form!: FormGroup;
  os!: Os;
  osId!: any;
  imagemUrl = 'assets/upload.png';
  file!: File;
  image: any;
  msgFile!: string;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private activatedRouter: ActivatedRoute,
              private service: OsService,
              private toastr: ToastrService,
              private router: Router) { }

public carregarOs(): void{
  this.osId = this.activatedRouter.snapshot.paramMap.get('id');
  if (this.osId !== null && this.osId !== 0) {
    this.spinner.show();
    this.service.GetOsById(this.osId).subscribe({
      next: (osRecebido: Os) => {
        this.os = {...osRecebido};
        this.form.patchValue(this.os);
        console.log("Aqui os: ", this.os);
        if(this.os.imagemURL !== ''){
          this.imagemUrl = 'https://localhost:7284' + '/resources/images/' + this.os.imagemURL;
        }
      },
      error: (error: any) => {
        this.toastr.error("Erro ao carregar Sistema");
        console.log("Error: ",error);
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }
}

  ngOnInit(): void {
    this.carregarOs();
    this.validation();
  }

  public validation(): void{
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      imageUrl: ['']
    });
  }

  public alterarOs(){
    this.os = this.form.value;
    this.spinner.show();
    if(this.form.valid){
      this.service.UpdateOs(this.os).subscribe({
        next: (os: Os) => {
          console.log("Retor os: ", os);
          this.toastr.success('Sistema atualizado com sucesso', 'Sucesso');
          this.router.navigate([ '/os' ]);
        },
        error: (erro: any)=> {
          console.log("Erro os: ", erro);
          this.spinner.hide();
          this.toastr.error('Erro ao atualizar o sistema', 'Erro');
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }
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
    console.log("Chegou");
    this.spinner.show();
    this.service.postUploadUpdate(this.file, this.os.imagemURL).subscribe({
      next: (data) => {
        this.toastr.success('Imagem atualizada', 'Sucesso');
        location.reload();
        this.router.navigate([ '/os' ]);
      },
      error: (erro: any)=> {
        console.log("Erro os: ", erro);
        this.spinner.hide();
        this.toastr.error('Erro ao atualizar o imagem', 'Erro');
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

}


