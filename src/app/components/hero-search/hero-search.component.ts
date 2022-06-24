import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
    public heroes$!: Observable<Hero[]>;
    private readonly searchTerm$ = new Subject<string>();

    constructor(private readonly heroService: HeroService) {}

    public search(term: string): void {
        this.searchTerm$.next(term);
    }

    public ngOnInit(): void {
        this.heroes$ = new Observable<Hero[]>();
        this.heroes$ = this.searchTerm$.pipe(
            debounceTime(500),
            filter((term) => !!term),
            distinctUntilChanged(),
            switchMap((term) => this.heroService.searchHeroes(term))
        );
    }
}
