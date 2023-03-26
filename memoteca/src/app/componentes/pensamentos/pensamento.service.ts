import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pensamento} from "./pensamento";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API_URL = 'http://localhost:3000';
  private readonly PENSAMENTOS_RESOURCE = `${this.API_URL}/pensamentos`;

  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string, somenteFavoritos: boolean): Observable<Pensamento[]> {
    const itensPagina = 3;

    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensPagina)

    if (filtro.trim().length > 3) {
      params = params.set('q', filtro);
    }

    if (somenteFavoritos) {
      params = params.set('favorito', true);
    }

    return this.http.get<Pensamento[]>(`${this.PENSAMENTOS_RESOURCE}`, { params });
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(`${this.PENSAMENTOS_RESOURCE}`, pensamento);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    return this.http.get<Pensamento>(`${this.PENSAMENTOS_RESOURCE}/${id}`);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.put<Pensamento>(`${this.PENSAMENTOS_RESOURCE}/${pensamento.id}`, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    return this.http.delete<Pensamento>(`${this.PENSAMENTOS_RESOURCE}/${id}`);
  }
}
