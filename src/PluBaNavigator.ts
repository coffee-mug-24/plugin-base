
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

    currentHostname(): string {
        return new URL(this.currentUrl()).hostname;
    }

    hostHref(): string {
        return this.currentHref();
    }

    currentHref(): string {
        const url = new URL(this.currentUrl());
        let result = '';
        if (url.protocol) {
            result += url.protocol + '://';
        }
        result += url.host;
        if (url.port) {
            result += url.port;
        }
        return result;
    }

}
