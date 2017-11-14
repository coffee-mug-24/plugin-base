export declare class PluBaNavigator {
    private window;
    constructor(window: Window);
    goTo(href: string): void;
    currentUrl(): string;
    currentHostname(): string;
    hostHref(): string;
    currentHref(): string;
}
