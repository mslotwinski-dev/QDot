export {}

declare global {
  interface Window {
    myWindowAPI?: {
      minimize: () => void
      toggleMaximize: () => void
      close: () => void
    }
  }
}
