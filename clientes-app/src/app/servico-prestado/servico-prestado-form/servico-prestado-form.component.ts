import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../clientes.service';
import { ServicoPrestadoService } from '../../servico-prestado.service';
import { Cliente } from '../../clientes/cliente';
import { ServicoPrestado } from '../servico-prestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes : Cliente[] = []
  servico: ServicoPrestado

  constructor(
    private clientesService: ClientesService,
    private service: ServicoPrestadoService
  ) {
    this.servico = new ServicoPrestado();
   }

  ngOnInit(): void {
    this.clientesService
      .getClientes()
      .subscribe(response => this.clientes = response)
  }

  onSubmit(): void {
    this.service
      .salvar(this.servico)
      .subscribe(response => {
        console.log(response);
      })
  }
}
