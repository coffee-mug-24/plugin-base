export declare class PluBaEventTypes {
    static PLUGIN_STATUS: string;
    static PAGE_INITIALIZED: string;
    static LOCATION_LOADED: string;
}
export interface PluBaEventCallback {
    (event: PluBaEvent): void;
}
export declare class PluBaEvent {
    readonly type: string;
    readonly details: any;
    constructor(type: string, details: any);
}
export interface PluBaEventBus extends PluBaEventEmitter, PluBaEventRegistrar {
}
export interface PluBaEventEmitter {
    emit(type: string, details: any): void;
}
export interface PluBaEventRegistrar {
    on(type: string, handler: PluBaEventCallback): void;
}
export declare class DefaultPluBaEventBus implements PluBaEventBus {
    private callbacks;
    constructor();
    emit(type: string, details: Object): void;
    on(type: string, callback: PluBaEventCallback): void;
    _reset(): void;
}
