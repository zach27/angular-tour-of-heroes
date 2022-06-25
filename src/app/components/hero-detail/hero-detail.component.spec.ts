import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
    let component: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let heroService: jasmine.SpyObj<HeroService>;
    let location: Location;

    const mockHero: Hero = {
        id: 17,
        name: 'Fast Fredy',
    };

    const activatedRoute = {
        snapshot: {
            paramMap: {
                get: () => 17,
            },
        },
    };

    beforeEach(async () => {
        heroService = jasmine.createSpyObj<HeroService>('HeroService', [
            'getHeroById',
            'updateHero',
        ]);
        heroService.getHeroById.and.returnValue(of(mockHero));
        heroService.updateHero.and.returnValue(of(undefined));

        await TestBed.configureTestingModule({
            declarations: [HeroDetailComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: activatedRoute,
                },
                {
                    provide: HeroService,
                    useValue: heroService,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroDetailComponent);
        location = TestBed.inject(Location);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should load hero specified in route parameter', () => {
        expect(heroService.getHeroById).toHaveBeenCalledOnceWith(mockHero.id);
        expect(component.hero).toEqual(mockHero);
    });

    it('should navigate back when clicking the back button', () => {
        const locationBackSpy = spyOn(location, 'back');
        const goBackButton = fixture.debugElement.query(By.css('.goBack'))
            .nativeElement as HTMLElement;

        goBackButton.click();

        expect(locationBackSpy).toHaveBeenCalled();
    });
});
