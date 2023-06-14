import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import SectionDescription from './SectionDescription';
import ToggleButton from 'react-toggle-button'
import { MdOutlineInfo } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';
import { MdOutlineMenu } from 'react-icons/md';

const SectionItem = ({ section, index, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(section.name);
  const [toggle, setToggle] = useState(section.enabled);
  const [showDescription, setShowDescription] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (name !== section.name || toggle !== section.enabled) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [name, toggle, section.name, section.enabled, setIsChanged]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    onSave(section.id, name, toggle);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleInfo = () => {
    setShowDescription(!showDescription);
  };

  const handleDarkToggle = () => {
    setIsDark(!isDark); 
  };

  return (
    <Draggable draggableId={section.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            backgroundColor: isDark ? '#bababa' : '#f7f7f7',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', width:'80vw' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={handleDarkToggle} style={{ color: isDark ? '#fff' : '#555', border: 'none' }}>
                <MdOutlineMenu />
              </button>
              <button
                className="info-button"
                onClick={handleInfo}
                style={{
                  cursor: 'pointer',
                  padding: '6px',
                  border: 'none',
                  backgroundColor: '#f7f7f7',
                  fontSize: '18px',
                  color: '#555',
                  transition: 'color 0.3s',
                }}
              >
                <MdOutlineInfo size={24} />
              </button>
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    fontWeight: 'bold',
                    marginRight: '10px',
                  }}
                />
              ) : (
                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                  {name}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {editing ? (
                <button
                  onClick={handleSave}
                  disabled={!isChanged}
                  style={{
                    cursor: 'pointer',
                    padding: '6px',
                    border: 'none',
                    backgroundColor: !isChanged ? '#ccc' : '#f7f7f7',
                    fontSize: '18px',
                    color: !isChanged ? '#999' : '#555',
                    transition: 'color 0.3s, background-color 0.3s',
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  disabled={!toggle}
                  style={{
                    cursor: 'pointer',
                    padding: '6px',
                    border: 'none',
                    backgroundColor: '#f7f7f7',
                    fontSize: '18px',
                    color: '#555',
                    transition: 'color 0.3s',
                  }}
                >
                  <BiPencil />
                </button>
              )}
              <ToggleButton
                inactiveLabel={'✕'}
                activeLabel={'✓'}
                value={toggle}
                onToggle={
                  handleToggle
                }
              />
            </div>
          </div>
          {showDescription && (
            <SectionDescription description={section.description} />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default SectionItem;
