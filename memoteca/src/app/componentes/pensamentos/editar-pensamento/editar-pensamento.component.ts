import {Component, OnInit} from '@angular/core';
import {Pensamento} from "../pensamento";
import {PensamentoService} from "../pensamento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null, [Validators.required]],
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      modelo: ['modelo1', [Validators.required]],
      favorito: [false]
    });

    const id = this.route.snapshot.paramMap.get('id');

    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario.get('id')?.setValue(id);
      this.formulario.get('conteudo')?.setValue(pensamento.conteudo);
      this.formulario.get('autoria')?.setValue(pensamento.autoria);
      this.formulario.get('modelo')?.setValue(pensamento.modelo);
      this.formulario.get('favorito')?.setValue(pensamento.favorito);
    });
  }

  editarPensamento() {
    let pensamento: Pensamento = {
      id: this.formulario.get('id')?.value,
      conteudo: this.formulario.get('conteudo')?.value,
      autoria: this.formulario.get('autoria')?.value,
      modelo: this.formulario.get('modelo')?.value,
      favorito: this.formulario.get('favorito')?.value
    };

    this.service.editar(pensamento).subscribe(() => this.router.navigate(['listarPensamento']));
  }

  cancelar() {
    this.router.navigate(['listarPensamento']);
  }

  habilitarBotao(): string {
    return this.formulario.valid ? 'botao' : 'botao__desabilitado';
  }
}
