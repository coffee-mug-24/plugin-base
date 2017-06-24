
export class PluBaEventTypes {
    public static PLUGIN_STATUS = 'plugin.status';
    public static PAGE_INITIALIZED = 'pageInitialized';
    public static LOCATION_LOADED = 'locationLoaded';
}

export interface PluBaEventCallback {
    (event: PluBaEvent): void
}

export class PluBaEvent {
    constructor(public readonly type: string, public readonly details: any) {
    }
}

export interface PluBaEventBus extends PluBaEventEmitter, PluBaEventRegistrar {

}

export interface PluBaEventEmitter {
    emit(type: string, details: any): void;
}

export interface PluBaEventRegistrar {
    on(type: string, handler: PluBaEventCallback): void;
}

export class DefaultPluBaEventBus implements PluBaEventBus {

    private callbacks: Map<string, PluBaEventCallback[]> = new Map<string, PluBaEventCallback[]>();

    constructor() {
    }

    emit(type: string, details: Object): void {
        console.log('event emitted ' + type + ' (' + details + ')');
        console.log(details);
        if (!this.callbacks || !this.callbacks.get(type)) {
            return;
        }
        this.callbacks.get(type).forEach((callback: PluBaEventCallback) => {
            try {
                console.log('invoking callback');
                callback(new PluBaEvent(type, details));
            } catch (e) {
                debugger;
                console.error('exception while invoking callback', e);
            }
        });
    }

    on(type: string, callback: PluBaEventCallback): void {
        console.log('callback registered ' + type);
        if (! this.callbacks.get(type)) {
            this.callbacks.set(type, []);
        }
        this.callbacks.get(type).push(callback);
    }

    _reset(): void {
        delete this.callbacks;
    }

}
