/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_ADDRESS: string
  readonly VITE_SERVER_PORT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}