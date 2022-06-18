import { Injectable } from '@angular/core';
import { map, switchMap, tap, Observable, of, throwError } from 'rxjs';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    constructor(private readonly messageService: MessageService) {}

    public getHeroes(): Observable<Hero[]> {
        const heroes = of(HEROES);
        this.messageService.add('HeroService: Heroes are here!');
        return heroes;
    }

    public getHeroById(id: number): Observable<Hero> {
        const hero = this.getHeroes().pipe(
            map((heroes) => heroes.find((h) => h.id === id)),
            switchMap((hero) => {
                if (!hero) {
                    return throwError(() => new Error(`Hero ${id} not found`));
                }
                return of(hero);
            }),
            tap((hero) => {
                this.messageService.add(`HeroService: fetched hero id=${hero.id}`);
            })
        );

        return hero;
    }
}
