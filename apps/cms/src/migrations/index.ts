import * as migration_20260227_000610 from './20260227_000610';

export const migrations = [
  {
    up: migration_20260227_000610.up,
    down: migration_20260227_000610.down,
    name: '20260227_000610'
  },
];
