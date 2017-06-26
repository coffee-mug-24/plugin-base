import { PluBaWorld } from "./PluBaWorld";
import { PluBaPage } from "./PluBaPage";
export interface PluBaPluginComponentConstructor {
    new (): PluBaPluginComponent;
}
export interface PluBaPluginComponent {
    setup(world: PluBaWorld, page: PluBaPage): void;
    initialize(): void;
    isApplicable(page: PluBaPage): boolean;
    activate(): void;
    deactivate(): void;
    isActive(): boolean;
}
export declare abstract class AbstractPluBaPluginComponent implements PluBaPluginComponent {
    private active;
    setup(world: PluBaWorld, page: PluBaPage): void;
    initialize(): void;
    isApplicable(page: PluBaPage): boolean;
    activate(): void;
    onActivation(): void;
    deactivate(): void;
    onDeactivation(): void;
    isActive(): boolean;
}
