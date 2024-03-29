import { Injectable, inject } from '@angular/core';
import { Gif } from '@app/gif';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifService {
   baseUrl = 'https://api.giphy.com/v1/gifs/search?api_key=jruxTjeC701si8cDjF1hYRaaevtYNwCz'
  
  private http   = inject(HttpClient)



   getAllGifs(query:String,offset:number) {
    return  this.http.get<{data:Gif[]}>(this.baseUrl + '&q=' + query + '&limit=10&offset=' + offset + '&rating=g&lang=es');

  }

   getGifById(id: string){
    return  this.http.get<{data:Gif}>('https://api.giphy.com/v1/gifs/' + id + '?api_key=jruxTjeC701si8cDjF1hYRaaevtYNwCz');
   }

}
