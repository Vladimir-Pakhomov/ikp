import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/misc/navmenu/navmenu.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { AdminService } from './services/admin/admin.service';
import { AdminServiceStub } from './stubs/admin.service.stub.spec';
import { LoginService } from './services/login/login.service';
import { LoginServiceStub } from './stubs/login.service.stub.spec';
import { FeatureComponent } from './features/feature.component';
import { ToolbarComponent } from './components/misc/toolbar/toolbar.component';
import { MediaPresenterComponent } from './components/misc/media-presenter/media-presenter.component';
import { LinkedTableComponent } from './components/misc/linked-table/linked-table.component';
import { ActionService } from './services/actions/action.service';
import { UserFormComponent } from './components/misc/forms/user-form/user-form.component';
import { UserRolePipe } from './components/misc/pipes/user-role.pipe';
import { ObjectPipe } from './components/misc/pipes/object.pipe';
import { GroupFormComponent } from './components/misc/forms/group-form/group-form.component';
import { LookupComponent } from './components/misc/lookup/lookup.component';
import { RtComponent } from './components/misc/rt/rt.component';
import { ProgramFormComponent } from './components/misc/forms/program-form/program-form.component';
import { BlockStructureComponent } from './components/misc/block-structure/block-structure.component';
import { BlockFormComponent } from './components/misc/forms/block-form/block-form.component';
import { ExersizeFormComponent } from './components/misc/forms/exersize-form/exersize-form.component';
import { ExersizeStructureComponent } from './components/misc/exersize-structure/exersize-structure.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,

        LoginPageComponent,
        MainPageComponent,

        FeatureComponent,

        MediaPresenterComponent,
        LinkedTableComponent,
        UserFormComponent,
        GroupFormComponent,
        ProgramFormComponent,
        LookupComponent,
        RtComponent,
        BlockStructureComponent,
        BlockFormComponent,
        ExersizeFormComponent,
        ExersizeStructureComponent,

        ToolbarComponent,

        UserRolePipe,
        ObjectPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: FeatureComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    exports: [
        UserRolePipe,
        ObjectPipe
    ],
    providers: [
        ActionService,
        AdminService,
        LoginService,
    ]
})
export class AppModuleShared {
}
