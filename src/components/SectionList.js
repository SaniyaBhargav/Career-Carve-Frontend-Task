import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SectionItem from './SectionItem';

const SectionList = ({ sections, onSortEnd, onSave }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedSections = Array.from(sections);

    const [removed] = updatedSections.splice(source.index, 1);
    updatedSections.splice(destination.index, 0, removed);

    onSortEnd(updatedSections);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="section-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sections.map((section, index) => (
              <SectionItem
                key={section.id}
                section={section}
                index={index}
                onSave={onSave}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
