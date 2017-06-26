/// <reference path="../typings/browser.d.ts" />
export interface PluBaSettings {
    setSetting(key: string, value: string): Promise<void>;
    getSetting(key: string): Promise<string>;
}
export declare class BrowserPluBaSettings implements PluBaSettings {
    private _storage;
    constructor(_storage: LocalStorageExtension);
    setSetting(key: string, value: string): Promise<void>;
    getSetting(key: string): Promise<string>;
}
export declare class InMemoryPluBaSettings implements PluBaSettings {
    _store: {
        [key: string]: string;
    };
    setSetting(key: string, value: string): Promise<void>;
    getSetting(key: string): Promise<string>;
}
