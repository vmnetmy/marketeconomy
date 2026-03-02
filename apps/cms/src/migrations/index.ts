import * as migration_20260227_000610 from './20260227_000610';
import * as migration_20260228_122711 from './20260228_122711';
import * as migration_20260228_162519 from './20260228_162519';
import * as migration_20260228_213713 from './20260228_213713';
import * as migration_20260301_160825 from './20260301_160825';
import * as migration_20260301_184518 from './20260301_184518';
import * as migration_20260302_003910 from './20260302_003910';
import * as migration_20260302_004907 from './20260302_004907';

export const migrations = [
  {
    up: migration_20260227_000610.up,
    down: migration_20260227_000610.down,
    name: '20260227_000610',
  },
  {
    up: migration_20260228_122711.up,
    down: migration_20260228_122711.down,
    name: '20260228_122711',
  },
  {
    up: migration_20260228_162519.up,
    down: migration_20260228_162519.down,
    name: '20260228_162519',
  },
  {
    up: migration_20260228_213713.up,
    down: migration_20260228_213713.down,
    name: '20260228_213713',
  },
  {
    up: migration_20260301_160825.up,
    down: migration_20260301_160825.down,
    name: '20260301_160825',
  },
  {
    up: migration_20260301_184518.up,
    down: migration_20260301_184518.down,
    name: '20260301_184518',
  },
  {
    up: migration_20260302_003910.up,
    down: migration_20260302_003910.down,
    name: '20260302_003910',
  },
  {
    up: migration_20260302_004907.up,
    down: migration_20260302_004907.down,
    name: '20260302_004907'
  },
];
