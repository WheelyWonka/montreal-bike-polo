import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoleculeHomeComponent } from '@app/molecules/molecule-home/molecule-home.component';

const routes: Routes = [
	{
		path: '',
		component: MoleculeHomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: []
})
export class AppRoutingModule {}
