import './foundation.stories.pcss'

import {Card} from './card'

export const Buttons = () => (
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
    <button className="secondary" type="button">
      secondary
    </button>
    <button className="tertiary" type="button">
      tertiary
    </button>
  </>
)

export const Cards = () => (
  <Card>
    <Div _minW={500}>I'm a box inside a Flex and Card</Div>
    <Div _minW={500}>I'm a box inside a Flex and Card</Div>
  </Card>
)

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
  component: Buttons,
}
