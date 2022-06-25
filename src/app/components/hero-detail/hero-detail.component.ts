import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../hero';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit, OnDestroy {
    public hero: Hero | undefined;

    private readonly destroyed$ = new Subject<void>();

    constructor(
        private readonly route: ActivatedRoute,
        private readonly location: Location,
        private readonly heroService: HeroService
    ) {}

    public ngOnInit(): void {
        const heroId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadHero(heroId);
    }

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    public loadHero(id: number): void {
        this.heroService
            .getHeroById(id)
            .pipe(takeUntil(this.destroyed$))
            .subscribe((hero) => (this.hero = hero));
    }

    public navigateBack(): void {
        this.location.back();
    }

    public save(): void {
        if (this.hero) {
            this.heroService
                .updateHero(this.hero)
                .pipe(takeUntil(this.destroyed$))
                .subscribe(() => this.navigateBack());
        }
    }
}
