/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_CUSTOM_ENV_VARIABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
