import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ProdutosdetailsComponent } from './produtosdetails.component';
import { Produto } from 'src/app/models/produto';

describe('ProdutosdetailsComponent', () => {
  let component: ProdutosdetailsComponent;
  let fixture: ComponentFixture<ProdutosdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosdetailsComponent],
      imports: [HttpClientTestingModule]
      ,schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProdutosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => { 
    let produto = new Produto();
    produto.id = 1;
    produto.nome = 'Pizza';
    produto.valor = 456;
    component.produto = produto;
    fixture.detectChanges(); 
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' @Input test ', () => {
    let element = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(element.nativeElement.ngModel).toEqual('Pizza');
  });
  it(' @Input not null test', () => {
    let element = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(element.nativeElement.ngModel).not.toBe(null);
  });
});
