import {mergeRefs} from '@slimr/react'
import {FormValue, FormValues, formToValues} from '@slimr/util'
import React, {forwardRef, useRef, useState} from 'react'

declare global {
  interface EventTarget {
    disabledBefore: boolean
    error?: string | null
  }
}

type ReactFormEvent = React.FormEvent<HTMLFormElement>

type Fnc = (...args: any[]) => any

/** The current state of the form */
interface FormState {
  /** If the form has been submitted and processed by the handler without error */
  accepted: boolean
  /**
   * A dictionary of error keys to messages. Typically the keys are field names
   * so it's easy to show inline error state and messages for fields. Also
   * helpful to set a 'form' key with a message to be displayed at the bottom.
   *
   * These are set by throwing a 'FormError' in onSubmit
   */
  errors: Record<string, any>
  /** True if the onSubmit has started but not yet finished */
  submitting: boolean
  /** True if the onSubmit has been started and finished, regardless of outcome. */
  submitted: boolean
}

interface UseFormReturnType extends FormState {
  /** A form wrapper that has useForm magic sprinkled in */
  Form: React.ForwardRefExoticComponent<
    Omit<FormProps, 'ref'> & React.RefAttributes<HTMLFormElement>
  >
  /** Resets the form to its initial state */
  reset: () => void
  /** Submits the form */
  submit: () => void
}

/** A dictionary of form input names to error message strings  */
type FormErrorFieldError = Record<string, string>

export interface FormProps extends Omit<JSX.IntrinsicElements['form'], 'onChange' | 'onSubmit'> {
  onChange?: OnChange
  onSubmit?: OnSubmit
}

export interface OnChange {
  (event: ReactFormEvent, value: FormValue, values: FormValues): any
}

export interface OnSubmit {
  (event: ReactFormEvent, values: FormValues): any
}

/**
 * A hook that returns a Form component and the form state.
 *
 * @ref
 * https://www.npmjs.com/package/@slimr/forms
 *
 * @usage [Code Sandbox](https://codesandbox.io/s/useform-4sncgj?file=/src/App.tsx)
 */
export function useForm(
  hookProps: {
    /** Whether the form elements will be disabled while submitting. Default = true */
    disableWhileSubmitting?: boolean
    /** Whether the form will be reset when the onSubmit handler completes without error */
    resetOnAccepted?: boolean
  } = {}
): UseFormReturnType {
  const {disableWhileSubmitting = true, resetOnAccepted} = hookProps
  const hookFormRef = useRef<HTMLFormElement>(null)
  const [state, setState] = useState(formDefaultState)

  /** A form wrapper that has useForm magic sprinkled in */
  const Form = useRef(
    forwardRef(function FormComponent(
      {children, onChange, onReset, onSubmit, ...formProps}: FormProps,
      ref: React.Ref<HTMLFormElement>
    ) {
      /** Resets the state onReset */
      function _onReset(e: ReactFormEvent) {
        const formElements = [...(e.currentTarget.elements as unknown as HTMLInputElement[])]
        if (disableWhileSubmitting) {
          formElements.forEach(e => (e.disabled = e.disabledBefore))
        }
        setState(formDefaultState)
        onReset?.(e)
      }

      /** A form wrapper that has useForm magic sprinkled in */
      async function _onSubmit(formEvent: ReactFormEvent) {
        formEvent.preventDefault()

        const formElements = [
          ...(formEvent.currentTarget.elements as unknown as HTMLInputElement[]),
        ].filter(e => e.type !== 'reset')

        if (disableWhileSubmitting) {
          formElements.forEach(e => {
            e.disabledBefore = e.disabled
            e.disabled = true
          })
        }

        setState(last => ({...last, submitting: true}))
        try {
          if (onSubmit) {
            await promisify(onSubmit)(formEvent, formToValues(formEvent.currentTarget))
          }
          if (resetOnAccepted) {
            hookFormRef.current!.reset()
          } else {
            setState({
              accepted: true,
              errors: {},
              submitting: false,
              submitted: true,
            })
          }
        } catch (error: unknown) {
          const isKnownError = error instanceof FormError
          setState({
            accepted: false,
            errors: isKnownError
              ? {
                  form: error.message,
                  ...error?.errorSet,
                }
              : {
                  form: 'An unknown error occurred',
                },
            submitting: false,
            submitted: true,
          })
          if (disableWhileSubmitting) {
            formElements.forEach(e => (e.disabled = e.disabledBefore))
          }
          if (isKnownError) {
            for (const e of formElements) {
              const fieldError = error.errorSet[e.name]
              if (fieldError) {
                e.setCustomValidity(fieldError)
              }
            }
          } else {
            throw error
          }
        }
      }

      /** A form wrapper that has useForm magic sprinkled in */
      async function _onChange(formEvent: ReactFormEvent) {
        if (onChange) {
          const target = formEvent.target as HTMLInputElement
          const values = formToValues(target.closest('form') as HTMLFormElement)
          await promisify(onChange)(formEvent, values[target.name], values)
        }
      }

      return (
        <form
          onChange={onChange ? _onChange : undefined}
          onReset={_onReset}
          onSubmit={_onSubmit}
          ref={mergeRefs([hookFormRef, ref])}
          {...formProps}
        >
          {children}
        </form>
      )
    })
  ).current

  const context: UseFormReturnType = {
    Form,
    ...state,
    reset: () => hookFormRef.current!.reset(),
    submit: () => hookFormRef.current!.requestSubmit(),
  }

  return context
}

const formDefaultState: FormState = {
  accepted: false,
  errors: {},
  submitted: false,
  submitting: false,
}

/**
 * An extension of Error that accepts an `errorSet` as a constructor property. It is used to share error context with `useForm`. When thrown from within an onSubmit handler, `useForm` will set `errorSet` to the `error` state.
 *
 * ```typescript
 * throw new FormError({ form: 'Please add a value for the name field', name: 'This field is required' })
 * ```
 */
export class FormError extends Error {
  type = 'ValidationErrorSet'
  errorSet: Partial<FormErrorFieldError>

  constructor(errorSet: Partial<FormErrorFieldError>) {
    super('One or more values are invalid')
    this.errorSet = errorSet
  }
}

/** Turn any function into an async function */
const promisify =
  <T extends Fnc>(fn: T) =>
  async (...p: Parameters<T>) =>
    fn(...p)
