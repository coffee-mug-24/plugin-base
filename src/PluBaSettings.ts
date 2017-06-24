/// <reference path="../typings/browser.d.ts" />

export interface PluBaSettings {

    setSetting(key: string, value: string) : Promise<void>;

    getSetting(key: string) : Promise<string>;

}

export class BrowserPluBaSettings implements PluBaSettings {

    constructor(private _storage: LocalStorageExtension) {
    }

    setSetting(key: string, value: string): Promise<void> {
        const options = {[key]: value};
        return this._storage.set(options);
    }

    getSetting(key: string): Promise<string> {
        return this._storage.get(key)
            .then((result) => {
                return result[key];
            });
    }

}

export class InMemoryPluBaSettings implements PluBaSettings {

    _store: {[key: string]: string} = {};

    setSetting(key: string, value: string): Promise<void> {
        this._store[key] = value;
        return Promise.resolve(null);
    }


    getSetting(key: string): Promise<string> {
        return Promise.resolve(this._store[key]);
    }

}
