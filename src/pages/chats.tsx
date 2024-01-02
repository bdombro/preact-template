import {setPageMeta} from '@slimr/util'

import {Layout} from '~/layout/layout-dashboard'

/**
 * A demo of route in a route stack. Click "Inner Page" to go deeper down
 */
export default function Chats() {
  setPageMeta({
    title: 'Chats',
    description: 'Chats currently assigned to your team',
  })
  return (
    <Layout>
      <Div
        _display="grid"
        _gap={4}
        _gridTemplateColumns={['1fr', null, 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
      >
        <ChatBox />
        <ChatBox />
        <ChatBox />
        <ChatBox />
        <ChatBox />
      </Div>
    </Layout>
  )
}

function ChatBox() {
  return <Div _background="var(--color-primary)">Chat Box</Div>
}
