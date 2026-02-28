import * as migration_20260227_000610 from './20260227_000610';
import * as migration_20260228_122711 from './20260228_122711';

export const migrations = [
  {
    up: migration_20260227_000610.up,
    down: migration_20260227_000610.down,
    name: '20260227_000610',
  },
  {
    up: migration_20260228_122711.up,
    down: migration_20260228_122711.down,
    name: '20260228_122711'
  },
];
