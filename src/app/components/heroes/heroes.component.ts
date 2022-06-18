import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
    public heroes: Hero[] = [];

    public constructor(private readonly heroService: HeroService) {}

    public ngOnInit(): void {
        this.loadHeroes();
    }

    public loadHeroes(): void {
        this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    }
}
