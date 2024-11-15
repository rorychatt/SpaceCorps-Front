import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  loadComponent: async () => {
    const module = await import('./home/home.component');
    return module.HomeComponent;
  },
},
  {
    path: 'login',
    loadComponent: async () => {
      const module = await import('./login/login.component');
      return module.LoginComponent;
    }
  },
  {
    path: 'lobby',
    loadComponent: async () => {
      const module = await import('./lobby/lobby.component');
      return module.LobbyComponent;
    }
  },
  {
    path: 'pilot-info',
    loadComponent: async () => {
      const module = await import('./pilot-info/pilot-info.component');
      return module.PilotInfoComponent;
    }
  },
  {
    path: 'game',
    loadComponent: async () => {
      const module = await import('./game/game.component');
      return module.GameComponent;
    }
  },
  {
    path: 'spacemap-editor',
    loadComponent: async () => {
      const module = await import('./spacemap-editor/spacemap-editor.component');
      return module.SpacemapEditorComponent;
    }
  }
];
