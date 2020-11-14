import { ApplicationInitStatus, NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { AddComponent} from './components/add/add.component'
import { ManageComponent} from './components/manage/manage.component'
import { SearchComponent} from './components/search/search.component'
const routes : Routes = [
    {path : 'home' , component: SearchComponent},
    {path : 'addschedule' , component: AddComponent},
    {path : 'manageschedule' , component: ManageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule] 
})

export class AppRoutingModule{}

export const routingComponents = [SearchComponent,AddComponent,ManageComponent]
