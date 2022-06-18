import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
    public heroes: Hero[] = [];
    public selectedHero?: Hero;

    public constructor(
        private readonly heroService: HeroService,
        private readonly messageService: MessageService
    ) {}

    public ngOnInit(): void {
        this.loadHeroes();
    }

    public loadHeroes(): void {
        this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    }

    public onSelect(hero: Hero): void {
        if (hero === this.selectedHero) {
            this.selectedHero = undefined;
            this.messageService.add(`Unselecting hero with ID ${hero.id}`);
        } else {
            this.selectedHero = hero;
            this.messageService.add(`Showing hero with ID ${hero.id}`);
        }
    }
}
