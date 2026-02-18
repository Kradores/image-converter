interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_MAX_FILES: number;
    readonly VITE_MAX_FILE_SIZE_MB: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}