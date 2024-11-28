import React, { useState } from 'react';
import Button from "../components/Button/Button";
import Cell from "./Cell";
import Menu from "./Menu";
import PlusIcon from "../icons/plus";

const Head = ({ 
  headData = [],
  onDeleteColmnClick,
  onCreateNewColumnClick,
  onSubmitEditedCellClick,
}) => {
  const [editModeIndex, setEditModeIndex] = useState(null);

  const handleEditCellClick = id => () => {
    setEditModeIndex(id);
  };

  const handleDeleteColumnClick = id => () => {
    onDeleteColmnClick?.(id);
  };

  const handleSubmitEditedCellClick = (value, id) => {
    setEditModeIndex(null);

    onSubmitEditedCellClick?.(value, id);
  }

  return (
    <thead className="relative z-10">
      <tr className="divide-x">
        {headData.length !== 0 && headData.map(({ title, id }, index) => (
          <Cell
            className="px-4 py-2 group relative"
            key={id}
            id={id}
            content={title}
            isControlled
            isEditMode={editModeIndex === id}
            onSubmitClick={handleSubmitEditedCellClick}
            onCancelClick={() => setEditModeIndex(null)}
          >
            <>
                <p className="text-left cursor-default">{title}</p>
                <Menu
                  order={index}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  hasEditItem
                  deleteItemContent='Delete column'
                  onEditClick={handleEditCellClick(id)}
                  onDeleteClick={handleDeleteColumnClick(id)}
                />
              </>
          </Cell>
        ))}
        <Cell
          className="px-4"
          onSubmitClick={onCreateNewColumnClick}
        >
          <Button theme="secondary">
            <PlusIcon />
          </Button>
        </Cell>
      </tr>
    </thead>
  );
}

export default Head;