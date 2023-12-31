import React, { useState } from 'react'
import SpongeBob from './Sponge.png'
import PatrickStar from './Patrick.png'
import Mrkrabs from './MrKrabs.png'
import Squidward from './Squid.png'
const charactersData = [
  {
    id: 1,
    name: 'SpongeBob SquarePants',
    description: 'A sea sponge who works at the Krusty Krab and loves jellyfishing.',
    image: SpongeBob,
  },
  {
    id: 2,
    name: 'Patrick Star',
    description: 'A starfish and SpongeBobs best friend who lives under a rock.',
    image: PatrickStar,
  },
  {
    id: 3,
    name: 'Eugene Crabs',
    description: 'Owner of the CrustyCrab and spongBobs boss.',
    image: Mrkrabs ,
  },
  {
    id: 4,
    name: 'Squidward',
    description: 'SpongBobs neighbor.',
    image: Squidward
    ,
  },
  
];

const SpongeBobCharacters = () => {
  const [characters, setCharacters] = useState(charactersData);

  const handleDelete = (id) => {
    setCharacters((prevCharacters) => prevCharacters.filter((char) => char.id !== id));
  };

  const handleEdit = (id) => {
  };

  const handleSaveChanges = (id, newName, newDescription, newImage) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.id === id
          ? { ...char, name: newName, description: newDescription, image: newImage }
          : char
      )
    );
  };

  return (
    <div className='PrnCont'>
      {characters.map((character) => (
        <div key={character.id}>
          <Portrait
            character={character}
            onDelete={() => handleDelete(character.id)}
            onEdit={() => handleEdit(character.id)}
            onSaveChanges={handleSaveChanges}
          />
        </div>
      ))}
    </div>
  );
};

const Portrait = ({ character, onDelete, onEdit, onSaveChanges }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(character.name);
  const [newDescription, setNewDescription] = useState(character.description);
  const [newImage, setNewImage] = useState(character.image);

  const handleSaveChangesClick = () => {
    onSaveChanges(character.id, newName, newDescription, newImage);
    setEditing(false);
  };

  return (
    <div className='component'>
      <img src={character.image} alt={character.name} onClick={() => setShowDetails(!showDetails)} />
      {showDetails && (
        <div className='componentTwo'>
          {editing ? (
            <div >
              <input className='inp'
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input className='inp'
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <button className='myButton' onClick={handleSaveChangesClick}>Save Changes</button>
            </div>
          ) : (
            <div className='tb'>
              <p className='name'>{character.name}</p>
              <p>{character.description}</p>
              <div className='but'>
              <button className='myButton' onClick={onDelete}>Delete</button>
              <button  className='myButton'onClick={() => setEditing(true)}>Edit</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default SpongeBobCharacters;