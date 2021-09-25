import styled, { keyframes } from 'styled-components'

const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  @apply text-center;

  .App-logo {
    height: 40vmin;
    @apply pointer-events-none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: ${Spin} infinite 20s linear;
    }
  }

  .App-header {
    background-color: #282c34;
    font-size: calc(10px + 2vmin);
    @apply min-h-screen flex flex-col items-center justify-center text-white;
  }

  .App-link {
    color: #61dafb;
  }

  button {
    font-size: calc(10px + 2vmin);
  }
`
