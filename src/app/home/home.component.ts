import { Component,  Input, OnInit, inject, signal } from '@angular/core';
import { GifService } from '@app/gif.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet,Router } from '@angular/router';
import { Gif } from '@app/gif';
import { IntersectionDirective } from '@app/intersection.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [[CommonModule,RouterOutlet,RouterModule,IntersectionDirective,NgOptimizedImage]],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Input() search!: string;



  routes = inject(ActivatedRoute)
  router = inject(Router)
  gifService = inject(GifService);
  gifs =  signal<Gif[]>([]);
  query = 'cat';
  offset = 0;
  SearchInterval : any;



 ngOnInit(): void {
  if(this.search){
      this.query = this.search; 
      }else{
        this.router.navigate([],{
          queryParams: {
            search: this.query
          }
      })
    }

    this.gifService.getAllGifs(this.query,this.offset).subscribe({
      next: (data) => {
        this.gifs.set(data.data);
    }
    
  }
    )
}




  debounceGift(query: string){
   if(this.SearchInterval){
    clearTimeout(this.SearchInterval);
   }

  this.SearchInterval =  setTimeout(()=>{
    this.buscarGifs(query);
  },500)

  

  }

    

  buscarGifs(query: string){
    this.query = query;
    this.offset = 0
    this.gifService.getAllGifs(query,this.offset).subscribe({
      next: (data) => {
        this.gifs.set(data.data);
      }
    });
this.router.navigate([],{
      queryParams: {
        search: this.query
      }
    })
    
  }


  loadMore() {
    if (this.gifs().length === 0) return;
    this.offset += 10
    this.gifService.getAllGifs(this.query,this.offset).subscribe({
      next: (data) => {
        this.gifs.update((prev) => [...prev, ...data.data]);
      }
    });
    
  }




}
