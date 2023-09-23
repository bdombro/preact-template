export const Logo = (svgProps: SvgProps) => (
  <Svg
    height="20px"
    viewBox="0 0 78 20"
    xmlns="http://www.w3.org/2000/svg"
    {...svgProps}
    _zx={{
      ...svgProps._zx,
      '--color': 'var(--color-primary)',
    }}
    _hover={{
      ...svgProps._hover,
      '--color': 'var(--color-primary-darker)',
    }}
  >
    <g fill="none">
      <path d="M3.768 16.141H.826V.447h73.406v2.941" stroke="var(--color)" strokeWidth={0.882} />
      <path d="M3.768 3.388h73.406v15.694H3.768z" fill="var(--color)" />
      <path
        d="M9.632 12.406h2.75l-.5 3.6h2.427l1.335-9.541h-2.426l-.512 3.611h-2.75l.512-3.611H8.04l-1.332 9.54h2.423zm6.389.459c-.31 2.185 1.508 3.276 3.49 3.276 2.077 0 4.113-1.091 4.421-3.276l.474-3.262c.309-2.182-1.524-3.274-3.506-3.274-1.982 0-4.082 1.077-4.406 3.274zm2.885-3.262c.106-.715.956-1.077 1.738-1.077s1.456.362 1.347 1.077l-.47 3.194c-.11.756-.96 1.106-1.739 1.106-.73 0-1.444-.35-1.35-1.038zm6.065 3.262c-.31 2.185 1.508 3.276 3.49 3.276 2.077 0 4.113-1.091 4.421-3.276l.47-3.262c.313-2.182-1.52-3.274-3.502-3.274-1.982 0-4.085 1.077-4.409 3.274zm2.885-3.262c.106-.715.956-1.077 1.738-1.077s1.456.362 1.347 1.077l-.47 3.194c-.11.756-.96 1.106-1.739 1.106-.73 0-1.444-.35-1.35-1.038zm9.123.391.5-3.53h-2.426l-1.335 9.542h2.426l.459-3.303.094-.106 1.994 3.409h3.033l-3.086-4.853 4.433-4.688h-3.006zm8.789-1.253h4.206l.323-2.276H43.65l-1.332 9.54h6.644l.309-2.276h-4.203l.2-1.429h3.87l.294-2.144h-3.867zm5.808-2.276-1.335 9.54h3.574c1.911 0 3.826-.943 4.138-3.14l.456-3.206c.312-2.227-1.347-3.194-3.262-3.194zm1.403 7.276.712-5.026h1.227c.661 0 1.132.417 1.067.944l-.459 3.206c-.067.511-.661.876-1.32.876zm5.486-.538c-.027 2.02 1.55 2.938 3.194 2.938 1.926 0 3.732-1.173 4.03-3.25l.902-6.426h-4.556l-.309 2.182h2.168l-.591 4.244c-.082.568-.715.918-1.32.918-.58 0-1.148-.324-1.174-1.08zm7.911 1.212c.727 1.147 2.142 1.726 3.289 1.726 2.061 0 3.68-.93 4.03-2.791.443-2.37-1.174-3.006-2.83-3.315-.73-.161-1.215-.406-1.147-.956.053-.485.567-.714 1.173-.703.553.015 1.185.23 1.591.689l1.75-1.212c-.82-1.2-1.9-1.524-3.058-1.524-1.753 0-3.477.686-3.842 2.642-.338 1.805 1.012 3.005 2.506 3.247.77.108 1.606.364 1.497.958-.094.498-.659.727-1.306.727-.714 0-1.511-.309-1.929-.915z"
        fill="#fefefd"
      />
    </g>
  </Svg>
)
