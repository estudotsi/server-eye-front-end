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
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  public AddOs(){
    this.os = this.form.value;
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

}
