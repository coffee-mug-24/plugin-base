/// <reference types="jquery" />
import { PluBaWorld } from "./PluBaWorld";
export declare const INITIALIZED_KEY = "tofInitialized";
export declare class PluBaPage {
    protected world: PluBaWorld;
    readonly bodySelector: string;
    private _body;
    constructor(world: PluBaWorld, bodySelector: string);
    body(): JQuery;
    markInitialized(): void;
    isInitialized(): boolean;
}
