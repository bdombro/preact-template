import './forms.pcss'

import * as s from '@slimr/styled'

type BaseProps = {
  divProps?: Parameters<typeof Div>[0]
  error?: string
  label: string
  labelProps?: Omit<Parameters<typeof Label>[0], 'htmlFor'>
  name: string
}

type InputProps = Omit<Parameters<typeof s.Input>[0], 'id' | 'name'> & BaseProps

type TextareaProps = Omit<Parameters<typeof s.Textarea>[0], 'id' | 'name'> & BaseProps

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
      <s.Input {...inputProps} id={inputProps.name} type="checkbox" />
      <Label {...labelProps} htmlFor={inputProps.name}>
        {label}
      </Label>
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
      <s.Input {...inputProps} id={inputProps.name} />
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
      <s.Textarea {...textareaProps} id={textareaProps.name} />
      <GenericError error={error} style={{marginBottom: 0}} />
    </Div>
  )
}
