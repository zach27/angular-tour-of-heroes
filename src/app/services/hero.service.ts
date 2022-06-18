import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, tap, Observable, of, throwError, catchError } from 'rxjs';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    private static readonly heroesUrl = 'api/heroes';

    constructor(
        private readonly messageService: MessageService,
        private readonly http: HttpClient
    ) {}

    public getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(HeroService.heroesUrl).pipe(
            tap(() => this.log('fetched heroes')),
            catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }

    public getHeroById(id: number): Observable<Hero> {
        const url = `${HeroService.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap((_) => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
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
