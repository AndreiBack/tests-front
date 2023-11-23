import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProdutoslistComponent } from './produtoslist.component';

describe('ProdutoslistComponent', () => {
  let component: ProdutoslistComponent;
  let fixture: ComponentFixture<ProdutoslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoslistComponent],
      imports: [HttpClientTestingModule]
      ,schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProdutoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
