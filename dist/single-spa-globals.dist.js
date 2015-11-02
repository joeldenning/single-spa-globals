"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appWithGlobals = appWithGlobals;
function appWithGlobals(listOfGlobals) {
    if (!Array.isArray(listOfGlobals)) {
        throw new Error("The list of globals (i.e., an array of strings) is required");
    }
    var globals = {};
    return {
        applicationWillMount: function applicationWillMount() {
            return new Promise(function (resolve) {
                for (var index in listOfGlobals) {
                    var nameOfGlobal = listOfGlobals[index];
                    if (globals[nameOfGlobal]) {
                        window[nameOfGlobal] = globals[nameOfGlobal];
                    }
                }
                resolve();
            });
        },
        applicationWasUnmounted: function applicationWasUnmounted() {
            return new Promise(function (resolve) {
                for (var index in listOfGlobals) {
                    var nameOfGlobal = listOfGlobals[index];
                    globals[nameOfGlobal] = window[nameOfGlobal];
                    try {
                        delete window[nameOfGlobal];
                    } catch (ex) {
                        //browsers don't let you delete properties that were created with 'var', so the best we can do is set to undefined
                        window[nameOfGlobal] = undefined;
                    }
                }
                resolve();
            });
        }
    };
}

//# sourceMappingURL=single-spa-globals.dist.js.map