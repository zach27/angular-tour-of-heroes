import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
    public heroes = HEROES;
    selectedHero?: Hero;

    ngOnInit(): void {}

    public onSelect(hero: Hero): void {
        if (hero === this.selectedHero) {
            this.selectedHero = undefined;
        } else {
            this.selectedHero = hero;
        }
    }
}
