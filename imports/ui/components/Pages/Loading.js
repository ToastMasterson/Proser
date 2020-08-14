import React from 'react'
import { css } from '@emotion/core'
import CircleLoader from 'react-spinners/CircleLoader'
import { Container } from '@material-ui/core'

const Loading = () => {

    const override = css`
        display: block;
        margin: auto;
        border-color: blue;`

    return (
        <Container style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircleLoader
                css={override}
                size={500}
                color={'#A8D1C9'}
                loading />
        </Container>
    )
}

export default Loading