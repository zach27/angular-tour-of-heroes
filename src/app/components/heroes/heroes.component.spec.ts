import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let heroServiceMock: jasmine.SpyObj<HeroService>;

    const mockHeroes: Hero[] = [
        {
            id: 1,
            name: 'Fast Fredy',
        },
        {
            id: 2,
            name: 'Bold Bob',
        },
    ];

    const newHeroId = 15;

    beforeEach(async () => {
        heroServiceMock = jasmine.createSpyObj<HeroService>('HeroService', [
            'getHeroes',
            'addHero',
            'deleteHero',
        ]);
        heroServiceMock.getHeroes.and.returnValue(of(mockHeroes));
        heroServiceMock.addHero.and.callFake((hero) => of({ ...hero, id: newHeroId }));
        heroServiceMock.deleteHero.and.returnValue(of(undefined));

        await TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroDetailComponent],
            providers: [
                HeroesComponent,
                {
                    provide: HeroService,
                    useValue: heroServiceMock,
                },
            ],
            imports: [],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('loading heroes', () => {
        it(`should populate component's list of heroes`, () => {
            fixture.detectChanges();

            expect(component.heroes).toEqual(mockHeroes);
        });

        it('should render list of heroes', () => {
            fixture.detectChanges();

            const heroesElement: HTMLElement = fixture.nativeElement;
            const heroButtons = heroesElement.querySelectorAll('.heroes button');
            expect(heroButtons.length).toBe(2);
        });
    });

    describe('adding hero', () => {
        it('should call service', () => {
            const heroName = 'New Nellie';
            component.add(heroName);
            expect(heroServiceMock.addHero).toHaveBeenCalledWith({ name: heroName } as Hero);
        });

        it(`should add hero to component's list of heroes`, () => {
            component.heroes = [];

            const heroName = 'New Nellie';
            component.add(heroName);

            const expectedHero: Hero = {
                name: heroName,
                id: newHeroId,
            };
            expect(component.heroes).toEqual([expectedHero]);
        });

        it('should not do anything when name is missing', () => {
            const heroName = '';
            component.add(heroName);
            expect(heroServiceMock.addHero).not.toHaveBeenCalled();
        });
    });

    describe('deleting hero', () => {
        const heroToDelete: Hero = {
            id: 10,
            name: 'Deleted Donald',
        };

        it('should call service', () => {
            component.delete(heroToDelete);
            expect(heroServiceMock.deleteHero).toHaveBeenCalledWith(heroToDelete.id);
        });

        it(`should remove hero to component's list of heroes`, () => {
            component.heroes = [...mockHeroes, heroToDelete];
            component.delete(heroToDelete);
            expect(component.heroes).toEqual(mockHeroes);
        });
    });
});
