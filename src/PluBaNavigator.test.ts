import {expect} from "chai";

import {PluBaNavigator} from "./PluBaNavigator";

describe('PluBaNavigator', () => {

    it('should return href for root', () => {
        const navigator = new PluBaNavigator(<Window>{ location: { href: 'http://localhost:8080/' }});

        expect(navigator.hostHref()).to.equal('http://localhost:8080/');
    });

    it('should return href for non-root', () => {
        const navigator = new PluBaNavigator(<Window>{ location: { href: 'http://localhost:8080/some/folder/file.html' }});

        expect(navigator.hostHref()).to.equal('http://localhost:8080/');
    });

});
