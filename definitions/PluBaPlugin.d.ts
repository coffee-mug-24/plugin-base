import { PluBaWorld } from "./PluBaWorld";
import { PluBaPluginComponent, PluBaPluginComponentConstructor } from "./PluBaPluginComponent";
import { PluBaPage } from "./PluBaPage";
export declare class PluBaPlugin {
    private world;
    private page;
    private componentConstructors;
    private _state;
    private _pluginComponentCandidates;
    private _pluginComponents;
    constructor(world: PluBaWorld, page: PluBaPage, componentConstructors: PluBaPluginComponentConstructor[]);
    setup(): void;
    initialize(): void;
    activate(): void;
    deactivate(): void;
    _construct<T extends PluBaPluginComponent>(constructors: {
        new (): T;
    }[], target: Array<T>): void;
}
