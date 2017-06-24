import {PluBaEventBus, PluBaEventCallback, PluBaEventEmitter, PluBaEventRegistrar} from "./PluBaEventBus";
import {PluBaSettings} from "./PluBaSettings";
import {PluBaNavigator} from "./PluBaNavigator";

export class PluBaWorld implements PluBaEventEmitter, PluBaEventRegistrar {

    constructor(private eventBus: PluBaEventBus, public settings: PluBaSettings, public navigator: PluBaNavigator, public $: JQueryStatic) {
    }

    emit(type: string, event: object): void {
        this.eventBus.emit(type, event);
    }

    on(type: string, handler: PluBaEventCallback): void {
        this.eventBus.on(type, handler);
    }

}
