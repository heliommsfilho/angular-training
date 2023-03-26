import {Component, OnInit} from '@angular/core';
import {Pensamento} from "../pensamento";
import {PensamentoService} from "../pensamento.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  paginaAtual: number = 1;
  listaPensamentos: Pensamento[] = [];
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(
    private service: PensamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => this.listaPensamentos = pensamentos);
  }

  carregarMais(): void {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.listaPensamentos.push(...pensamentos);
        this.haMaisPensamentos = !this.listaPensamentos.length;
      })
  }

  pesquisar(): void {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(pensamentos => this.listaPensamentos = pensamentos);
  }

  recarregarComponente(): void {
    this.favoritos = false;
    this.paginaAtual = 1;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  listarFavoritos(): void {
    this.titulo = 'Meus Favoritos';
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.favoritos = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(favoritos => {
        this.listaPensamentos = favoritos;
        this.listaFavoritos = favoritos;
      });
  }
}
