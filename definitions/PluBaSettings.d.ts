/// <reference types="global" />
import StorageArea = browser.storage.StorageArea;
export declare class PluBaSettingsKeys {
    static readonly KEY_DISPLAY_ENABLED: string;
}
export interface PluBaSettings {
    setSetting(key: string, value: string): Promise<void>;
    getSetting(key: string): Promise<string>;
    booleanSettingOrDefault(key: string, defaultValue: boolean): Promise<boolean>;
}
export declare abstract class AbstractPluBaSettings implements PluBaSettings {
    abstract setSetting(key: string, value: string): Promise<void>;
    abstract getSetting(key: string): Promise<string>;
    booleanSettingOrDefault(key: string, defaultValue: boolean): Promise<boolean>;
}
export declare class BrowserPluBaSettings extends AbstractPluBaSettings {
    private _storage;
    constructor(_storage: StorageArea);
    setSetting(key: string, value: string): Promise<void>;
    getSetting(key: string): Promise<string>;
}
export declare class InMemoryPluBaSettings extends AbstractPluBaSettings implements PluBaSettings {
    _store: {
        [key: string]: string;
    };
    setSetting(key: string, value: string): Promise<void>;
    getSetting(key: string): Promise<string>;
}
