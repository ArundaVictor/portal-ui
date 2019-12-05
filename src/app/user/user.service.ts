import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, UsersPage } from './users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url =
    `${environment.baseMicroServiceURL}:${environment.services.gym.port}${environment.services.gym.contextRoot}/user-controller`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]> {
    const url = `${this.url}/list`;
    //console.log(this.keycloakService.getKeycloakInstance().tokenParsed);
    // return this.keycloakService.addTokenToHeader(headers).pipe(
    //   mergeMap(get => this.http.get<Program[]>(url, {headers: get})));
    return this.http.get<Users[]>(url);
  }

  getAll(page, size): Observable<UsersPage> {
    const url = `${this.url}?page=${page}&size=${size}`;
    // return this.keycloakService.addTokenToHeader(headers).pipe(
    //   mergeMap(get => this.http.get<ProgramPage>(url, {headers: get})));
    return this.http.get<UsersPage>(url);
  }

  getbyId(id: number): Observable<Users> {
    const url = `${this.url}/${id}`;
    // return this.keycloakService.addTokenToHeader(headers).pipe(
    //   mergeMap(get => this.http.get<Program>(url, {headers: get})));
    return this.http.get<Users>(url);


  }

  post(users: Users): Observable<Users> {
    const url = `${this.url}/users`;
    // return this.keycloakService.addTokenToHeader(headers).pipe(
    //   mergeMap(get => this.http.post<Program>(url, program, {headers: get})));
    return this.http.get<Users>(url);


  }

  put(users: Users): Observable<Users> {
    const url = `${this.url}/${users.id}`;

    // return this.keycloakService.addTokenToHeader(headers).pipe(
    //   mergeMap(get => this.http.put<Program>(url, program, {headers: get})));
    return this.http.put<Users>(url, users);

  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/users/${id}`;
    // return this.keycloakService.addTokenToHeader(headers).pipe(
    //   mergeMap(get => this.http.delete<Program>(url, {headers: get})));
    return this.http.delete<Users>(url);

  }

  findByUuid(uuid: string): Observable<Users> {
    const url = `${this.url}/users/get/${uuid}`;
    // return this.keycloakService.addTokenToHeader( headers ).pipe(
    //   mergeMap( get => this.http.get<Program>(url, { headers: get } ) ) );
    return this.http.get<Users>(url);

  }
}
