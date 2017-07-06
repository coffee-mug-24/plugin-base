import {PluBaWorld} from "./PluBaWorld";
import {PluBaPage} from "./PluBaPage";
import {PluBaPlugin} from "./PluBaPlugin";

export interface PluBaPluginComponentConstructor {
    new (): PluBaPluginComponent;
}

export interface PluBaPluginComponent {

    setup(plugin: PluBaPlugin, world: PluBaWorld, page: PluBaPage): void;

    beforeInitialize(): void;

    initialize(): void;

    afterInitialize(): void;

    isApplicable(page: PluBaPage): boolean;

    activate(): void;

    deactivate(): void;

    isActive(): boolean;

}

export abstract class AbstractPluBaPluginComponent implements PluBaPluginComponent {

    private _plugin: PluBaPlugin;
    private _world: PluBaWorld;
    private _page: PluBaPage;

    private active: boolean = false;

    setup(plugin: PluBaPlugin, world: PluBaWorld, page: PluBaPage): void {
        this._plugin = plugin;
        this._world = world;
        this._page = page;
        this.afterSetup();
    }

    get plugin(): PluBaPlugin {
        if (!this._plugin) {
            throw new Error('plugin not initialized - invoke "setup"!')
        }
        return this._plugin;
    }

    get world(): PluBaWorld {
        if (!this._world) {
            throw new Error('world not initialized - invoke "setup"!')
        }
        return this._world;
    }

    get page(): PluBaPage {
        if (!this._page) {
            throw new Error('page not initialized - invoke "setup"!')
        }
        return this._page;
    }

    get jQuery(): JQueryStatic {
        if (!this._page) {
            throw new Error('jQuery not initialized - invoke "setup"!')
        }
        return this.world.$;
    }

    afterSetup(): void {
    }

    beforeInitialize(): void {
    }

    initialize(): void {
    }

    afterInitialize(): void {
    }

    isApplicable(page: PluBaPage): boolean {
        return true;
    }

    activate(): void {
        if (this.isActive() === true) {
            throw new Error('already active');
        }
        this.active = true;
        this.onActivation();
    }

    onActivation(): void {
    }

    deactivate(): void {
        if (this.isActive() === false) {
            throw new Error('already inactive');
        }
        this.active = false;
        this.onDeactivation();
    }

    onDeactivation(): void {
    }

    isActive(): boolean {
        return this.active;
    }

}
