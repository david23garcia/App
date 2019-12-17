import maxLength from 'vuelidate/src/validators/maxLength'
import minLength from 'vuelidate/src/validators/minLength'
import email from 'vuelidate/src/validators/email'

const validations = {
  name: { required, maxLength: maxLength(10) },
    surname1: { required, maxLength: maxLength(10) },
    surname2: { maxLength: maxLength(10) },
  email: { required, email },
  phone: { required, maxLength: maxLength(9), phoneExpression },
  password: { required, minLength: minLength(8) },
  description: { required },
  type: { required, maxLength: maxLength(10) },
  street: { required, maxLength: maxLength(25) },
  number: { required, maxLength: maxLength(2) },
  floor: { required, maxLength: maxLength(3) },
  letter: { required, maxLength: maxLength(1) },
  city: { required, maxLength: maxLength(20) },
  province: { required, maxLength: maxLength(15) },
  state: { required, maxLength: maxLength(15) },
  cv: { required, maxLength: maxLength(5) }

}
const phoneExpression = '/^[9|6|7][0-9]{8}$/'

export const nameErrors = function() {
  const errors = []
  if (!this.$v.name.$dirty) { return errors }
  !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
  !this.$v.name.required && errors.push('Name is required.')
  return errors
}
export const surname1Errors = function() {
  const errors = []
  if (!this.$v.surname1.$dirty) { return errors }
  !this.$v.surname1.maxLength && errors.push('surname must be at most 10 characters long')
  !this.$v.surname1.required && errors.push('surname is required.')
  return errors
}
export const surname2Errors = function() {
  const errors = []
  if (!this.$v.surname2.$dirty) { return errors }
  !this.$v.surname2.maxLength && errors.push('surname must be at most 10 characters long')
  return errors
}
export const emailErrors = function() {
  const errors = []
  if (!this.$v.email.$dirty) { return errors }
  // !this.$v.email.maxLength && errors.push('Must be valid e-mail')
  !this.$v.email.required && errors.push('E-mail is required')
  return errors
}
export const phoneErrors = function() {
  const errors = []
  if (!this.$v.phone.$dirty) { return errors }
  !this.$v.phone.maxLength && errors.push('phone must be at most 9 characters long')
  !this.$v.phone.required && errors.push('phone is required.')
  return errors
}
export const descriptionErrors = function() {
  const errors = []
  if (!this.$v.description.$dirty) { return errors }
  !this.$v.description.required && errors.push('surname is required.')
  return errors
}
export const typeErrors = function() {
  const errors = []
  if (!this.$v.type.$dirty) { return errors }
  !this.$v.type.maxLength && errors.push('tipo erroneo')
  !this.$v.type.required && errors.push('surname is required.')
  return errors
}
export const streetErrors = function() {
  const errors = []
  if (!this.$v.street.$dirty) { return errors }
  !this.$v.street.maxLength && errors.push('calle incorrecta')
  !this.$v.street.required && errors.push('surname is required.')
  return errors
}
export const numberErrors = function() {
  const errors = []
  if (!this.$v.number.$dirty) { return errors }
  !this.$v.number.maxLength && errors.push('numero erroneo')
  !this.$v.number.required && errors.push('surname is required.')
  return errors
}
export const floorErrors = function() {
  const errors = []
  if (!this.$v.floor.$dirty) { return errors }
  !this.$v.floor.maxLength && errors.push('piso incorrecto')
  !this.$v.floor.required && errors.push('surname is required.')
  return errors
}
export const letterErrors = function() {
  const errors = []
  if (!this.$v.letter.$dirty) { return errors }
  !this.$v.letter.maxLength && errors.push('letra erronea')
  !this.$v.letter.required && errors.push('surname is required.')
  return errors
}
export const cityErrors = function() {
  const errors = []
  if (!this.$v.city.$dirty) { return errors }
  !this.$v.city.maxLength && errors.push('ciudad incorrecta')
  !this.$v.city.required && errors.push('surname is required.')
  return errors
}
export const provinceErrors = function() {
  const errors = []
  if (!this.$v.province.$dirty) { return errors }
  !this.$v.province.maxLength && errors.push('provincia incorrecto')
  !this.$v.province.required && errors.push('surname is required.')
  return errors
}
export const stateErrors = function() {
  const errors = []
  if (!this.$v.state.$dirty) { return errors }
  !this.$v.state.maxLength && errors.push('pais incorrecto')
  !this.$v.state.required && errors.push('surname is required.')
  return errors
}
export const cvErrors = function() {
  const errors = []
  if (!this.$v.cv.$dirty) { return errors }
  !this.$v.cv.maxLength && errors.push('codigo postal erroneo')
  !this.$v.cv.required && errors.push('surname is required.')
  return errors
}
