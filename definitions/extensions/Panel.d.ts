import { AbstractPluBaPluginComponent } from "../PluBaPluginComponent";
export declare class Panel extends AbstractPluBaPluginComponent {
    private panel;
    private readonly template;
    initialize(): void;
    private _restore(label);
    private _styleElement(element, displayEnabled);
}
