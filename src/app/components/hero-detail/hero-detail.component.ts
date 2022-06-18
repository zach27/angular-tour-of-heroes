import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../hero';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
    public hero: Hero | undefined;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly location: Location,
        private readonly heroService: HeroService
    ) {}

    ngOnInit(): void {
        const heroId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadHero(heroId);
    }

    public loadHero(id: number) {
        this.heroService.getHeroById(id).subscribe((hero) => (this.hero = hero));
    }
}
