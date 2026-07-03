import { Plugin } from "vue"

// @ts-ignore because Intellij does not understand imports within Lerna monorepos
import {
  defineCustomElements,
} from "@orchestra-kit/core/loader"

export const ComponentLibrary: Plugin = {
  async install() {
    defineCustomElements()
  },
}
