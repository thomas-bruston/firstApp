import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found')
        .then(m => m.NotFound)
  }
];