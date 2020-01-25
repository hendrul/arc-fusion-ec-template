import React, { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {keyframes as kf} from '@material-ui/core/styles'
const Wrap = styled.div`
  width: 100%;
  height: 5px;
  background-color: #fff;
`
const animations = keyframes`
  0 { width: 0 }
  100% { width: 100% }
`

const Progress = styled.div`
  width: 0%;
  background: #009fe6;
  height: 100%;
  border-radius: 5px;
  will-change: width;
  /* transition: width ${({ time }) => time || `1s`} linear; */
  animation: ${animations} ${({ time }) => time || `1s`} linear;
  /* ${({ animation }) =>
    animation &&
    css`
      width: 100%;
    `} */
`

const ProgressComponent = props => {
  const { onFinish = () => {}, animation, time, ...rest } = props
  const $el = useRef(null)

  useEffect(() => {
    const handleEndAnimation = () => {
      onFinish()
    }
    $el.current.addEventListener('animationend', handleEndAnimation)
    return () => {
      $el.current.removeEventListener('animationend', handleEndAnimation)
    }
  }, [])
  return (
    <Wrap {...rest}>
      <Progress ref={$el} time={time} animation={animation} />
    </Wrap>
  )
}

export default ProgressComponent
