import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

// Simple bootstrap without environment file dependency.
platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err: unknown) => console.error(err));
