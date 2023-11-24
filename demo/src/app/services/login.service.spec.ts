import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { Login } from '../models/login';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in successfully', () => {
    const mockLogin: Login = { username: 'testuser', password: 'testpassword' };

    service.logar(mockLogin).subscribe(user => {
      expect(user).toBeDefined();
      expect(user.username).toEqual('testuser');
      // Add more expectations as needed
    });

    const req = httpMock.expectOne('http://localhost:8080/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, username: 'testuser', role: 'USER', token: 'xyz' });
  });

  it('should handle login error', () => {
    const mockLogin: Login = { username: 'testuser', password: 'testpassword' };

    service.logar(mockLogin).subscribe(
      user => fail('Expected an error, but received user'),
      error => {
        expect(error).toBeTruthy();
        // Add more expectations as needed
      }
    );

    const req = httpMock.expectOne('http://localhost:8080/api/login');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Login error'));
  });



  // Add more test cases for addToken, removeToken, getToken, and hasPermission
});
