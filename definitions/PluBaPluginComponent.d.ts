/// <reference types="jquery" />
import { PluBaWorld } from "./PluBaWorld";
import { PluBaPage } from "./PluBaPage";
import { PluBaPlugin } from "./PluBaPlugin";
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
export declare abstract class AbstractPluBaPluginComponent implements PluBaPluginComponent {
    private _plugin;
    private _world;
    private _page;
    private active;
    setup(plugin: PluBaPlugin, world: PluBaWorld, page: PluBaPage): void;
    readonly plugin: PluBaPlugin;
    readonly world: PluBaWorld;
    readonly page: PluBaPage;
    readonly jQuery: JQueryStatic;
    afterSetup(): void;
    beforeInitialize(): void;
    initialize(): void;
    afterInitialize(): void;
    isApplicable(page: PluBaPage): boolean;
    activate(): void;
    onActivation(): void;
    deactivate(): void;
    onDeactivation(): void;
    isActive(): boolean;
}
