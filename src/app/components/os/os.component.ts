import { Component, OnInit } from '@angular/core';
import { Os } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.scss']
})
export class OsComponent implements OnInit {

  public oss: Os[] = [];

  constructor(private service: OsService) { }

  ngOnInit(): void {
    this.carregarOs();
  }

  public carregarOs(): void{
    this.service.getOs().subscribe({
      next: (ossRecebido: Os[]) => {
        console.log(this.oss = ossRecebido);
      },
      error: (error: any) => {
        console.log("Erro: ", error);
      },
      complete: () =>(console.log("Completou"))
    });
  }

}
