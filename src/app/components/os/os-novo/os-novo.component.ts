import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-novo',
  templateUrl: './os-novo.component.html',
  styleUrls: ['./os-novo.component.scss']
})
export class OsNovoComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private service: OsService) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void{
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  public AddOs(){
    this.spinner.show();
    this.service.Add(this.form.value).subscribe({
      next:
    })
  }

}
