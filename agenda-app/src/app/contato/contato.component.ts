import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas: String[] = ['id', 'nome', 'email', 'favorito'];

  constructor(
    private service: ContatoService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
   }

  ngOnInit(): void {
    this.listarContatos();
  }
  
  listarContatos(): void {
    this.service.list().subscribe(response => {
      this.contatos = response;
    })
  }

  favoritar(contato: Contato): void{
    this.service.favourite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    })

  }

  submit(){
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email)
    this.service.save(contato).subscribe(resposta => {
      this.contatos.push(resposta);
      console.log(this.contatos);
    })
  }

}
