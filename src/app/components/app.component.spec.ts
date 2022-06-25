import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, HeroesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
    });

    it('should create the app', () => {
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'angular-tour-of-heroes'`, () => {
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Tour of Heroes');
    });

    it('should render title', () => {
        fixture.detectChanges();
        const headerText = fixture.debugElement.query(By.css('h1')).nativeElement.textContent;
        expect(headerText).toBe('Tour of Heroes');
    });
});
