import React from 'react';

const SnakeFood = (props) => {
    const style = {
        background: '#f1c40f',
        width: 25,
        height: 25,
    }
    return (
        <div style={{...style, ...props.cordinates}}></div>
    )
}

export default SnakeFood;