import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const object = {
    type,
    value,
    onChange,
    reset
  }

  // "Hide" the 'reset' so it doesn't show up when using the
  // spread operator in the input element in forms.
  Object.defineProperty(object, 'reset', { enumerable: false })

  return object
}