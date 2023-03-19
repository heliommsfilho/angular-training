import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pensamento} from "./pensamento";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API_URL = 'http://localhost:3000';
  private readonly PENSAMENTOS_RESOURCE = `${this.API_URL}/pensamentos`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(`${this.PENSAMENTOS_RESOURCE}`);
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

  excluir(id: number): Observable<Pensamento> {
    return this.http.delete<Pensamento>(`${this.PENSAMENTOS_RESOURCE}/${id}`);
  }
}
