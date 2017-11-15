/// <reference types="jquery" />

import {PluBaWorld} from "./PluBaWorld";

export const INITIALIZED_KEY = 'tofInitialized';

export class PluBaPage {

    private _body: JQuery = null;

    constructor(protected world: PluBaWorld, public readonly bodySelector: string) {
    }

    body(): JQuery {
        if (this._body === null) {
            const lookupResult = this.world.$(this.bodySelector);
            if (lookupResult.length !== 1) {
                throw Error(`No body found with selector '${this.bodySelector}'`);
            }
            this._body = this.world.$(lookupResult[0]);
        }
        return this._body;
    }

    markInitialized(): void {
        if (this.isInitialized()) {
            return;
        }
        this.body().attr('data-' + INITIALIZED_KEY, 'initialized');
    }

    isInitialized(): boolean {
        return this.body().attr('data-' + INITIALIZED_KEY) === 'initialized';
    }

}
