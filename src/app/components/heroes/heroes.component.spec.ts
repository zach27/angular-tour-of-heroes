import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Hero } from 'src/app/hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes.component';

fdescribe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;

    const mockHeros: Hero[] = [
        {
            id: 1,
            name: 'Fast Fredy',
        },
        {
            id: 2,
            name: 'Bold Bob',
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroDetailComponent],
            providers: [HeroesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set selected hero when nothing is selected yet', () => {
        const hero: Hero = {
            id: 5,
            name: 'Fred',
        };

        component.onSelect(hero);

        expect(component.selectedHero).toEqual(hero);
    });

    it('should set selected hero when hero is changed', () => {
        const firstHero: Hero = {
            id: 5,
            name: 'Fred',
        };

        const secondHero: Hero = {
            id: 6,
            name: 'Jane',
        };

        component.onSelect(firstHero);
        component.onSelect(secondHero);

        expect(component.selectedHero).toEqual(secondHero);
    });

    it('should clear selected hero when reselecting the same hero', () => {
        const hero: Hero = {
            id: 5,
            name: 'Fred',
        };

        component.onSelect(hero);
        component.onSelect(hero);

        expect(component.selectedHero).toBeUndefined();
    });

    it('should render list of heros', () => {
        component.heroes = mockHeros;
        fixture.detectChanges();

        const herosElement: HTMLElement = fixture.nativeElement;
        const heroButtons = herosElement.querySelectorAll('.heroes button');
        expect(heroButtons.length).toBe(2);
    });

    it('should show clicked hero', () => {
        component.heroes = mockHeros;
        fixture.detectChanges();

        const htmlElement: HTMLElement = fixture.nativeElement;
        const firstHero = htmlElement.querySelector('.heroes button') as HTMLElement;
        firstHero.click();

        fixture.detectChanges();

        const detailComponent: HeroDetailComponent = fixture.debugElement.query(
            By.directive(HeroDetailComponent)
        ).componentInstance;

        expect(detailComponent.hero?.id).toBe(1);
    });
});
