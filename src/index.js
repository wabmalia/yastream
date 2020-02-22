function stream(array) {
    array = array || []
    const operations = []
    return {
        operations,
        log: function () {
            console.log(array);
            console.log(operations);
        },
        map: function (mapper) {
            this.operations.push(_map(mapper));
            return this;
        },
        filter: function (condition) {
            this.operations.push(_filter(condition));
            return this;
        },

        reduce: reduce(array, operations),
        count: count(array, operations),
        findFirst: findFirst(array, operations),
        do: execute(array, operations),
    }
}

function _process(operations, value) {
    let transformedValue = value;
    for (const op of operations) {
        result = op(transformedValue);
        if (result.finish) return;
        transformedValue = result.value
    }
    return transformedValue
}

function _map(mapper) {
    return function (value) {
        return ({ finish: false, value: mapper(value) })
    }
}

function _filter(condition) {
    return function (value) {
        return ({ finish: !condition(value), value: value })
    }
}

function execute(array, operations) {
    return () => {
        const res = [];
        array.forEach(value => {
            let newValue = _process(operations, value);
            newValue && res.push(newValue);
        })
        return res;
    }
}

function findFirst(array, operations) {
    return function (condition) {
        operations.push(_filter(condition));
        for (const value of array) {
            const processedValue = _process(operations, value);
            if (processedValue) {
                return processedValue;
            }
        }
        return;
    }
}

function count(array, operations) {
    return function () { return reduce(array, operations)(count => count + 1, 0) }
}

function reduce(array, operations) {
    return function (reducer, acc) {
        array.forEach(value => {
            const processedValue = _process(operations, value)
            if (processedValue) acc = reducer(acc, processedValue);
        })
        return acc;
    }
}

exports.stream = stream;