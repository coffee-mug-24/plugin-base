import StorageArea = browser.storage.StorageArea;

export class PluBaSettingsKeys {
    static readonly KEY_DISPLAY_ENABLED: string = 'display.enabled';
}

export interface PluBaSettings {

    setSetting(key: string, value: string) : Promise<void>;

    getSetting(key: string) : Promise<string>;

    booleanSettingOrDefault(key: string, defaultValue: boolean): Promise<boolean>;

}

export abstract class AbstractPluBaSettings implements PluBaSettings {

    abstract setSetting(key: string, value: string) : Promise<void>;

    abstract getSetting(key: string) : Promise<string>;

    booleanSettingOrDefault(key: string, defaultValue: boolean): Promise<boolean> {
        return this.getSetting(key)
            .then((enabled: string) => {
                if (enabled === undefined) {
                    return defaultValue;
                }
                return enabled === 'true';
            });
    }

}

export class BrowserPluBaSettings extends AbstractPluBaSettings {

    constructor(private _storage: StorageArea) {
        super();
    }

    setSetting(key: string, value: string): Promise<void> {
        const options = {[key]: value};
        return this._storage.set(options);
    }

    getSetting(key: string): Promise<string> {
        return this._storage.get(key)
            .then((result: any) => {
                return result[key];
            });
    }

}

export class InMemoryPluBaSettings extends AbstractPluBaSettings implements PluBaSettings {

    _store: {[key: string]: string} = {};

    setSetting(key: string, value: string): Promise<void> {
        this._store[key] = value;
        return Promise.resolve(null);
    }


    getSetting(key: string): Promise<string> {
        return Promise.resolve(this._store[key]);
    }

}
