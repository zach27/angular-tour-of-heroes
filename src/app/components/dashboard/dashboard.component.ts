import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    public heroes: Hero[] = [];
    constructor(private readonly heroService: HeroService) {}

    public ngOnInit(): void {
        this.loadHeroes();
    }

    public loadHeroes(): void {
        this.heroService.getHeroes().subscribe((heroes) => {
            this.heroes = heroes.slice(1, 5);
        });
    }
}
