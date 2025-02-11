import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpInterceptorService } from './http-interceptor.service';

describe('InterceptorService', () => {
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
        { provide: Router, useValue: routerSpy }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpController.verify();
  });

  it('deve adicionar o cabeçalho de autorização se o token estiver presente', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
  
    httpClient.get('/data').subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const httpRequest = httpController.expectOne('/data');
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearerfake-token');
  
    httpRequest.flush({ data: 'test data' });
  });

  it('deve redirecionar para login em caso de erro 401', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    spyOn(window, 'alert');
  
    httpClient.get('/data').subscribe({
      next: () => fail('deve ter falhado com um erro 401'),
      error: (error) => expect(error).toBeTruthy()
    });
  
    const httpRequest = httpController.expectOne('/data');
    httpRequest.flush('', { status: 401, statusText: 'Unauthorized' });
  
    expect(window.alert).toHaveBeenCalledWith('401 - tratar');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('deve mostrar um alerta em caso de erro 403', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    spyOn(window, 'alert');
  
    httpClient.get('/data').subscribe({
      next: () => fail('deve ter falhado com um erro 403'),
      error: (error) => expect(error).toBeTruthy()
    });
  
    const httpRequest = httpController.expectOne('/data');
    httpRequest.flush('', { status: 403, statusText: 'Forbidden' });
  
    expect(window.alert).toHaveBeenCalledWith('403 - tratar');
  });

});