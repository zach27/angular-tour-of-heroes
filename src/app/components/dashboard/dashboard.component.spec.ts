import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
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
        {
            id: 3,
            name: 'Energetic Eddy',
        },
    ];

    beforeEach(async () => {
        heroServiceMock = jasmine.createSpyObj<HeroService>('HeroService', ['getHeroes']);
        heroServiceMock.getHeroes.and.returnValue(of(mockHeroes));

        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            providers: [
                {
                    provide: HeroService,
                    useValue: heroServiceMock,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should initialize with top heroes', () => {
        const topHeroes: Hero[] = [
            {
                id: 2,
                name: 'Bold Bob',
            },
            {
                id: 3,
                name: 'Energetic Eddy',
            },
        ];
        expect(component.heroes).toEqual(topHeroes);
    });
});
