import styled from 'styled-components'

export const Container = styled.div`
  @apply fixed right-10 bottom-0 m-5 z-100 flex font-sans select-none leading-1em;

  .inner {
    @apply absolute r-0 bottom-0 flex w-10 h-10 rounded-full shadow cursor-pointer bg-teal-600;
  }
`
