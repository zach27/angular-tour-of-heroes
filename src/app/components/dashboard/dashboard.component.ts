import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    public heroes: Hero[] = [];
    private readonly destroyed$ = new Subject<void>();

    constructor(private readonly heroService: HeroService) {}

    public ngOnInit(): void {
        this.loadHeroes();
    }

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    public loadHeroes(): void {
        this.heroService
            .getHeroes()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((heroes) => {
                this.heroes = heroes.slice(1, 5);
            });
    }
}
