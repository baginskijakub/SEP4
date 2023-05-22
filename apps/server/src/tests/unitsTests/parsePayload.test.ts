import { parsePayload } from '../../businessLogic/lorawan/handleMessageEvent'

describe('Parse Lorawan message', () => {
  test('Parse payload throws an error, if the payload is invalid', () => {
    const invalidPayload = '123456789'
    expect(() => parsePayload(invalidPayload, 123456789)).toThrowError('Invalid payload')
  })

  test('Parse payload returns correct values, after succesful parsing', () => {
    const validPayload = '00DE013B038E'
    const returnMessage = parsePayload(validPayload, 123456789)
    expect(returnMessage.length).toEqual(3)
    expect(returnMessage[0].value).toEqual(22.2)
    expect(returnMessage[1].value).toEqual(31.5)
    expect(returnMessage[2].value).toEqual(910)

    expect(returnMessage[0].type).toEqual('humidity')
    expect(returnMessage[1].type).toEqual('temperature')
    expect(returnMessage[2].type).toEqual('co2')
  })

  test('Parse payload throws an error, if the payload conatins non-hexadecimal characters', () => {
    const invalidPayload = '00DE013B038Z'
    expect(() => parsePayload(invalidPayload, 123456789)).toThrowError('Invalid payload')
  })
})
