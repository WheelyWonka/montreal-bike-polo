import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { NgxHotkeysModule } from '@balticcode/ngx-hotkeys';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		Nl2BrPipeModule,
		EditorModule,
		NgZorroAntdModule,
		NgxHotkeysModule.forRoot()
	],
	declarations: [],
	providers: [{ provide: NZ_I18N, useValue: en_US }],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		Nl2BrPipeModule,
		EditorModule,
		NgZorroAntdModule,
		NgxHotkeysModule
	]
})
export class SharedModule {}
