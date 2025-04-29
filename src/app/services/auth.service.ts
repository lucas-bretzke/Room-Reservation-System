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
    // Check if there are any stored users in localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // Simulate API call
    return of(this.checkCredentials(email, password)).pipe(delay(800));
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    // Check if user already exists
    const userExists = this.users.some((user) => user.email === email);

    if (userExists) {
      return of(false).pipe(delay(800));
    }

    // Add new user
    const newUser = { name, email, password };
    this.users.push(newUser);

    // Save to localStorage
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
