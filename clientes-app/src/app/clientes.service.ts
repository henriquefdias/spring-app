import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  salvar(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>('http://localhost:8080/api/clientes', cliente);
  }

  getClientes() : Cliente[] {
    let cliente = new Cliente();
    cliente.id = 1;
    cliente.nome = "Fulano";
    cliente.dataCadastro = '08/12/2021'
    cliente.cpf = '12345678901'
    return [cliente];
  }
}
