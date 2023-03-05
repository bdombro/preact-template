import {FormError, useForm} from '@slimr/hooks'
import {formToValues, setPageMeta} from '@slimr/util'

import {GenericError, Input} from '~/foundation'
import {Layout} from '~/layout/layout-login'
import {Logo} from '~/layout/logo'
import {router as r} from '~/router'

/**
 * A demo of a home page
 */
export default function Login() {
  const {Form, submitting, accepted, errors} = useForm()
  setPageMeta({title: 'Login'})
  return (
    <Layout>
      <Layout.Section>
        <a href={r.routes.index.path} title="go home">
          <Logo height={70} _mb={20} />
        </a>
        <Form
          onSubmit={async e => {
            const vals = formToValues(e.target as HTMLFormElement)
            const errors: Record<string, string> = {}
            if (!vals.email) {
              errors.email = 'Email is required'
            }
            if (!vals.password) {
              errors.password = 'Password is required'
            }
            if (Object.keys(errors).length) {
              throw new FormError(errors)
            }
            r.goto(r.routes.stack1)
          }}
        >
          <Input label="email" name="email" autoFocus disabled={accepted} error={errors.email} />
          <Input label="password" name="password" disabled={accepted} error={errors.password} />
          <br />
          <GenericError error={errors.form} />
          {accepted && <p style={{color: 'var(--color-success)'}}>Form submitted without error.</p>}
          <button className="md" disabled={submitting} style={{width: '100%'}} type="submit">
            Login
          </button>
          <p className="small" style={{textAlign: 'center'}}>
            Click <a href={r.routes.login.path}>here</a> to register
          </p>
        </Form>
      </Layout.Section>
    </Layout>
  )
}
