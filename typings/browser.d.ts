
interface Browser {
    extension: BrowserExtension;
    storage: StorageExtension;
    runtime: Runtime;
}

interface BrowserExtension {
    getBackgroundPage(): Window;
    getExtensionTabs(windowId?: number): Window[];
    getURL(path: string): string;
    getViews(fetchProperties?: {type?: string, windowsId?: number}): Window[];
    isAllowedFileSchemeAccess(): Promise<boolean>;
    isAllowedIncognitoAccess(): Promise<boolean>;
    setUpdateUrlData(data: string): void;

    inIncognitoContext: boolean;
    lastError: Error;
}

interface StorageExtension {
    local: LocalStorageExtension;
}

interface LocalStorageExtension {
    set(keys: {[key: string]: string} | null): Promise<void>
    get(keys: string | string[] | {[key: string]: string} | null): Promise<{[key: string]: string}>;
}

interface Runtime {
    openOptionsPage(): void;
}

declare const browser: Browser;
