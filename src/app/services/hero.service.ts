import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { omit } from 'lodash';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Hero } from '../hero';
import { MessageService } from './message.service';

interface ApiError {
    message: string;
}

interface ListResponse {
    heroes: Hero[];
    total: number;
}

interface AddHeroResponse {
    message: string;
    hero: Hero;
}

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    private static readonly heroesUrl = 'https://bootcamp.unclezach.org/slow-api/heroes';

    constructor(
        private readonly messageService: MessageService,
        private readonly http: HttpClient
    ) {}

    public getHeroes(query: { search?: string } = {}): Observable<Hero[]> {
        const params = new HttpParams({ fromObject: query });
        return this.http
            .get<ListResponse>(HeroService.heroesUrl, { ...this.httpOptions, params })
            .pipe(
                tap(() => this.log('fetched heroes')),
                map((response) => response.heroes),
                catchError(this.handleError<Hero[]>('getHeroes', []))
            );
    }

    public getHeroById(id: number): Observable<Hero> {
        const url = `${HeroService.heroesUrl}/${id}`;
        return this.http.get<Hero>(url, this.httpOptions).pipe(
            tap((_) => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    public searchHeroes(term: string): Observable<Hero[]> {
        return this.getHeroes({ search: term });
    }

    public addHero(hero: Omit<Hero, 'id'>): Observable<Hero> {
        return this.http.post<AddHeroResponse>(HeroService.heroesUrl, hero, this.httpOptions).pipe(
            tap((response) => this.log(`added hero with id=${response.hero.id}`)),
            map((response) => response.hero),
            catchError(this.handleError<Hero>('addHero'))
        );
    }

    public updateHero(hero: Hero): Observable<void> {
        const url = `${HeroService.heroesUrl}/${hero.id}`;
        const test = this.http.put(url, omit(hero, 'id'), this.httpOptions).pipe(
            tap((_) => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError('updateHero'))
        );

        return test;
    }

    public deleteHero(id: number): Observable<void> {
        const url = `${HeroService.heroesUrl}/${id}`;
        return this.http.delete(url, this.httpOptions).pipe(
            tap(() => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError('deleteHero'))
        );
    }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            ClientID: 'zachary',
        }),
    };

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T = any>(
        operation = 'operation',
        result?: T
    ): (err: ApiError) => Observable<T> {
        return (error: ApiError): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
