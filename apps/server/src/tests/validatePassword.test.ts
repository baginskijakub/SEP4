import { validatePassword } from '../businessLogic/users/validatePassword'

describe('PasswordValidator', () => {
  test('validatePassword returns true for valid passwords', () => {
    expect(validatePassword('Password123')).toBe(true)
    expect(validatePassword('Pa!2ordd')).toBe(true)
    expect(validatePassword('mySuperSecretP4ss')).toBe(true)
    expect(validatePassword('Some1passwordWithLongName')).toBe(true)
  })

  test('validatePassword returns false for invalid passwords', () => {
    expect(validatePassword('password')).toBe(false)
    expect(validatePassword('12345678')).toBe(false)
    expect(validatePassword('PASSWORD123')).toBe(false)
    expect(validatePassword('Short1!')).toBe(false)
  })
})
