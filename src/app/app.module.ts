import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WidgetComponent } from './widgets/widget/widget.component';
import { AddWidgetDialogComponent } from './widgets/add-widget-dialog/add-widget-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsFormComponent } from './tabs-form/tabs-form.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'widgets', component: WidgetsComponent },
  { path: 'tabs-form', component: TabsFormComponent},
  { path: '',   redirectTo: '/widgets', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
  ],
  declarations: [ 
    AppComponent, 
    HelloComponent, 
    WidgetsComponent, 
    WelcomeComponent, 
    WidgetComponent, AddWidgetDialogComponent, TabsFormComponent 
  ],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule { }
