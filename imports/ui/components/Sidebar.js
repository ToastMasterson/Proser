import React from 'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

const Sidebar = () => {

    return (
            <ListGroup>
                <ListGroup.Item action>Note 1</ListGroup.Item>
                <ListGroup.Item action>Note 2</ListGroup.Item>
                <ListGroup.Item action>Note 3</ListGroup.Item>
                <ListGroup.Item action>Note 4</ListGroup.Item>
            </ListGroup>
    )
}

export default Sidebar