#!/usr/bin/env node
import { spawnSync } from 'node:child_process'

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Usage: pnpm ts-node <path-to-script>')
  process.exit(1)
}

const normalizedArgs = args.map((arg, index) => {
  if (index === 0 && arg.startsWith('apps/cms/')) {
    return arg.replace(/^apps\/cms\//, '')
  }
  return arg
})

const result = spawnSync('pnpm', ['-C', 'apps/cms', 'exec', 'tsx', ...normalizedArgs], {
  stdio: 'inherit',
})

process.exit(result.status ?? 1)
