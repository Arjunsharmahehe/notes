import "@tiptap/core"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    toggleNodeBackgroundColor: (color: string) => ReturnType
    unsetNodeBackgroundColor: () => ReturnType
  }

  interface ChainedCommands {
    toggleNodeBackgroundColor: (color: string) => this
    unsetNodeBackgroundColor: () => this
  }

  interface CanCommands {
    toggleNodeBackgroundColor: (color: string) => boolean
    unsetNodeBackgroundColor: () => boolean
  }
}

export {}
