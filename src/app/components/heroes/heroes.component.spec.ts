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

    it('should render list of heros', () => {
        component.heroes = mockHeros;
        fixture.detectChanges();

        const herosElement: HTMLElement = fixture.nativeElement;
        const heroButtons = herosElement.querySelectorAll('.heroes button');
        expect(heroButtons.length).toBe(2);
    });
});
