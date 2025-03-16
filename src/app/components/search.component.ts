import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BggService } from '../bgg.service';
import { map, Observable } from 'rxjs';
import { SearchCriteria, SearchResult } from '../models';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  
  private fb = inject(FormBuilder)
  private bggSvc = inject(BggService)

  criteria!: SearchCriteria

  protected form!: FormGroup
  //protected results: SearchResult[] = []
  // protected results$!: Promise<SearchResult[]>
  protected results$!: Observable<SearchResult[]>

  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control<string>('', [ Validators.required ])
    })
  }

  search() {
    const q = this.form.value.q
    console.log("q is:" +  q)
    

    this.criteria = {q:"abc"};
    console.log("READING FROM THIS CRITEIA:Q is " + this.criteria.q)
    // result -> Promise | Observable
    this.criteria.q = q
    console.log("READING FROM THIS CRITEIA:Q is " + this.criteria.q)
    
    this.results$ = this.bggSvc.searchAsObservable(this.criteria)
    console.log("THE RESUTLS ARE" + this.results$.subscribe(res => console.log(res)));

    // this.bggSvc.search({ q, count: 10 } as SearchCriteria)
    //   .then(results => {
    //     this.results = results
    //   })
  }

}
