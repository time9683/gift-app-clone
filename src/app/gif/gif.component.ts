import { Component, Input, OnInit, inject } from '@angular/core';
import { Gif } from '@app/gif';
import { GifService } from '@app/gif.service';
import {  RouterModule,Router } from '@angular/router';


@Component({
  selector: 'app-gif',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gif.component.html',
  styleUrl: './gif.component.css'
})
export class GifComponent implements OnInit{
  @Input() id!: string
  gifInfo : Gif | undefined
  gifService = inject(GifService);
  router = inject(Router);

      ngOnInit(): void {
        this.gifService.getGifById(this.id).subscribe({
          next: (data) => {
            this.gifInfo = data.data
          },
          error: (error) => {
            //  redirect to 404 page
             this.router.navigate(['/404'])
            
          }
        })
      }


}
