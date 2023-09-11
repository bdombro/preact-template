import './forms.pcss'

import {
  Input as SInput,
  OptionC as SOption,
  Select as SSelect,
  Textarea as STextarea,
  classJoin,
  mergeRefs,
} from '@slimr/react'
import {forwardRef} from 'react'

type BaseProps = {
  divProps?: Parameters<typeof Div>[0]
  label: string
  labelProps?: Omit<Parameters<typeof Label>[0], 'htmlFor'>
  name: string
  validator?: (val: string) => string | null | false | undefined
}

export type InputProps = Omit<Parameters<typeof SInput>[0], 'id' | 'name'> & BaseProps
export type CheckboxProps = Omit<InputProps, 'validator'>
export type RadioProps = InputProps & {
  innerDivProps?: Parameters<typeof Div>[0]
  inputLabelProps?: Parameters<typeof Label>[0]
  optionDivProps?: Parameters<typeof Div>[0]
  options: {label: string; value: string}[]
}
export type SelectProps = Omit<Parameters<typeof SSelect>[0], 'id' | 'name'> &
  BaseProps & {
    options: {label: string; value: string}[]
    optionProps?: Parameters<typeof SOption>[0]
  }
export type TextareaProps = Omit<Parameters<typeof STextarea>[0], 'id' | 'name'> & BaseProps

/**
 * used to track how recently we called input.reportValidity(). tracked so that
 * we don't call it too often and steal focus from the first input in the form
 */
let lastReportValidity = 0

/**
 * An input with type=checkbox and label and error handling
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {error: forwardedError, divProps, label, labelProps, onBlur, onChange, ...inputProps},
  forwardedRef
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [shouldShowError, setShouldShowError] = useState(false)
  const [localError, setLocalError] = useState<string | null | undefined>(forwardedError)

  const onValidate = () => {
    const input = inputRef.current
    if (!input) return
    setLocalError(inputProps.required && !input.checked ? 'You must check this box.' : null)
  }

  useEffect(() => {
    onValidate()
  }, [inputProps.value])

  useEffect(() => {
    const input = inputRef.current
    if (!input) return
    input.error = localError
  }, [localError])

  useEffect(() => {
    if (forwardedError) {
      setLocalError(forwardedError)
    }
  }, [forwardedError])

  useEffect(() => {
    const form = inputRef.current?.closest('form')
    if (!form) return

    const onSubmit = () => {
      setShouldShowError(true)
    }
    form.addEventListener('submit', onSubmit)
    inputRef.current?.addEventListener('invalid', onSubmit)

    const onReset = () => {
      setShouldShowError(false)
      const error = inputProps.required && !inputProps.checked ? 'You must select an option.' : null
      setLocalError(error)
    }
    form.addEventListener('reset', onReset)

    return () => {
      form.removeEventListener('submit', onSubmit)
      inputRef.current?.removeEventListener('invalid', onSubmit)
      form.removeEventListener('reset', onReset)
    }
  }, [])

  return (
    <Div
      {...divProps}
      data-error={shouldShowError && !!localError}
      className={classJoin('checkbox-div', divProps?.className)}
    >
      <SInput
        id={inputProps.name}
        onChange={e => {
          onValidate()
          onChange?.(e as TSFIXME)
        }}
        onBlur={e => {
          onValidate()
          onBlur?.(e as TSFIXME)
        }}
        ref={mergeRefs([inputRef, forwardedRef])}
        type="checkbox"
        {...inputProps}
      />
      <Label {...labelProps} htmlFor={inputProps.name}>
        {label}
        <RequiredAsterisk show={inputProps.required} />
      </Label>
      <GenericError error={localError} style={{marginBottom: 0}} />
    </Div>
  )
})

/**
 * A generic error to display at the bottom of a form
 */
export function GenericError({
  error,
  ...divProps
}: Parameters<typeof Div>[0] & {error: string | false | null | undefined}) {
  return (
    <Div
      aria-live="assertive"
      {...divProps}
      className={classJoin('small generic-error', divProps.className)}
      title="error"
    >
      {error}
    </Div>
  )
}

/**
 * An input with label, error, and validation handling
 */
export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(
    {divProps, label, labelProps, onBlur, onChange, validator, ...inputProps},
    forwardedRef
  ) {
    const divRef = useRef<HTMLDivElement>(null)
    console.log('render')

    const onValidate = () => {
      const div = divRef.current
      const input = div?.querySelector('input')
      const error = div?.querySelector('.error')
      if (!(div && input && error)) return
      input.setCustomValidity('')
      let nextError
      if (input.validationMessage) {
        nextError = input.validationMessage
      } else if (validator) {
        nextError = validator(input.value)
      }
      input.setCustomValidity(nextError || '')
      error.innerHTML = nextError || ''
      if (!nextError) {
        div.classList.remove('show-error')
      }
    }

    useEffect(() => {
      onValidate()
    }, [inputProps.value])

    useEffect(() => {
      const div = divRef.current
      const input = div?.querySelector('input')
      const error = div?.querySelector('.error')
      const form = input?.closest('form')
      if (!(div && input && error && form)) return

      const onSubmit = () => {
        // setTimeout to allow validation to run
        setTimeout(() => {
          error.innerHTML = input.validationMessage
          // if the input is invalid, report validity to show the browser's validation UI
          // but only do it once per second to ensure the first input in the form is focused
          if (input.validationMessage && Date.now() - lastReportValidity > 1000) {
            input.reportValidity()
            lastReportValidity = Date.now()
          }
          if (input.validationMessage) {
            div.classList.add('show-error')
          } else {
            div.classList.remove('show-error')
          }
        })
      }
      form.addEventListener('submit', onSubmit)

      const onInvalid = () => {
        // setTimeout to allow validation to run
        setTimeout(() => {
          error.innerHTML = input.validationMessage
          div.classList.add('show-error')
        })
      }
      input.addEventListener('invalid', onInvalid)

      const onReset = () => {
        div.classList.remove('show-error')
        onValidate()
      }
      form.addEventListener('reset', onReset)

      return () => {
        form.removeEventListener('submit', onSubmit)
        input.removeEventListener('invalid', onSubmit)
        form.removeEventListener('reset', onReset)
      }
    }, [])

    return (
      <Div {...divProps} className={classJoin('input-div', divProps?.className)} ref={divRef}>
        <Label {...labelProps} htmlFor={inputProps.name}>
          {label}
          <RequiredAsterisk show={inputProps.required} />
        </Label>
        <SInput
          id={inputProps.name}
          onChange={e => {
            onChange?.(e)
            onValidate()
          }}
          onBlur={e => {
            onBlur?.(e)
            if (e.currentTarget.validationMessage) {
              divRef.current?.classList.add('show-error')
            }
          }}
          ref={forwardedRef}
          {...inputProps}
        />
        <div aria-live="assertive" className="small error" title="error" />
      </Div>
    )
  })
)

/**
 * A set of radio inputs with label and error handling
 */
export const Radios = forwardRef<HTMLDivElement, RadioProps>(function Radios(
  {
    defaultValue,
    divProps,
    error: forwardedError,
    innerDivProps,
    inputLabelProps,
    label,
    labelProps,
    onChange,
    optionDivProps,
    options,
    value: forwardedVal = defaultValue,
    ...inputProps
  },
  forwardedRef
) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [shouldShowError, setShouldShowError] = useState(false)
  const [localError, setLocalError] = useState<string | null | undefined>(
    inputProps.required && !forwardedVal ? 'Please fill out this field.' : null
  )

  const getInputs = () => {
    const div = wrapperRef.current
    if (!div) return []
    return Array.from(div.querySelectorAll('input'))
  }

  useEffect(() => {
    const error = inputProps.required && !forwardedVal ? 'Please fill out this field.' : null
    // setLocalError in Input too
    setLocalError(error)
    for (const input of getInputs()) {
      input.checked = input.value === forwardedVal
    }
  }, [forwardedVal])

  useEffect(() => {
    for (const input of getInputs()) {
      input.error = localError
    }
  }, [localError])

  useEffect(() => {
    if (forwardedError) {
      setLocalError(forwardedError)
    }
  }, [forwardedError])

  useEffect(() => {
    const form = wrapperRef.current?.closest('form')
    if (!form) return

    const onSubmit = () => {
      setShouldShowError(true)
    }
    form.addEventListener('submit', onSubmit)
    getInputs()[0].addEventListener('invalid', onSubmit)

    const onReset = () => {
      setShouldShowError(false)
      const error = inputProps.required && !forwardedVal ? 'Please fill out this field.' : null
      setLocalError(error)
    }
    form.addEventListener('reset', onReset)

    return () => {
      form.removeEventListener('submit', onSubmit)
      getInputs()[0].removeEventListener('invalid', onSubmit)
      form.removeEventListener('reset', onReset)
    }
  }, [])

  return (
    <Div
      {...divProps}
      data-error={shouldShowError && !!localError}
      className={classJoin('radio-div', divProps?.className)}
      ref={mergeRefs([forwardedRef, wrapperRef])}
    >
      <Label {...labelProps}>
        {label}
        <RequiredAsterisk show={inputProps.required} />
      </Label>
      <Div {...innerDivProps}>
        {options.map(({label: oLabel, value: oValue}, i) => (
          <Div key={i} {...optionDivProps}>
            <SInput
              id={oValue}
              // Using onClick instead of onChange bc is unreliable after a form reset
              onClick={e => {
                setLocalError(null)
                setShouldShowError(true)
                onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>)
              }}
              type="radio"
              value={oValue}
              {...inputProps}
            />
            <Label {...inputLabelProps} htmlFor={oValue}>
              {oLabel}
            </Label>
          </Div>
        ))}
      </Div>
      <GenericError error={shouldShowError && localError} style={{marginBottom: 0}} />
    </Div>
  )
})

/**
 * A select wrapper with label and error handling
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    defaultValue,
    divProps,
    error: forwardedError,
    label,
    labelProps,
    onBlur,
    onChange,
    options,
    optionProps,
    value: forwardedVal = defaultValue,
    ...selectProps
  },
  forwardedRef
) {
  // TODO: support validator
  // TODO: support min/max selection
  const selectRef = useRef<HTMLSelectElement>(null)
  const [shouldShowError, setShouldShowError] = useState(false)
  const [localError, setLocalError] = useState<string | null | undefined>(
    selectProps.required && (Array.isArray(forwardedVal) ? !forwardedVal.length : !forwardedVal)
      ? 'Please fill out this field.'
      : null
  )

  const getOptions = () => {
    const div = selectRef.current
    if (!div) return []
    return Array.from(div.querySelectorAll('option'))
  }

  useEffect(() => {
    const error =
      selectProps.required && (Array.isArray(forwardedVal) ? !forwardedVal.length : !forwardedVal)
        ? 'Please fill out this field.'
        : null
    setLocalError(error)
    for (const option of getOptions()) {
      option.selected = Array.isArray(forwardedVal)
        ? forwardedVal.includes(option.value)
        : option.value === forwardedVal
    }
  }, [forwardedVal])

  useEffect(() => {
    const select = selectRef.current
    if (!select) return
    select.error = localError
  }, [localError])

  useEffect(() => {
    if (forwardedError) {
      setLocalError(forwardedError)
    }
  }, [forwardedError])

  useEffect(() => {
    const form = selectRef.current?.closest('form')
    if (!form) return

    const onSubmit = () => {
      setShouldShowError(true)
    }
    form.addEventListener('submit', onSubmit)
    selectRef.current?.addEventListener('invalid', onSubmit)

    const onReset = () => {
      setShouldShowError(false)
      const error =
        selectProps.required && (Array.isArray(forwardedVal) ? !forwardedVal.length : !forwardedVal)
          ? 'Please fill out this field.'
          : null
      setLocalError(error)
    }
    form.addEventListener('reset', onReset)

    return () => {
      form.removeEventListener('submit', onSubmit)
      selectRef.current?.removeEventListener('invalid', onSubmit)
      form.removeEventListener('reset', onReset)
    }
  }, [])

  return (
    <Div
      {...divProps}
      data-error={shouldShowError && !!localError}
      className={classJoin('select-div', divProps?.className)}
    >
      <Label {...labelProps}>
        {label}
        <RequiredAsterisk show={selectProps.required} />
      </Label>
      <SSelect
        {...selectProps}
        onChange={e => {
          const checked = getOptions().filter(o => o.selected)
          const error =
            selectProps.required && !checked.length ? 'Please fill out this field.' : null
          setLocalError(error)
          setShouldShowError(true)
          onChange?.(e)
        }}
        onBlur={e => {
          const checked = getOptions().filter(o => o.selected)
          const error =
            selectProps.required && !checked.length ? 'Please fill out this field.' : null
          setLocalError(error)
          setShouldShowError(true)
          onBlur?.(e as TSFIXME)
        }}
        ref={mergeRefs([forwardedRef, selectRef])}
      >
        {options.map(({label, value}, i) => (
          <option {...optionProps} key={i} id={value} value={value}>
            {label}
          </option>
        ))}
      </SSelect>
      <div className="tip only-mac">Tip: Hold ⌘ while clicking to select multiple.</div>
      <div className="tip not-mac not-ios">Tip: Hold 'ctrl' while clicking to select multiple.</div>
      <GenericError error={shouldShowError && localError} style={{marginBottom: 0}} />
    </Div>
  )
})

/**
 * An textarea with label and error handling
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {divProps, label, labelProps, onBlur, onChange, validator, ...inputProps}: TextareaProps,
  forwardedRef
) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [localError, setLocalError] = useState<string | null | undefined>()
  const [shouldShowError, setShouldShowError] = useState(false)

  const onValidate = () => {
    const input = inputRef.current
    if (!input) return
    if (inputProps.required && !input.value) {
      setLocalError('Please fill out this field.')
    } else if (validator) {
      setLocalError(validator(input.value) || null)
    } else {
      setLocalError(null)
    }
  }

  useEffect(() => {
    onValidate()
  }, [inputProps.value])

  useEffect(() => {
    const input = inputRef.current
    if (!input) return
    input.error = localError
  }, [localError])

  useEffect(() => {
    const form = inputRef.current?.closest('form')
    if (!form) return

    const onSubmit = () => {
      setShouldShowError(true)
    }
    form.addEventListener('submit', onSubmit)
    inputRef.current?.addEventListener('invalid', onSubmit)

    const onReset = () => {
      setShouldShowError(false)
      const error = inputProps.required && !inputProps.value ? 'Please fill out this field.' : null
      setLocalError(forwardedError || error)
    }
    form.addEventListener('reset', onReset)

    return () => {
      form.removeEventListener('submit', onSubmit)
      inputRef.current?.removeEventListener('invalid', onSubmit)
      form.removeEventListener('reset', onReset)
    }
  }, [])

  return (
    <Div
      {...divProps}
      className={classJoin('input-div', divProps?.className)}
      data-error={shouldShowError && !!localError}
      data-disabled={inputProps.disabled}
    >
      <Label {...labelProps} htmlFor={inputProps.name}>
        {label}
        <RequiredAsterisk show={inputProps.required} />
      </Label>
      <STextarea
        id={inputProps.name}
        onChange={e => {
          onValidate()
          onChange?.(e)
        }}
        onBlur={e => {
          onValidate()
          setShouldShowError(true)
          onBlur?.(e)
        }}
        ref={mergeRefs([inputRef, forwardedRef])}
        {...inputProps}
      />
      <GenericError error={shouldShowError && localError} style={{marginBottom: 0}} />
    </Div>
  )
})

function RequiredAsterisk({show = false}) {
  return show ? <span style={{color: 'red'}}>*</span> : null
}
