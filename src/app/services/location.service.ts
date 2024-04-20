import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  // public async getLocation(loc: any): Promise<void> {
  //   console.log(loc, 'log');
  //   const posts = this.http.post<void>(baseUrl, loc);
  //   console.log(posts, 'posts');
  //   posts.subscribe({
  //     next: (newPost => newPost),
  //     error: (err: Error) => console.log(err),
  //   });
  //   console.log(posts);
  //   return posts;
  // }
}
