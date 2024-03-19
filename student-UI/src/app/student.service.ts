import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}
  searchStudent(queryParams: any, body: any) {
    const URL =
      'http://localhost:8000/student?' +
      `limit=${queryParams.limit}&offset=${queryParams.offset}`;
    return this.httpClient.post(URL, body);
  }
}
