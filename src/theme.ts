import { stylesheet } from 'astroturf'

export const theme = {}

stylesheet`
  :root {
    /* @link https://utopia.fyi/type/calculator?c=320,18,1.2,1240,20,1.25,6,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12 */
    --step--2: clamp(0.78rem, calc(0.77rem + 0.03vw), 0.80rem);
    --step--1: clamp(0.94rem, calc(0.92rem + 0.11vw), 1.00rem);
    --step-0: clamp(1.13rem, calc(1.08rem + 0.22vw), 1.25rem);
    --step-1: clamp(1.35rem, calc(1.28rem + 0.37vw), 1.56rem);
    --step-2: clamp(1.62rem, calc(1.50rem + 0.58vw), 1.95rem);
    --step-3: clamp(1.94rem, calc(1.77rem + 0.87vw), 2.44rem);
    --step-4: clamp(2.33rem, calc(2.08rem + 1.25vw), 3.05rem);
    --step-5: clamp(2.80rem, calc(2.45rem + 1.77vw), 3.82rem);
    --step-6: clamp(3.36rem, calc(2.87rem + 2.45vw), 4.77rem);
  }
  body {
    margin: 0;

    * {
      font-size: var(--step-0);
      line-height: var(--step-1);
    }

    a {
      text-decoration: none;
    }
    button {
      font-size: var(--step--1);
      line-height: var(--step-0);
    }
    h1 {
      font-size: var(--step-5);
      line-height: var(--step-6);
    }
    h2 {
      font-size: var(--step-4);
      line-height: var(--step-5);
    }
    h3 {
      font-size: var(--step-3);
      line-height: var(--step-4);
    }
    h4 {
      font-size: var(--step-2);
      line-height: var(--step-3);
    }
    h5 {
      font-size: var(--step-1);
      line-height: var(--step-2);
    }
    h6 {
      font-size: var(--step-0);
      line-height: var(--step-1);
    }
    input {
      font-size: var(--step-0);
    }
    p a {
      font-decoration: underline;
    }
    small {
      font-size: var(--step--1);
      line-height: var(--step-0);
    }
	}
`
