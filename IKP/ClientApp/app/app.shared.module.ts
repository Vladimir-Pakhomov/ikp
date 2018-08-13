import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, ConnectionBackend, XHRBackend, RequestOptions } from '@angular/http';
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
import { BlockStructureComponent } from './components/misc/structure/block-structure/block-structure.component';
import { BlockFormComponent } from './components/misc/forms/block-form/block-form.component';
import { ExersizeFormComponent } from './components/misc/forms/exersize-form/exersize-form.component';
import { ExersizeStructureComponent } from './components/misc/structure/exersize-structure/exersize-structure.component';
import { QuestionFormComponent } from './components/misc/forms/question-form/question-form.component';
import { ConclusionFormComponent } from './components/misc/forms/conclusion-form/conclusion-form.conponent';
import { ResolverFormComponent } from './components/misc/forms/resolver-form/resolver-form.component';
import { QuestionResolversComponent } from './components/misc/structure/question-resolvers/question-resolvers.component';
import { FileService } from './services/file/file.service';
import { VideoFormComponent } from './components/misc/forms/video-form/video-form.component';
import { ResolverVideosComponent } from './components/misc/structure/resolver-videos/resolver-videos.component';
import { ExecutionComponent } from './components/execution/execution.component';
import { ConclusionItemFormComponent } from './components/misc/forms/conclusion-item-form/conclusion-item-form.component';
import { ConclusionStructureComponent } from './components/misc/structure/conclusion-structure/conclusion-structure.component';
import { PendingInterceptorService } from './services/interceptors/pending-interceptor.service';
import { LoaderComponent } from './components/pages/loader/loader.component';
import { MediaManagerComponent } from './components/media-manager/media-manager.component';
import { MessageService } from './services/interceptors/message.service';
import { FileUploadComponent } from './components/misc/file-upload/file-upload.component';
import { GalleryComponent } from './components/misc/gallery/gallery.component';
import { ClipboardService } from './services/clipboard/clipboard.service';

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
        QuestionFormComponent,
        ConclusionFormComponent,
        ConclusionStructureComponent,
        ConclusionItemFormComponent,
        QuestionResolversComponent,
        ResolverFormComponent,
        VideoFormComponent,
        ResolverVideosComponent,
        ExecutionComponent,
        RtComponent,
        MediaManagerComponent,
        FileUploadComponent,
        GalleryComponent,

        ToolbarComponent,
        LoaderComponent,

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
        FileService,
        DatePipe,
        PendingInterceptorService,
        MessageService,
        ClipboardService
    ]
})
export class AppModuleShared {
}
