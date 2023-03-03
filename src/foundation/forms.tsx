import './forms.pcss'

import * as s from '@slimr/styled'

type Els = JSX.IntrinsicElements

type BaseProps = {
  divProps?: Parameters<typeof Div>[0]
  error?: string
  label: string
  labelProps?: Omit<Els['label'], 'htmlFor'>
  name: string
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
export function Checkbox({
  divProps = {},
  error,
  label,
  labelProps = {},
  ...inputProps
}: InputProps) {
  return (
    <Div
      {...divProps}
      data-error={!!error}
      className={s.classJoin('checkbox', divProps?.className)}
    >
      <input {...inputProps} id={inputProps.name} type="checkbox" />
      <label {...labelProps} htmlFor={inputProps.name}>
        {label}
      </label>
      <GenericError error={error} style={{marginBottom: 0}} />
    </Div>
  )
}

/**
 * A generic error to display at the bottom of a form
 */
export function GenericError({error, ...divProps}: Parameters<typeof Div>[0] & {error?: string}) {
  return error ? (
    <Div {...divProps} className="small generic-error">
      {error}
    </Div>
  ) : null
}

/**
 * An input with label and error handling
 */
export function Input({error, divProps, label, labelProps = {}, ...inputProps}: InputProps) {
  if (inputProps.type === 'checkbox') {
    return Checkbox({label, error, divProps, ...inputProps})
  }
  return (
    <Div
      {...divProps}
      className={s.classJoin('input', divProps?.className)}
      data-error={!!error}
      data-disabled={inputProps.disabled}
    >
      <label {...labelProps} htmlFor={inputProps.name}>
        {label}
      </label>
      <input {...inputProps} id={inputProps.name} />
      <GenericError error={error} style={{marginBottom: 0}} />
    </Div>
  )
}

/**
 * A set of radio inputs with label and error handling
 */
export function Radios({
  divProps = {},
  innerDivProps = {},
  error,
  labelProps = {},
  options,
  ...inputProps
}: RadioProps) {
  return (
    <Div
      {...divProps}
      data-error={!!error}
      className={s.classJoin('checkbox', divProps?.className)}
    >
      {options.map(({label, value}) => (
        <div key={value} {...innerDivProps}>
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
  divProps = {},
  error,
  label,
  labelProps,
  options,
  optionProps,
  ...selectProps
}: SelectProps) {
  return (
    <Div {...divProps} data-error={!!error} className={s.classJoin('select', divProps?.className)}>
      <label {...labelProps}>{label}</label>
      <select {...selectProps}>
        {options.map(({label, value}) => (
          <option {...optionProps} key={value} value={value}>
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
export function Textarea({
  error,
  divProps,
  label,
  labelProps = {},
  ...textareaProps
}: TextareaProps) {
  return (
    <Div
      {...divProps}
      className={s.classJoin('input', divProps?.className)}
      data-error={!!error}
      data-disabled={textareaProps.disabled}
    >
      <label {...labelProps} htmlFor={textareaProps.name}>
        {label}
      </label>
      <textarea {...textareaProps} id={textareaProps.name} />
      <GenericError error={error} style={{marginBottom: 0}} />
    </Div>
  )
}
