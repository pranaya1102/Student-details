import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}
  searchStudent(queryParams: any, body: any) {
    const URL =
      'https://student-details-2van.onrender.com/student?' +
      `limit=${queryParams.limit}&offset=${queryParams.offset}`;
    return this.httpClient.post(URL, body);
  }
}
