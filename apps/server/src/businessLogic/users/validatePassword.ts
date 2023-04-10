export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[`A`-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return passwordRegex.test(password)
}
