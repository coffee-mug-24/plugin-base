
export class PluBaNavigator {

    constructor(private window: Window) {
    }

    goTo(href: string): void {
        console.log('opening href ' + href);
        this.window.location.href = href;
    }

    currentUrl(): string {
        return this.window.location.href;
    }

    hostHref(): string {
        return this.currentUrl().substr(0, this.currentUrl().indexOf('\/mars\/'));
    }

}
