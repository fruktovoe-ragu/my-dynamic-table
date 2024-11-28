import React, { useState, useEffect } from 'react';
import Menu from "./Menu";
import Cell from "./Cell";
import Button from "../components/Button/Button";
import PlusIcon from "../icons/plus";

const Body = ({
    tableData = { bodyRows: [] },
    onDeleteRowClick,
    onSubmitEditedCellClick,
    onCreateNewRowClick,
}) => {
  const [newCellId, setNewCellId] = useState(null);
  const [isNewRowCreated, setIsNewRowCreated] = useState(false);

  useEffect(() => {
    const { bodyRows } = tableData;

    if (tableData.bodyRows[0]) {
      const lastRow = bodyRows.at(-1).cellsData;
      const firstCellId = lastRow[0].id;

      setNewCellId(firstCellId);  
    }
  }, [tableData]);

  const handleDeleteRowClick = rowId => () => {
    setIsNewRowCreated(false);

    onDeleteRowClick?.(rowId);
  };

  const handleCreateNewRowClick = () => {
    setIsNewRowCreated(true);

    onCreateNewRowClick?.();
  };

  return (
    <tbody className="divide-y">
        {tableData.bodyRows.length > 0 && tableData.bodyRows.map(({ cellsData = [], id: rowId }) => (
          <tr 
            key={rowId}
            className="divide-x"
          >
            {cellsData.length > 0 && cellsData.map(({ content, id: cellId, align }) => (
              <Cell
                key={cellId}
                className="px-2 group"
                id={cellId}
                content={content}
                onSubmitClick={onSubmitEditedCellClick}
                isEditMode={isNewRowCreated && newCellId === cellId}
                isControlled={isNewRowCreated && newCellId === cellId}
              >
                <div className={`
                  text-${align} 
                  border border-transparent border-solid w-full rounded cursor-text min-h-9 p-2
                  group-hover:border-slate-400 transition-border duration-300
                `}>
                  <p className="font-normal">
                    {content}
                  </p>
                </div>
                
              </Cell>
            ))}
            {cellsData.length > 0 && 
              <Cell isControlled className="px-4 py-2 group relative">
                <Menu
                  deleteItemContent='Delete row'
                  onDeleteClick={handleDeleteRowClick(rowId)}
                />
              </Cell>
            }
          </tr>
        ))}
        {tableData.headRow.length > 0 && 
          <tr>
            <Cell 
              className="px-4"
              isControlled
            >
              <Button theme="secondary" onClick={handleCreateNewRowClick}>
                <PlusIcon />
              </Button>
            </Cell>
          </tr>
        }
    </tbody>
  );
}

export default Body;
