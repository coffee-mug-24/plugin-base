import { PluBaEventBus, PluBaEventCallback, PluBaEventEmitter, PluBaEventRegistrar } from "./PluBaEventBus";
import { PluBaSettings } from "./PluBaSettings";
import { PluBaNavigator } from "./PluBaNavigator";
export declare class PluBaWorld implements PluBaEventEmitter, PluBaEventRegistrar {
    private eventBus;
    settings: PluBaSettings;
    navigator: PluBaNavigator;
    $: JQueryStatic;
    constructor(eventBus: PluBaEventBus, settings: PluBaSettings, navigator: PluBaNavigator, $: JQueryStatic);
    emit(type: string, event: object): void;
    on(type: string, handler: PluBaEventCallback): void;
}
