import {
	ChangeDetectorRef,
	Component,
	NgZone,
	OnDestroy,
	OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxHotkeysService } from '@balticcode/ngx-hotkeys';
import { environment } from '@env/environment';
/** Somehow the @types/google.analytics package seams to be broken */
declare let ga: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
	/** @type {Subject<void>} Observables unsubscriber */
	private unsubscribe: Subject<void> = new Subject<void>();

	localStorage = localStorage;
	startDate = new Date();
	endDate = new Date(2019, 6, 6, 15);
	// @ts-ignore
	leftTime = Math.floor((this.endDate - this.startDate) / 1000);
	format = '$!d!D. $!h!H. $!m!Min. $!s!sec.';

	constructor(
		private translateService: TranslateService,
		private router: Router,
		private zone: NgZone,
		private cd: ChangeDetectorRef,
		private hotkeysService: NgxHotkeysService
	) {
		this.initLang();

		console.log(this.endDate);

		this.hotkeysService.register({
			combo: 'ctrl+alt+l',
			handler: event => {
				if (localStorage.getItem('lang') !== 'keys') {
					this.setLang('keys');
				} else {
					this.setLang(this.translateService.defaultLang);
				}
				return false; // Prevent bubbling
			}
		});
	}

	ngOnInit() {
		this.router.events
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(event => {
				if (!(event instanceof NavigationEnd)) {
					return;
				}
				// Scroll to top
				window.scrollTo(0, 0);
				// Update GA
				if (typeof ga === 'function') {
					ga('set', 'page', event.urlAfterRedirects);
					ga('send', 'pageview');
				}
			});

		this.translateService.onLangChange.subscribe(langChanges => {
			this.format =
				langChanges.lang === 'en'
					? '$!d!D. $!h!H. $!m!Min. $!s!sec.'
					: '$!d!J. $!h!H. $!m!Min. $!s!sec.';
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
	}

	initLang(): any {
		// Setup translate service
		this.translateService.addLangs(environment.languages);
		const availableLangs = this.translateService.getLangs();
		const defaultLang = this.translateService.getLangs()[0];
		this.translateService.setDefaultLang(defaultLang);

		// Sync lang to storage
		if (!localStorage.getItem('lang')) {
			// Force en as default
			localStorage.setItem('lang', defaultLang);
		} else {
			if (!availableLangs.includes(localStorage.getItem('lang'))) {
				localStorage.setItem('lang', defaultLang);
			}
		}

		this.translateService.use(localStorage.getItem('lang'));

		window.addEventListener('storage', (event: StorageEvent) => {
			if (event.key === 'lang') {
				this.translateService.use(localStorage.getItem('lang'));
			}
		});
	}

	toggleLang(): void {
		const availableLangs = this.translateService.getLangs();
		// Get the index of the next lang
		const index =
			(Math.max(
				0,
				availableLangs.indexOf(this.translateService.currentLang)
			) +
				1) %
			availableLangs.length;
		this.setLang(availableLangs[index]);
	}

	setLang(lang: string) {
		this.translateService.use(lang);
		localStorage.setItem('lang', lang);
		this.cd.detectChanges();
	}
}
