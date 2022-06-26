import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pick } from 'lodash';

interface Battle {
    name: string;
    hero: string;
    villain: string;
    location: string;
}

@Component({
    selector: 'app-hero-battle',
    templateUrl: './hero-battle.component.html',
    styleUrls: ['./hero-battle.component.css'],
})
export class HeroBattleComponent {
    public form = new FormGroup({
        name: new FormControl('', {
            validators: [Validators.minLength(3), Validators.required],
            nonNullable: true,
        }),
        hero: new FormControl('', { validators: Validators.required, nonNullable: true }),
        villain: new FormControl('', { validators: Validators.required, nonNullable: true }),
        location: new FormControl('', { validators: Validators.required, nonNullable: true }),
    });

    public locations = ['Florida', 'Colorado', 'Texas', 'Indiana'];

    public submit(): void {
        const formValue = this.form.value;
        const battle: Battle = {
            name: formValue.name as string,
            hero: formValue.hero as string,
            villain: formValue.villain as string,
            location: formValue.location as string,
        };

        console.log('Submitting new battle:', battle);
    }

    public reset() {
        this.form.reset();
    }

    public get valid() {
        return this.form.valid;
    }

    public get formInfo() {
        return pick(
            this.form,
            'valid',
            'invalid',
            'touched',
            'untouched',
            'dirty',
            'pristine',
            'value'
        );
    }
}
