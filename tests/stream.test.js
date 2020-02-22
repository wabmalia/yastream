const { stream } = require("../src/index.js")

describe("Stream", () => {
    it("processes an undefined array as an empty one", () => {
        const result =
            stream()
                .map(value => value * 2)
                .do();

        expect(result).toStrictEqual([]);
    })

    it("transforms the array using the specified function", () => {
        const inputArray = [1, 2, 3, 4];
        const result =
            stream(inputArray)
                .map(value => value * 2)
                .do();

        expect(result).toStrictEqual([2, 4, 6, 8]);
    })

    it("filter the array using the specified criteria", () => {
        const inputArray = [1, 2, 3, 4];
        const result =
            stream(inputArray)
                .filter(value => value > 2)
                .do();

        expect(result).toStrictEqual([3, 4]);
    })

    it("return a reduction of the stream", () => {
        const inputArray = [1, 2, 3, 4];

        const result =
            stream(inputArray)
                .reduce((acc, value) => acc + value, 0)

        expect(result).toBe(10)
    })

    it("returns the count of the stream", () => {
        const inputArray = [1, 2, 3, 4];

        const result =
            stream(inputArray)
                .filter(value => value > 2)
                .count()

        expect(result).toBe(2)
    })

    it("finds the first element that matches a condition without mapping all of them", () => {
        const inputArray = [0, 1, 2, 3, 4];
        const mapper = jest.fn(value => value);
        const result =
            stream(inputArray)
                .map(mapper)
                .findFirst(value => value == 2);

        expect(result).toStrictEqual(2);
        expect(mapper).toHaveBeenCalledTimes(3)
    })

    it("pipelines each operation", () => {
        const inputArray = [1, 2, 3, 4];
        const mapperImpl = value => {
            // console.log("Map: ", value);
            return value + 1;
        }
        const mapper = jest.fn().mockImplementationOnce(mapperImpl);
        const filter = jest.fn(value => {
            // console.log("Filter: ", value);
            mapper.mockImplementationOnce(mapperImpl);
            return value > 2;
        })
        const result =
            stream(inputArray)
                .map(mapper)
                .filter(filter)
                .do();

        expect(result).toStrictEqual([3, 4, 5]);
    })
})