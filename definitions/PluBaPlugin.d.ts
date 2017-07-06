import { PluBaWorld } from "./PluBaWorld";
import { PluBaPluginComponent, PluBaPluginComponentConstructor } from "./PluBaPluginComponent";
import { PluBaPage } from "./PluBaPage";
export declare class PluBaPlugin {
    private readonly world;
    private readonly page;
    private readonly componentConstructors;
    readonly configuration: PluBaConfiguration;
    private _state;
    private _pluginComponentCandidates;
    private _pluginComponents;
    constructor(world: PluBaWorld, page: PluBaPage, componentConstructors: PluBaPluginComponentConstructor[], configuration: PluBaConfiguration);
    setup(): void;
    initialize(): void;
    activate(): void;
    deactivate(): void;
    _construct<T extends PluBaPluginComponent>(constructors: {
        new (): T;
    }[], target: Array<T>): void;
}
export declare class PluBaConfiguration {
    panelize?: boolean;
    label?: string;
    enabledByDefault?: boolean;
}
