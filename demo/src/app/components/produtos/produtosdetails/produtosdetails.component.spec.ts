import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProdutosdetailsComponent } from './produtosdetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Produto } from 'src/app/models/produto';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProdutosdetailsComponent', () => {
  let component: ProdutosdetailsComponent;
  let fixture: ComponentFixture<ProdutosdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProdutosdetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(ProdutosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  beforeEach(() => { //MOCANDO DADOS
    let produto = new Produto();
    produto.id = 1;
    produto.nome = 'Pizza';
    produto.valor = 456;
    component.produto = produto;
    fixture.detectChanges(); //refresh
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Teste @Input - Interpolação1 ', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).toEqual('Pizza');
  });


  it('Teste @Input - Interpolação2', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  
  it('Teste @Input - Interpolação1 ', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputPassword1"]'));
    expect(elemento.nativeElement.ngModel).toEqual(456);
  });

  it('Teste @Input - Interpolação2', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputPassword1"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });


  beforeEach(() => { 
    let produto = new Produto();
    produto.id = 1;
    produto.nome = 'Pizza';
    produto.valor = 456;

    const httpSpy = TestBed.inject(HttpClient)
    spyOn(httpSpy, 'post').and.returnValue(of(produto));
    spyOn(httpSpy, 'put').and.returnValue(of(produto));

    fixture.detectChanges(); 
  });


  it('Teste de @Output() retorno', fakeAsync(() => {
    spyOn(component.retorno, 'emit');
    component.salvar();
    expect(component.retorno.emit).toHaveBeenCalled();
  }));



});