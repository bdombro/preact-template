import './foundation.stories.pcss'

import {Card} from './cards'
import {Checkbox, GenericError, Input, InputProps, Radios, Select, Textarea} from './forms'
import {Icon, IconKeys, icons} from './icons'
import {toast} from './toasts'
// import {useForm} from '@slimr/react'
import {FormError, useForm} from './useForm'

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

export const Colors = () => (
  <table className="colors">
    {Colors.names.map(name => (
      <tr key={name}>
        <td style={{backgroundColor: `var(--color-${name})`}} />
        <td>--color-{name}</td>
      </tr>
    ))}
  </table>
)
Colors.names = [
  'primary',
  'primary-darker',
  'secondary',
  'tertiary',
  'success',
  'danger',
  'alert',
  'white',
  'fg',
  'bg',
  'gray1',
  'gray2',
  'gray3',
  'gray4',
  'gray5',
  'gray6',
  'gray7',
  'gray8',
  'gray9',
  'black',
]

export const FormCheckbox = () => {
  const {Form, submitting, accepted, errors} = useForm()
  return (
    <Form>
      <Checkbox error={errors['terms']} label="Do you agree to the terms?" name="terms" required />
      <FormFooter accepted={accepted} errors={errors} submitting={submitting} />
    </Form>
  )
}

const FormFooter = ({
  accepted,
  errors,
  submitting,
}: {
  accepted: boolean
  errors: Record<string, string>
  submitting: boolean
}) => (
  <>
    <GenericError error={errors.form} />
    <button className="left" type="submit">
      {accepted ? 'Success!' : submitting ? 'Submitting...' : 'Submit'}
    </button>
    <button className="tertiary right" disabled={submitting} type="reset">
      Reset
    </button>
  </>
)

const FormInput = ({type = 'text', ...inputProps}: Omit<InputProps, 'label' | 'name' | 'ref'>) => {
  const {Form, submitting, accepted, errors} = useForm()
  return (
    <Form>
      <Input label={type} name="field1" type={type} required {...inputProps} />
      <FormFooter accepted={accepted} errors={errors} submitting={submitting} />
    </Form>
  )
}

export const FormInputDate = () => <FormInput type="date" />
export const FormInputNumber = () => <FormInput type="number" />
export const FormInputText = () => (
  <FormInput
    minLength={2}
    maxLength={5}
    type="text"
    validator={str => str === 'na' && '"na" is banned'}
  />
)

export const FormKitchenSink = () => {
  const {Form, submitting, accepted, errors} = useForm()
  return (
    <Form>
      <Checkbox error={errors['terms']} label="Do you agree to the terms?" name="terms" required />
      {['date', 'number', 'text', 'tel', 'email', 'url', 'password', 'search', 'color'].map(
        type => (
          <Input error={errors[type]} key={type} label={type} name={type} type={type} required />
        )
      )}
      <Radios
        error={errors['radio1']}
        label="Radios"
        name="radio1"
        options={[
          {label: 'Choice 1', value: 'choice1'},
          {label: 'Choice 2', value: 'choice2'},
          {label: 'Choice 3', value: 'choice3'},
        ]}
        required
      />
      <Select
        error={errors['select1']}
        label={'Select Single'}
        name="select1"
        options={[
          {label: '--', value: ''},
          {label: 'Choice 1', value: 'choice1'},
          {label: 'Choice 2', value: 'choice2'},
          {label: 'Choice 3', value: 'choice3'},
        ]}
        required
      />
      <Select
        error={errors['select2']}
        label={'Select multiple'}
        multiple
        name="select2"
        options={[
          {label: 'Choice 1', value: 'choice1'},
          {label: 'Choice 2', value: 'choice2'},
          {label: 'Choice 3', value: 'choice3'},
        ]}
        required
      />
      <Textarea
        disabled={accepted}
        error={errors['field1']}
        label="Textarea"
        name="field1"
        required
      />
      <FormFooter accepted={accepted} errors={errors} submitting={submitting} />
    </Form>
  )
}

export const FormRadios = () => {
  const {Form, submitting, accepted, errors} = useForm()

  return (
    <Form>
      <Radios
        error={errors['radio1']}
        label="Radios"
        name="radio1"
        options={[
          {label: 'Choice 1', value: 'choice1'},
          {label: 'Choice 2', value: 'choice2'},
          {label: 'Choice 3', value: 'choice3'},
        ]}
        required
      />
      <FormFooter accepted={accepted} errors={errors} submitting={submitting} />
    </Form>
  )
}

// eslint-disable-next-line react/display-name
const FormSelect = ({multiple}: {multiple: boolean}) => {
  const {Form, submitting, accepted, errors} = useForm()

  return (
    <Form>
      <Select
        error={errors['select1']}
        label={multiple ? 'Select multiple' : 'Select Single'}
        multiple={multiple ? true : undefined}
        name="select1"
        options={[
          ...(multiple ? [] : [{label: '--', value: ''}]),
          {label: 'Choice 1', value: 'choice1'},
          {label: 'Choice 2', value: 'choice2'},
          {label: 'Choice 3', value: 'choice3'},
        ]}
        required
      />
      <FormFooter accepted={accepted} errors={errors} submitting={submitting} />
    </Form>
  )
}

export const FormSelectSingle = () => <FormSelect multiple={false} />
export const FormSelectMultiple = () => <FormSelect multiple={true} />

export const FormServerError = ({
  type = 'text',
  ...inputProps
}: Omit<InputProps, 'label' | 'name' | 'ref'>) => {
  const {Form, submitting, accepted, errors} = useForm()
  return (
    <Form
      onSubmit={(_, vals) => {
        if (vals['field1'] === 'bad') {
          throw new FormError({
            form: 'Please correct the error in field1 and re-submit.',
            field1: "'bad' is not allowed",
          })
        }
      }}
    >
      <Input label={type} name="field1" type={type} required {...inputProps} />
      <Input label={type} name="field2" type={type} required {...inputProps} />
      <FormFooter accepted={accepted} errors={errors} submitting={submitting} />
    </Form>
  )
}

export const FormTextarea = () => {
  const {Form, submitting, accepted, errors} = useForm()

  return (
    <Form>
      <Textarea
        disabled={accepted}
        error={errors['field1']}
        label="Textarea"
        name="field1"
        required
      />
      <FormFooter accepted={accepted} errors={errors} submitting={submitting} />
    </Form>
  )
}

export const Icons = () => (
  <div className="icons">
    {Object.keys(icons).map((name, i) => (
      <div key={i}>
        <Icon name={name as unknown as IconKeys} />
        <p>{name}</p>
      </div>
    ))}
  </div>
)

export const Toasts = () => {
  return (
    <>
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
