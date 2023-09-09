import './forms.pcss'

import {classJoin, mergeRefs} from '@slimr/react'
import {forwardRef} from 'react'

type Els = JSX.IntrinsicElements

type BaseProps = {
  divProps?: Parameters<typeof Div>[0]
  eagerValidate?: boolean
  error?: string
  label: string
  labelProps?: Omit<Els['label'], 'htmlFor'>
  name: string
  validator?: (val: string) => string | null
}

type InputProps = Omit<Els['input'], 'id' | 'name'> & BaseProps
type RadioProps = Omit<InputProps, 'label'> & {
  innerDivProps?: Els['div']
  options: {label: string; value: string}[]
}
type SelectProps = Omit<Els['select'], 'id' | 'name'> &
  BaseProps & {
    options: {label: string; value: string}[]
    optionProps?: Els['option']
  }
type TextareaProps = Omit<Els['textarea'], 'id' | 'name'> & BaseProps

/**
 * An input with type=checkbox and label and error handling
 */
export const Checkbox = forwardRef(function Checkbox(
  {
    eagerValidate,
    error: errorForwarded,
    divProps,
    label,
    labelProps,
    onBlur,
    onChange,
    validator,
    ...inputProps
  }: InputProps,
  refForwarded
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [errorLocal, setErrorLocal] = useState<string | null | undefined>(errorForwarded)
  const [hasBlurred, setHasBlurred] = useState(false)
  const onValidate = () => {
    const input = inputRef.current
    if (input && validator) {
      input.error = validator(input.value)
      setErrorLocal(input.error)
    }
  }

  useEffect(() => {
    onValidate()
  }, [])
  useEffect(() => {
    if (errorForwarded) {
      const input = inputRef.current
      if (input) {
        input.error = errorForwarded
      }
    }
    setErrorLocal(errorForwarded)
  }, [errorForwarded])

  return (
    <Div
      {...divProps}
      data-error={!!errorLocal}
      className={classJoin('checkbox-div', divProps?.className)}
    >
      <input
        id={inputProps.name}
        onChange={e => {
          onValidate()
          onChange?.(e as TSFIXME)
        }}
        onBlur={e => {
          onValidate()
          setHasBlurred(true)
          onBlur?.(e as TSFIXME)
        }}
        ref={mergeRefs([inputRef, refForwarded])}
        type="checkbox"
        {...inputProps}
      />
      <label {...labelProps} htmlFor={inputProps.name}>
        {label}
      </label>
      <GenericError error={(eagerValidate || hasBlurred) && errorLocal} style={{marginBottom: 0}} />
    </Div>
  )
})

/**
 * A generic error to display at the bottom of a form
 */
export function GenericError({
  error,
  ...divProps
}: Parameters<typeof Div>[0] & {error?: string | false | null}) {
  return error ? (
    <Div {...divProps} className="small generic-error">
      {error}
    </Div>
  ) : null
}

/**
 * An input with label, error, and validation handling
 */
export const Input = forwardRef(function Input(
  {
    eagerValidate,
    error: errorForwarded,
    divProps,
    label,
    labelProps,
    onBlur,
    onChange,
    validator,
    ...inputProps
  }: InputProps,
  refForwarded
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [errorLocal, setErrorLocal] = useState<string | null | undefined>(errorForwarded)
  const [hasBlurred, setHasBlurred] = useState(false)
  const onValidate = () => {
    const input = inputRef.current
    if (input && validator) {
      input.error = validator(input.value)
      setErrorLocal(input.error)
    }
  }

  useEffect(() => {
    onValidate()
  }, [])
  useEffect(() => {
    if (errorForwarded) {
      const input = inputRef.current
      if (input) {
        input.error = errorForwarded
      }
    }
    setErrorLocal(errorForwarded)
  }, [errorForwarded])

  return (
    <Div
      {...divProps}
      className={classJoin('input-div', divProps?.className)}
      data-error={!!errorLocal}
      data-disabled={inputProps.disabled}
    >
      <label {...labelProps} htmlFor={inputProps.name}>
        {label}
      </label>
      <input
        id={inputProps.name}
        onChange={e => {
          onValidate()
          onChange?.(e)
        }}
        onBlur={e => {
          onValidate()
          setHasBlurred(true)
          onBlur?.(e)
        }}
        ref={mergeRefs([inputRef, refForwarded])}
        {...inputProps}
      />
      <GenericError error={(eagerValidate || hasBlurred) && errorLocal} style={{marginBottom: 0}} />
    </Div>
  )
})

/**
 * A set of radio inputs with label and error handling
 */
export function Radios({
  divProps,
  innerDivProps,
  error,
  labelProps,
  options,
  ...inputProps
}: RadioProps) {
  return (
    <Div
      {...divProps}
      data-error={!!error}
      className={classJoin('checkbox-div', divProps?.className)}
    >
      {options.map(({label, value}, i) => (
        <div key={i} {...innerDivProps}>
          <input {...inputProps} id={value} value={value} type="radio" />
          <label {...labelProps} htmlFor={value}>
            {label}
          </label>
        </div>
      ))}
      <GenericError error={error} style={{marginBottom: 0}} />
    </Div>
  )
}

/**
 * A select wrapper with label and error handling
 */
export function Select({
  divProps,
  error,
  label,
  labelProps,
  options,
  optionProps,
  ...selectProps
}: SelectProps) {
  return (
    <Div
      {...divProps}
      data-error={!!error}
      className={classJoin('select-div', divProps?.className)}
    >
      <label {...labelProps}>{label}</label>
      <select {...selectProps}>
        {options.map(({label, value}, i) => (
          <option {...optionProps} key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
      <GenericError error={error} style={{marginBottom: 0}} />
    </Div>
  )
}

/**
 * An textarea with label and error handling
 */
export const Textarea = forwardRef(function Textarea(
  {
    eagerValidate,
    error: errorForwarded,
    divProps,
    label,
    labelProps,
    onBlur,
    onChange,
    validator,
    ...inputProps
  }: TextareaProps,
  refForwarded
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [errorLocal, setErrorLocal] = useState<string | null | undefined>(errorForwarded)
  const [hasBlurred, setHasBlurred] = useState(false)
  const onValidate = () => {
    const input = inputRef.current
    if (input && validator) {
      input.error = validator(input.value)
      setErrorLocal(input.error)
    }
  }

  useEffect(() => {
    onValidate()
  }, [])
  useEffect(() => {
    if (errorForwarded) {
      const input = inputRef.current
      if (input) {
        input.error = errorForwarded
      }
    }
    setErrorLocal(errorForwarded)
  }, [errorForwarded])

  return (
    <Div
      {...divProps}
      className={classJoin('input-div', divProps?.className)}
      data-error={!!errorLocal}
      data-disabled={inputProps.disabled}
    >
      <label {...labelProps} htmlFor={inputProps.name}>
        {label}
      </label>
      <textarea
        id={inputProps.name}
        onChange={e => {
          onValidate()
          onChange?.(e)
        }}
        onBlur={e => {
          onValidate()
          setHasBlurred(true)
          onBlur?.(e)
        }}
        ref={mergeRefs([inputRef, refForwarded])}
        {...inputProps}
      />
      <GenericError error={(eagerValidate || hasBlurred) && errorLocal} style={{marginBottom: 0}} />
    </Div>
  )
})
