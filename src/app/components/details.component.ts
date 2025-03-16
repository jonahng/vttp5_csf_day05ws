import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchCriteria, SearchResult } from '../models';
import { BggService } from '../bgg.service';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  private activatedRoute = inject(ActivatedRoute)
  private title = inject(Title)
    private bggSvc = inject(BggService)
    criteria!: SearchCriteria;
    
  

  q: string = ''
  protected results$!: Observable<SearchResult[]>

  ngOnInit(): void {
    this.q = this.activatedRoute.snapshot.params['q'];
    console.log("FROM DETAILS COMPONENT:Q IS:",  this.q)
    

    this.activatedRoute.params.subscribe(
      params => {
        this.q = params['q']
        console.log("params: q is: ", this.q)
      })
      this.criteria = {q:this.q};

      this.results$ = this.bggSvc.searchAsObservable(this.criteria)
  }


}
