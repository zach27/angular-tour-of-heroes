import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';
import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
    let component: HeroSearchComponent;
    let fixture: ComponentFixture<HeroSearchComponent>;
    let heroService: jasmine.SpyObj<HeroService>;

    beforeEach(async () => {
        heroService = jasmine.createSpyObj<HeroService>('HeroService', ['searchHeroes']);
        heroService.searchHeroes.and.returnValue(getMockHeroes());

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [HeroSearchComponent],
            providers: [
                {
                    provide: HeroService,
                    useValue: heroService,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should search and return heroes', fakeAsync(() => {
        component.search('bob');
        tick(500);
        expect(heroService.searchHeroes).toHaveBeenCalledWith('bob');
    }));

    it('should render searched heroes', fakeAsync(() => {
        component.search('bob');
        tick(500);

        fixture.detectChanges();

        const heroes = fixture.debugElement.queryAll(By.css('.search-result li'));
        expect(heroes.length).toBe(5);
    }));

    it('should not search until the user stops typing', fakeAsync(() => {
        component.search('b');
        tick(100);
        component.search('bo');
        tick(100);
        component.search('bob');
        tick(400);

        expect(heroService.searchHeroes).toHaveBeenCalledTimes(1);
        expect(heroService.searchHeroes).toHaveBeenCalledWith('bob');
    }));

    it('should not search if search box is erased', fakeAsync(() => {
        component.search('bob');
        tick(200);
        component.search('');
        tick(600);

        expect(heroService.searchHeroes).not.toHaveBeenCalled();
    }));

    function getMockHeroes(): Observable<Hero[]> {
        return of([
            { id: 1, name: 'Hero 1' },
            { id: 2, name: 'Hero 2' },
            { id: 3, name: 'Hero 3' },
            { id: 4, name: 'Hero 4' },
            { id: 5, name: 'Hero 5' },
        ]);
    }
});
