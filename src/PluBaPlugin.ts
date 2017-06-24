import {PluBaWorld} from "./PluBaWorld";
import {PluBaEvent, PluBaEventTypes} from "./PluBaEventBus";
import {PluBaPluginComponent, PluBaPluginComponentConstructor} from "./PluBaPluginComponent";
import {PluBaPage} from "./PluBaPage";

export class PluBaPlugin {

    private _state: string = null;

    private _pluginComponentCandidates: PluBaPluginComponent[] = [];
    private _pluginComponents: PluBaPluginComponent[] = [];

    constructor(private world: PluBaWorld, private page: PluBaPage, private componentConstructors: PluBaPluginComponentConstructor[]) {
    }

    setup() {
        console.log('Plugin :: Setup Start');

        this._construct(this.componentConstructors, this._pluginComponentCandidates);

        this.world.on(PluBaEventTypes.PAGE_INITIALIZED, () => {
            this.world.settings.getSetting('display.enabled')
                .then((enabled: string) => {
                    if (enabled === undefined || (this._state !== 'active' && !!enabled)) {
                        this.world.emit(PluBaEventTypes.PLUGIN_STATUS, {newValue: 'active'});
                    }
                });
        });

        this.world.on(PluBaEventTypes.PLUGIN_STATUS, (event: PluBaEvent) => {
            if (this._state !== 'active' && (event.details as any).newValue === 'active') {
                this.activate();
            }
        });

        this.world.on(PluBaEventTypes.PLUGIN_STATUS, (event: PluBaEvent) => {
            if (this._state !== 'inactive' && (event.details as any).newValue === 'inactive') {
                this.deactivate();
            }
        });

        this.world.on('navigationRequest', (event: PluBaEvent) => {
            this.world.navigator.goTo(((event.details as any).href as string));
        });

        this._state = 'set up';

        console.log('Plugin :: Setup End');
    }

    initialize() {
        console.log('Plugin :: Initialize Start');

        this.world.emit(PluBaEventTypes.LOCATION_LOADED, {
            hostHref: this.world.navigator.hostHref(),
            currentUrl: this.world.navigator.currentUrl()
        });

        this._pluginComponentCandidates.forEach((pluginComponent: PluBaPluginComponent) => {
            if (pluginComponent.isApplicable(this.page)) {
                pluginComponent.initialize();
                this._pluginComponents.push(pluginComponent)
            }
        });

        this.page.markInitialized();

        this.world.emit(PluBaEventTypes.PAGE_INITIALIZED, {
            page: this.page
        });

        this._state = 'initialized';

        console.log('Plugin :: Initialize End');
    }

    activate() {
        this._pluginComponents.forEach((pluginComponent) => {
            pluginComponent.activate();
        });

        this._state = 'active';
    }

    deactivate() {
        this._pluginComponents.forEach((pluginComponent) => {
            pluginComponent.deactivate();
        });

        this._state = 'inactive';
    }

    _construct<T extends PluBaPluginComponent>(constructors: {new (): T}[], target: Array<T>): void {
        constructors.forEach((constructor) => {
            try {
                const instance: T = new constructor();
                try {
                    instance.setup(this.world, this.page);
                    target.push(instance);
                } catch (e) {
                    debugger;
                    console.error('Failed to add component', e);
                }
            } catch (e) {
                debugger;
                console.error('Failed to instantiate or setup component');
            }
        });
    }

}
