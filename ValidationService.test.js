const ValidationService = require('./ValidationService')

describe('ValidationService', () => {

    test('checks the validator outputs correct data', () => {
        expect(ValidationService(['billy', 'knife', 'angry', 'headache', 'drunk', 'four'])).toStrictEqual(['billy', 'knife', 'angry', 'headache', 'drunk', 'four'])
    })

    test('checks the validator only accepts correct data', () => {
        expect(ValidationService(['billy', 'knife', 'angry', 'headache', 'drunk', '756745638     '])).toStrictEqual(['billy', 'knife', 'angry', 'headache', 'drunk'])
    })

    test('checks the validator outputs empty array when given no data', () => {
        expect(ValidationService([])).toStrictEqual([])
    })
})