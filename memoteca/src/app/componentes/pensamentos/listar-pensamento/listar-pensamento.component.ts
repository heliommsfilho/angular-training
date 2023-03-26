import { Component, OnInit } from '@angular/core';
import {Pensamento} from "../pensamento";
import {PensamentoService} from "../pensamento.service";

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  paginaAtual: number = 1;
  listaPensamentos: Pensamento[] = [];
  haMaisPensamentos: boolean = true;

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual)
      .subscribe((pensamentos) => this.listaPensamentos = pensamentos);
  }

  carregarMais(): void {
    this.service.listar(++this.paginaAtual)
      .subscribe((pensamentos) => {
        this.listaPensamentos.push(...pensamentos);
        this.haMaisPensamentos = !this.listaPensamentos.length;
      })
  }
}
