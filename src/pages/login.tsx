import {OnSubmit, SForm, SFormError, useColorScheme, useSFormContext} from '@slimr/react'
import {setPageMeta} from '@slimr/util'

import {GenericError, InputBox} from '~/foundation'
import {Layout} from '~/layout/layout-login'
import {router as r} from '~/router'

/**
 * A demo of a login page
 */
export default function Login() {
  const {scheme} = useColorScheme()
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
      throw new SFormError(errors)
    }

    console.log('vals', vals)
    r.goto(r.routes.stack1)
  }

  return (
    <Layout>
      <Layout.Section>
        <A href={r.routes.index.path} title="go home" _d="block" _textAlign="center">
          <Img src={`/logo-${scheme}-scheme.svg`} _h={70} _mb={10} _w="90%" />
        </A>
        <SForm onSubmit={onSubmit}>
          <InputBox autoFocus label="email" name="email" required type="email" />
          <InputBox label="password" name="password" required type="password" />
          <br />
          <FormFooter />
          <P className="small" _textAlign="center">
            Click <a href={r.routes.login.path}>here</a> to register
          </P>
        </SForm>
      </Layout.Section>
    </Layout>
  )
}

const FormFooter = () => {
  const {submitting, accepted, rejected} = useSFormContext()

  return (
    <>
      <GenericError error={rejected && 'Issues found. Please correct and retry.'} />
      <button className="md" style={{width: '100%'}} type="submit">
        {accepted ? 'Success!' : submitting ? 'Submitting...' : 'Login'}
      </button>
    </>
  )
}
