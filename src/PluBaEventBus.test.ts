/// <reference path="../node_modules/@types/mocha/index.d.ts" />

import * as sinon from "sinon";
import {DefaultPluBaEventBus} from "../src/PluBaEventBus";

describe('PluBaEventBus', () => {

    it('should broadcast events', () => {
        const eventBus = new DefaultPluBaEventBus();
        let callback = sinon.mock();

        eventBus.on('test', callback);
        eventBus.emit('test', {n: 42});

        sinon.assert.calledOnce(callback);
        sinon.assert.calledWith(callback, {type: 'test', details: {n: 42}});
    });

});
