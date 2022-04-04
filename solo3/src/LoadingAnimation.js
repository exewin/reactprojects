import React from "react"
import styled, {keyframes} from "styled-components"

const anima = keyframes`
    from {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0, 0.055, 0.675, 1);
    }
    to {
        transform: rotate(360deg);
    }
`

const Hourglass = styled.div `
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    &:after{
        content: " ";
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 8px;
        box-sizing: border-box;
        border: 32px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: ${anima} 1.2s infinite;
    }
`

const LoadingAnimation = () => {
    return(
    <Hourglass></Hourglass>
    )
}


  export default LoadingAnimation