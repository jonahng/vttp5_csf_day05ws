import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SearchCriteria, SearchResult } from './models';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BggService {

  constructor() { }

  private http = inject(HttpClient)

  searchAsObservable(criteria: SearchCriteria): Observable<SearchResult[]>{
    const params = new HttpParams()
    .set('q', criteria.q)
    .set('appid', '72c88fd4e854731b78890036c15c834a')
    return this.http.get<SearchResult[]>('https://api.openweathermap.org/data/2.5/weather', {params})

  }


  search(criteria : SearchCriteria): Promise<SearchResult[]>{
    return firstValueFrom(
      this.searchAsObservable(criteria)
    )
  }
}
