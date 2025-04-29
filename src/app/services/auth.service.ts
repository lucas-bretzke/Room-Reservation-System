import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5133/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private readonly TOKEN_NAME = 'auth_token';

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.checkToken();
  }

  private checkToken(): void {
    const token = this.cookieService.get(this.TOKEN_NAME);
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        // Check if token is expired
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (!isExpired) {
          const user: User = {
            id: Number(decodedToken.nameid),
            name: decodedToken.name,
            email: decodedToken.email,
          };

          this.currentUserSubject.next(user);
          console.log('User information from token:', user);
        } else {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            // Set secure cookie that expires in 24 hours (matching token expiration)
            const expiresIn = new Date();
            expiresIn.setDate(expiresIn.getDate() + 1); // 24 hours from now

            this.cookieService.set(
              this.TOKEN_NAME,
              response.token,
              expiresIn,
              '/',
              undefined,
              true, // secure flag
              'Strict' // sameSite policy
            );

            const decodedToken: any = jwtDecode(response.token);
            const user: User = {
              id: Number(decodedToken.nameid),
              name: decodedToken.name,
              email: decodedToken.email,
            };
            this.currentUserSubject.next(user);
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, { name, email, password })
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  logout(): void {
    this.cookieService.delete(this.TOKEN_NAME, '/');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check(this.TOKEN_NAME);
  }

  getToken(): string {
    return this.cookieService.get(this.TOKEN_NAME);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }
}
