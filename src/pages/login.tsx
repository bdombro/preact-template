import {FormError, OnSubmit, useForm} from '@slimr/react'
import {setPageMeta} from '@slimr/util'

import {GenericError, Input} from '~/foundation'
import {Layout} from '~/layout/layout-login'
import {Logo} from '~/layout/logo'
import {router as r} from '~/router'

/**
 * A demo of a home page
 */
export default function Login() {
  const {Form, accepted, errors, submitted, submitting} = useForm()
  setPageMeta({title: 'Login'})

  const onSubmit: OnSubmit = async (_, vals) => {
    // Tips:
    // 1. useForm already prevents onSubmit from being called
    //    if any inputs have a truthy 'error' property
    // 2. this validation below normally happens on the backend,
    //    but we're doing it here for demo purposes
    const errors: Record<string, string> = {}

    if (vals.email === 'sue@sue.com') {
      errors.email = 'Email is already registered'
    }

    if (Object.keys(errors).length) {
      throw new FormError(errors)
    }

    console.log('vals', vals)
    r.goto(r.routes.stack1)
  }

  return (
    <Layout>
      <Layout.Section>
        <a href={r.routes.index.path} title="go home">
          <Logo height={70} _mb={20} />
        </a>
        <Form onSubmit={onSubmit}>
          <Input
            eagerValidate={submitted}
            label="email"
            name="email"
            autoFocus
            error={errors['email']}
            type="email"
            validator={str => (str.match(/.+@.+\..+/) ? null : 'Invalid email')}
          />
          <Input
            eagerValidate={submitted}
            label="password"
            name="password"
            error={errors['password']}
            type="password"
            validator={str => (str.length >= 2 ? null : 'Password must be at least 2 characters')}
          />
          <br />
          <GenericError error={errors.form} />
          <button className="md" style={{width: '100%'}} type="submit">
            {accepted ? 'Success!' : submitting ? 'Submitting...' : 'Login'}
          </button>
          <p className="small" style={{textAlign: 'center'}}>
            Click <a href={r.routes.login.path}>here</a> to register
          </p>
        </Form>
      </Layout.Section>
    </Layout>
  )
}
