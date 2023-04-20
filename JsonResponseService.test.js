const JsonResponseService = require('./JsonResponseService')

describe('JsonResponseService', () => {

    test('tests default params returned by json function', () => {
        expect(JsonResponseService('hello')).toStrictEqual({"message":"hello","data":[],"status":200})
    })

    test('checks return type is object', () => {
        let res = JsonResponseService('hello')
        expect(typeof res).toBe('object')
    })

})