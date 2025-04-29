import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private users: any[] = [];

  constructor() {
    // Verificar se existem usuários armazenados no localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // Simular chamada de API
    return of(this.checkCredentials(email, password)).pipe(delay(800));
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    // Verificar se o email já está em uso
    const emailExists = this.users.some((user) => user.email === email);

    if (emailExists) {
      return of(false).pipe(delay(800));
    }

    // Adicionar novo usuário
    const newUser = { name, email, password };
    this.users.push(newUser);

    // Salvar usuários no localStorage
    localStorage.setItem('users', JSON.stringify(this.users));

    return of(true).pipe(delay(800));
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  private checkCredentials(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    const isValid = !!user;

    if (isValid) {
      this.isAuthenticated.next(true);
    }

    return isValid;
  }
}
