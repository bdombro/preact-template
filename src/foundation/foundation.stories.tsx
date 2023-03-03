import './foundation.stories.pcss'

import {FormError, useForm} from '@slimr/hooks'
import {formToValues} from '@slimr/util'

import {Card} from './cards'
import {Checkbox, GenericError, Input, Textarea} from './forms'
import {Icon, IconKeys, icons} from './icons'
import {ToastPack, toast} from './toasts'

export const ButtonSizes = () => (
  <>
    <button className="lg" type="button">
      lg
    </button>
    <button className="md" type="button">
      md
    </button>
    <button className="" type="button">
      default
    </button>
  </>
)

export const ButtonTypes = () => (
  <>
    <button className="" type="button">
      default
    </button>
    <button className="secondary" type="button">
      secondary
    </button>
    <button className="tertiary" type="button">
      tertiary
    </button>
  </>
)

export const ButtonGroups = () => (
  <>
    <button className="md left" type="button">
      left
    </button>
    <button className="md center" type="button">
      center
    </button>
    <button className="md right" type="button">
      right
    </button>
  </>
)

export const Cards = () => (
  <Card>
    <Div _minW={500}>I'm a box inside a Flex and Card</Div>
    <Div _minW={500}>I'm a box inside a Flex and Card</Div>
  </Card>
)

export const FormCheckbox = () => {
  const {Form, submitting, accepted, errors} = useForm()

  return (
    <Form
      onSubmit={async e => {
        const vals = formToValues(e.target as HTMLFormElement)
        const errors: Record<string, string> = {}
        if (!vals.terms) {
          errors.terms = 'You must agree to the terms'
        }
        if (Object.keys(errors).length) {
          throw new FormError(errors)
        }
      }}
    >
      <Checkbox
        label="Do you agree to the terms?"
        name="terms"
        disabled={accepted}
        error={errors.terms}
      />
      <GenericError error={errors.form} />
      {accepted && <p style={{color: 'var(--color-success)'}}>Form submitted without error.</p>}
      <button className="left" disabled={submitting} type="submit">
        Submit
      </button>
      <button className="tertiary right" disabled={submitting} type="reset">
        Reset
      </button>
    </Form>
  )
}

export const FormExternalReset = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const {Form, submitting, accepted, errors} = useForm()

  useEffect(() => {
    if (accepted) {
      setTimeout(() => {
        formRef.current?.reset()
      }, 5000)
    }
  }, [accepted])

  return (
    <Form
      onSubmit={async e => {
        const vals = formToValues(e.target as HTMLFormElement)
        const errors: Record<string, string> = {}
        if (!vals.text) {
          errors.text = 'Text is required'
        }
        if (Object.keys(errors).length) {
          throw new FormError(errors)
        }
      }}
      ref={formRef}
    >
      <Input label="Name" name="text" disabled={accepted} error={errors.text} />
      <GenericError error={errors.form} />
      {accepted && (
        <p style={{color: 'var(--color-success)'}}>Success! Form will reset in 5 seconds...</p>
      )}
      <button className="left" disabled={submitting} type="submit">
        Submit
      </button>
      <button className="tertiary right" disabled={submitting} type="reset">
        Reset
      </button>
    </Form>
  )
}

export const FormInput = () => {
  const {Form, submitting, accepted, errors} = useForm()

  return (
    <Form
      onSubmit={async e => {
        const vals = formToValues(e.target as HTMLFormElement)
        const errors: Record<string, string> = {}
        if (!vals.text) {
          errors.text = 'Text is required'
        }
        if (Object.keys(errors).length) {
          throw new FormError(errors)
        }
      }}
    >
      <Input label="Text" name="text" disabled={accepted} error={errors.text} />
      <GenericError error={errors.form} />
      {accepted && <p style={{color: 'var(--color-success)'}}>Form submitted without error.</p>}
      <button className="left" disabled={submitting} type="submit">
        Submit
      </button>
      <button className="tertiary right" disabled={submitting} type="reset">
        Reset
      </button>
    </Form>
  )
}

export const FormTextarea = () => {
  const {Form, submitting, accepted, errors} = useForm()

  return (
    <Form
      onSubmit={async e => {
        const vals = formToValues(e.target as HTMLFormElement)
        const errors: Record<string, string> = {}
        if (!vals.text) {
          errors.text = 'Text is required'
        }
        if (Object.keys(errors).length) {
          throw new FormError(errors)
        }
      }}
    >
      <Textarea label="Select" name="text" disabled={accepted} error={errors.text} />
      <GenericError error={errors.form} />
      {accepted && <p style={{color: 'var(--color-success)'}}>Form submitted without error.</p>}
      <button className="left" disabled={submitting} type="submit">
        Submit
      </button>
      <button className="tertiary right" disabled={submitting} type="reset">
        Reset
      </button>
    </Form>
  )
}

export const Icons = () => (
  <div className="icons">
    {Object.keys(icons).map(name => (
      <div key={name}>
        <Icon name={name as unknown as IconKeys} />
        <p>{name}</p>
      </div>
    ))}
  </div>
)

export const Toasts = () => {
  return (
    <>
      <ToastPack />
      <button type="button" onClick={() => toast({key: 'i', message: 'info', variant: 'info'})}>
        info
      </button>
      <button
        type="button"
        onClick={() => toast({key: 's', message: 'success', variant: 'success'})}
      >
        success
      </button>
      <button type="button" onClick={() => toast({key: 'a', message: 'alert', variant: 'alert'})}>
        alert
      </button>
      <button type="button" onClick={() => toast({key: 'e', message: 'error', variant: 'error'})}>
        error
      </button>
      <button
        type="button"
        onClick={() => toast({key: 'c', message: 'center placement', placement: 'center'})}
      >
        center
      </button>
      <button
        type="button"
        onClick={() => toast({key: 'b', message: 'bottom placement', placement: 'bottom'})}
      >
        bottom
      </button>
      <button type="button" onClick={() => toast({key: 'r', message: 'right placement'})}>
        right
      </button>
      <button type="button" onClick={() => toast({key: 'r2', message: 'right placement again'})}>
        right2
      </button>
      <button type="button" onClick={() => toast({message: 'no icon', icon: null})}>
        no icon
      </button>
      <button
        type="button"
        onClick={() =>
          toast({key: 's1', duration: Infinity, message: 'sticky1', placement: 'bottom'})
        }
      >
        sticky bottom
      </button>
      <button
        type="button"
        onClick={() =>
          toast({key: 's2', duration: Infinity, message: 'sticky2', variant: 'success'})
        }
      >
        sticky success
      </button>
      <button
        type="button"
        onClick={() => toast({duration: Infinity, dismissable: false, message: 'non-dismissable'})}
      >
        non-dismissable
      </button>
      <button type="button" onClick={() => throwError('This is an error')}>
        throw error
      </button>
      <button type="button" onClick={async () => throwError('This is an async error')}>
        throw async error
      </button>
    </>
  )
}

export const Typography = () => (
  <div className="typography">
    <h1>h1</h1>
    <h2>h2</h2>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    <h6>h6</h6>
    <p>p</p>
    <small>small</small>
    <p className="small">small class</p>
    <p className="tiny">tiny</p>
  </div>
)

export default {
  title: 'Foundation/stories',
  // tags: ['autodocs'],
  component: ButtonSizes,
}
