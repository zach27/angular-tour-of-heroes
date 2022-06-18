import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
}
