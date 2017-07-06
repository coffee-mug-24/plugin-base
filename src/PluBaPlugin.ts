import {PluBaWorld} from "./PluBaWorld";
import {PluBaEvent, PluBaEventTypes} from "./PluBaEventBus";
import {PluBaPluginComponent, PluBaPluginComponentConstructor} from "./PluBaPluginComponent";
import {PluBaPage} from "./PluBaPage";
import {Panel} from "./extensions/Panel";
import {PluBaSettingsKeys} from "./PluBaSettings";

const KEY_DISPLAY_ENABLED: string = PluBaSettingsKeys.KEY_DISPLAY_ENABLED;

export class PluBaPlugin {

    private _state: string = null;

    private _pluginComponentCandidates: PluBaPluginComponent[] = [];
    private _pluginComponents: PluBaPluginComponent[] = [];

    constructor(private readonly world: PluBaWorld, private readonly page: PluBaPage, private readonly componentConstructors: PluBaPluginComponentConstructor[], public readonly configuration: PluBaConfiguration) {
        if (configuration.panelize) {
            componentConstructors.push(Panel);
        }
    }

    setup() {
        console.log('Plugin :: Setup Start');

        this._construct(this.componentConstructors, this._pluginComponentCandidates);

        this.world.on(PluBaEventTypes.PAGE_INITIALIZED, () => {
            this.world.settings.booleanSettingOrDefault(KEY_DISPLAY_ENABLED, this.configuration.enabledByDefault)
                .then((displayEnabled: boolean) => {
                    if (this._state === 'active') {
                        return;
                    }
                    if (!displayEnabled) {
                        return;
                    }
                    this.world.emit(PluBaEventTypes.PLUGIN_STATUS, {newValue: 'active'});
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

        this._pluginComponents = this._pluginComponentCandidates
            .filter((pluginComponent => pluginComponent.isApplicable(this.page)));
        this._pluginComponents.forEach((pluginComponent) => {
            pluginComponent.beforeInitialize();
        });
        this._pluginComponents.forEach((pluginComponent) => {
            pluginComponent.initialize();
        });
        this._pluginComponents.forEach((pluginComponent) => {
            pluginComponent.afterInitialize();
        });

        this.page.markInitialized();

        this.world.emit(PluBaEventTypes.LOCATION_LOADED, {
            hostHref: this.world.navigator.hostHref(),
            currentUrl: this.world.navigator.currentUrl()
        });

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
                    instance.setup(this, this.world, this.page);
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

export class PluBaConfiguration {

    public panelize?: boolean = false;
    public label?: string = null;
    public enabledByDefault?: boolean = false;
}
