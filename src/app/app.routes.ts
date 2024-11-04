import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'signin', component: LoginComponent, title: 'Sign In' },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, 
    children: [
      {path: 'home', component: HomeComponent, data: {icon: 'home', label: 'Home'}},
      // {path: 'users', component: UserComponent, data: {icon: 'person', label: 'Users'}},
      {path: 'tasks', component: TaskComponent, data: {icon: 'task', label: 'Tasks'}}
    ]
}
  
];
