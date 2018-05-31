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

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,

        LoginPageComponent,
        MainPageComponent,

        FeatureComponent,

        MediaPresenterComponent,
        LinkedTableComponent,

        ToolbarComponent
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
    providers: [
        { provide: AdminService, useClass: AdminServiceStub },
        { provide: LoginService, useClass: LoginServiceStub }
    ]
})
export class AppModuleShared {
}
