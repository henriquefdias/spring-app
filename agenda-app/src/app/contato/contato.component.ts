import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas: String[] = ['foto', 'id', 'nome', 'email', 'favorito'];

  totalElementos: number = 0;
  pagina: number = 0;
  tamanho: number = 1;
  pageSizeOptions: number[] = [1]

  constructor(
    private service: ContatoService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
   }

  ngOnInit(): void {
    this.listarContatos(this.pagina, this.tamanho);
  }
  
  listarContatos(pagina: any = 0, tamanho: any = 10): void {
    this.service.list(pagina, tamanho).subscribe(response => {
      this.contatos = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    })
  }

  favoritar(contato: Contato): void {
    this.service.favourite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })

  }

  submit(){
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email)
    this.service.save(contato).subscribe(resposta => {
      let lista: Contato[] = [...this.contatos, resposta]
      this.contatos = lista;
    })
  }

  uploadFoto(event: any, contato: Contato){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
          .upload(contato, formData)
          .subscribe(response => this.listarContatos());
    }
  }

  visualizarContato(contato: Contato): void {
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    })
  }

  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho)
  }

}
