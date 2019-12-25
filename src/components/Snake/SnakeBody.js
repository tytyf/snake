import React from 'react';

const SnakeBody = (props) => {
    const style = {
        background: '#27ae60',
        width: 25,
        height: 25,
    }
    return (
        <div style={{...style, ...props.cordinates}}></div>
    )
}

export default SnakeBody;