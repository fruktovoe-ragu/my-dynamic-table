import React, { useState, useEffect } from 'react';
import initialData from './InitialData';
import Head from './sections/Head';
import Body from './sections/Body';

const App = () => {
  const [tableData, setTableData] = useState(() => {
    const savedTableData = localStorage.getItem("tableData");
    
    return savedTableData ? JSON.parse(savedTableData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  const updateData = (updatedHeadRowData, updatedBodyRowsData) => {
    const updatedTableData = {
      headRow: updatedHeadRowData,
      bodyRows: updatedBodyRowsData,
    };

    setTableData(updatedTableData);
    localStorage.setItem("tableData", JSON.stringify(updatedTableData));
  };

  const defineDataAlign = data => isNaN(Number(data)) ? 'left' : 'right';

  // Create handlers
  // Start
  const handleCreateNewColumnClick = (value, newId) => {
    const { headRow, bodyRows } = tableData;

    const newHeadCell = {
      title: value,
      id: newId,
    };
    const updatedHeadRowData = [ ...headRow, newHeadCell];
    const updatedBodyRowsData = bodyRows.map(row => {
      const { cellsData, id } = row;
      const newCellsData = [
        ...cellsData, { 
          content: '', 
          id: `${id} + ${newId}`, 
          align: defineDataAlign(''),
        },
      ];

      return { ...row, cellsData: newCellsData };
    });

    updateData(updatedHeadRowData, updatedBodyRowsData);
  };

  const handleCreateNewRowClick = () => {
    const { headRow, bodyRows } = tableData;

    const newRowId = Date.now();
    const currentCellsNumber = headRow.length;
    const cellsArr = Array.from({ length: currentCellsNumber }, (_, index) => ({
      id: newRowId + index + 1,
      content: '',
      align: defineDataAlign(''),
    }));
    const newRow = { id: newRowId, cellsData: cellsArr };

    updateData(headRow, [...bodyRows, newRow]);
  };
  // End

  // Submit handlers
  // Start
  const handleSubmitCellEditingClick = (value, cellId) => {
    const { headRow, bodyRows } = tableData;

    const updatedHeadRowData = headRow.map(cell => {
      return cell.id === cellId ? { ...cell, title: value } : cell
    });

    const updatedBodyRowsData = bodyRows.map(row => {
      const { cellsData } = row;
      
      const updatedCellsData = cellsData.map(cell => 
        cell.id === cellId ? { 
          ...cell, 
          content: value, 
          align: defineDataAlign(value),
        } : cell
      );
    
      return { ...row, cellsData: updatedCellsData };
    });
    
    updateData(updatedHeadRowData, updatedBodyRowsData);
  };
  // End

  // Delete handlers
  // Start
  const handleDeleteColumnClick = cellId => {
    const { headRow, bodyRows } = tableData;

    const position = headRow.findIndex(cell => cell.id === cellId);
    const updatedHeadRowData = headRow.filter((_, index) => index !== position);
    const filteredBodyRowsData = bodyRows.map(row => {
      if (!row.cellsData) {
        return row;
      }

      return {
        ...row,
        cellsData: row.cellsData.filter((_, index) => index !== position),
      };
    });

    const updatedBodyRowsData = 
      filteredBodyRowsData[0]?.cellsData?.length === 0 ? [] : filteredBodyRowsData;
   
    updateData(updatedHeadRowData, updatedBodyRowsData);
  };

  const handleDeleteRowClick = rowId => {
    const { headRow, bodyRows } = tableData;

    const updatedBodyRowsData = bodyRows.filter(({ id }) => id !== rowId);

    updateData(headRow, updatedBodyRowsData);
  };
  // End

  return (
    <div className="flex flex-col align-center p-8">
      <table className="p-6 rounded-xl divide-y bg-white">
        <Head
          headData={tableData.headRow}
          onDeleteColmnClick={handleDeleteColumnClick}
          onCreateNewColumnClick={handleCreateNewColumnClick}
          onSubmitEditedCellClick={handleSubmitCellEditingClick}
        />
        <Body 
          tableData={tableData}
          onDeleteRowClick={handleDeleteRowClick}
          onCreateNewRowClick={handleCreateNewRowClick}
          onSubmitEditedCellClick={handleSubmitCellEditingClick}
        />
      </table>
    </div>
  );
}

export default App;
