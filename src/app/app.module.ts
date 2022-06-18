import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component';

import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';

@NgModule({
    declarations: [AppComponent, HeroesComponent, HeroDetailComponent],
    imports: [FormsModule, BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
