import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModuleLoad } from './translate-import';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TranslateEntryPipe } from './pipes/translate-entry.pipe';
import { TranslateCutPipe } from './pipes/translate-cut.pipe';
import { HttpClientModule } from '@angular/common/http';
import { MetaModule } from '@ngx-meta/core';
import { SharedModule } from '@app/shared';
import { MoleculeHomeComponent } from '@app/molecules/molecule-home/molecule-home.component';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
	declarations: [
		AppComponent,
		SafeHtmlPipe,
		TranslateEntryPipe,
		TranslateCutPipe,
		MoleculeHomeComponent
	],
	imports: [
		CountdownModule,
		BrowserModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('/ngsw-worker.js', {
			enabled: environment.production
		}),
		SharedModule,
		NgbModule.forRoot(),
		HttpClientModule,
		AppRoutingModule,
		TranslateModuleLoad(),
		MetaModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
