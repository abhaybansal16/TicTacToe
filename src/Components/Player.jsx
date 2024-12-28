import { useState } from "react";

export default function Player({name, symbol, isActive, onChangeName})
{
    const[Name, setName] = useState(name);
    const[isEditing, setIsEditing] = useState(false);

    function handleEditClick()
    {
        // setIsEditing(!isEditing); It updates in later future
        setIsEditing((Editing) => !Editing)
        if(isEditing)
        onChangeName(symbol, playerName);
    }

    function handleChange(event)
    {
        setName(event.target.value);
    }

    let playerName = <span className="player-name">{Name}</span>;

    if(isEditing)
    {
        playerName = <input type="text" required value={Name} onChange={handleChange} />
    }

    return(
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick = {handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}