import React from 'react';

const CamperListItem = ({ camper, number }) => {
    return (
        <tr>
            <td>{number}</td>
            <td><a href={'https://freecodecamp.org/'+ camper.username} target="_blank"><img src={camper.img} alt="" />{camper.username}</a></td>
            <td>{camper.recent}</td>
            <td>{camper.alltime}</td>
        </tr>
    );
}

export default CamperListItem;