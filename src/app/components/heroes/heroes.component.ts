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

    public add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }

        this.heroService.addHero({ name } as Hero).subscribe((hero) => {
            this.heroes.push(hero);
        });
    }

    public delete(hero: Hero) {
        this.heroes = this.heroes.filter((h) => h !== hero);
        this.heroService.deleteHero(hero.id).subscribe();
    }
}
