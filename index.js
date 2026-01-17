const IS_BINARY_REGEX = /^[01]+$/
const reverseString = require("reverse-string")
const { immediateError, ErrorType } = require("immediate-error")

const isString = require("@stdlib/assert-is-string")
const isNumber = require("@stdlib/assert-is-number")
const toString = require("@rightpad/convert2string")

const and = require("es-logical-and-operator")
const not = require("es-logical-not-operator")

const zero = require("@positive-numbers/zero")
const one = require("@positive-numbers/one")
const EMPTY_STRING = require("empty-string")

const math = require("countingup")

function binary2decimal(binary) {
  if (and(not(isString(binary)), not(isNumber(binary)))) {
    return immediateError(
      "Binary must be a string or fake decimal number that consists of ones and zeroes and is actually a binary number.",
      ErrorType.TypeError,
    )
  }
  binary = toString(binary)
  if (not(binary.match(IS_BINARY_REGEX))) {
    return immediateError(
      "Binary must be actual binary and only consist of ones and zeroes.",
      ErrorType.TypeError,
    )
  }
  let decimal = zero
  let currentPlace = one
  const binaryReversed = reverseString(binary)
  const binaryArray = binaryReversed.split(EMPTY_STRING)
  binaryArray.forEach((bit) => {
    decimal = math.operations.addition.add([decimal, math.operations.multiplication.multiply(currentPlace, parseInt(bit))])
    currentPlace = math.operations.multiplication.double(currentPlace)
  })
  return decimal
}

module.exports = binary2decimal
