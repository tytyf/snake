import React from 'react';

const SnakeHead = (props) => {
    const style = {
        background: '#2ecc71',
        width: 25,
        height: 25,

    }
    return (
        <div style={{...style, ...props.cordinates}}></div>
    )
}

export default SnakeHead;