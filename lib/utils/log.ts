import { isProduction } from "./environment"

export const log = (...args: any[]) => {
  !isProduction() && console.log(...args)
}

export const error = (...args: any[]) => {
  !isProduction() && console.error(...args)
}

export const assert = (condition: boolean, ...args: any[]) => {
  !isProduction() && console.assert(condition, ...args)
}
