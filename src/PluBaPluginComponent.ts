import {PluBaWorld} from "./PluBaWorld";
import {PluBaPage} from "./PluBaPage";

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

export abstract class AbstractPluBaPluginComponent implements PluBaPluginComponent {

    private active: boolean = false;

    setup(world: PluBaWorld, page: PluBaPage): void {
    }

    initialize(): void {
    }

    isApplicable(page: PluBaPage): boolean {
        return true;
    }

    activate(): void {
        if (this.isActive() === true) {
            debugger;
            throw new Error('already active');
        }
        this.active = true;
        this.onActivation();
    }

    onActivation(): void {
    }

    deactivate(): void {
        if (this.isActive() === false) {
            debugger;
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
