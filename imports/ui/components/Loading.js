import React from 'react'
import { css } from "@emotion/core"
import CircleLoader from 'react-spinners/CircleLoader'

const Loading = () => {
    const override = css`
        display: block;
        margin: auto;
        border-color: blue;
    `

    return (
        <CircleLoader
            css={override}
            size={500}
            color={"#A8D1C9"}
            loading
        />
    )
}

export default Loading