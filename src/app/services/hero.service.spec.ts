import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Hero } from '../hero';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
    let service: HeroService;
    let http: HttpTestingController;
    let messageService: jasmine.SpyObj<MessageService>;

    const heroesUrl = 'https://bootcamp.unclezach.org/api/heroes';

    beforeEach(() => {
        messageService = jasmine.createSpyObj<MessageService>('MessageService', ['add']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: MessageService,
                    useValue: messageService,
                },
            ],
        });
        service = TestBed.inject(HeroService);
        http = TestBed.inject(HttpTestingController);
    });

    describe('getHeroes', () => {
        it('should get list of heroes', (done) => {
            const mockHeroes: Hero[] = [
                {
                    id: 5,
                    name: 'Bob',
                },
                {
                    id: 6,
                    name: 'Jane',
                },
            ];

            const response = {
                heroes: mockHeroes,
                total: mockHeroes.length,
            };

            service.getHeroes().subscribe((heroes) => {
                expect(heroes.length).toBe(2);
                expect(heroes).toEqual(mockHeroes);
                done();
            });

            const request = http.expectOne({
                method: 'get',
                url: heroesUrl,
            });

            request.flush(response);
            http.verify();
        });

        it('should include search query param when provided', (done) => {
            const mockHeroes: Hero[] = [
                {
                    id: 5,
                    name: 'Bob',
                },
            ];

            const response = {
                heroes: mockHeroes,
                total: mockHeroes.length,
            };

            service.getHeroes({ search: 'Bob' }).subscribe(() => done());

            const request = http.expectOne({
                method: 'get',
                url: `${heroesUrl}?search=Bob`,
            });

            request.flush(response);
            http.verify();
        });
    });
});
