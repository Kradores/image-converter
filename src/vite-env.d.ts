interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly API_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}