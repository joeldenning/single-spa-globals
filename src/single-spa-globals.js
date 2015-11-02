export function appWithGlobals(listOfGlobals) {
    if (!Array.isArray(listOfGlobals)) {
        throw new Error(`The list of globals (i.e., an array of strings) is required`);
    }
    let globals = {};
    return {
        applicationWillMount: function() {
            return new Promise((resolve) => {
                for (let index in listOfGlobals) {
                    const nameOfGlobal = listOfGlobals[index];
                    if (globals[nameOfGlobal]) {
                        window[nameOfGlobal] = globals[nameOfGlobal];
                    }
                }
                resolve();
            });
        },
        applicationWasUnmounted: function() {
            return new Promise((resolve) => {
                for (let index in listOfGlobals) {
                    const nameOfGlobal = listOfGlobals[index];
                    globals[nameOfGlobal] = window[nameOfGlobal];
                    try {
                        delete window[nameOfGlobal];
                    } catch(ex) {
                        //browsers don't let you delete properties that were created with 'var', so the best we can do is set to undefined
                        window[nameOfGlobal] = undefined;
                    }
                }
                resolve();
            });
        }
    }
}
