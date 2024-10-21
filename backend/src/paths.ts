import path from 'path'
import { packageUpSync } from 'package-up'

const backendPackageJson = packageUpSync({
  cwd: import.meta.dirname,
}) as string

export const backendDir = path.dirname(backendPackageJson)
export const rootDir = path.resolve(backendDir, '..')
