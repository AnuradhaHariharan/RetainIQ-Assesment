import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import './Product.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Product() {
  const [rows, setRows] = useState([
    {
      id: uuidv4(),
      columns: [
        { id: uuidv4(), content: 'Upload Image', image: null },
      ],
    },
  ]);

  const addRow = () => {
    setRows([...rows, { id: uuidv4(), columns: [{ id: uuidv4(), content: 'Upload Image', image: null }] }]);
  };

  const addColumn = (rowId) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          columns: [...row.columns, { id: uuidv4(), content: 'Upload Image', image: null }],
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleImageUpload = (rowId, columnId, event) => {
    const file = event.target.files[0];
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          columns: row.columns.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                image: URL.createObjectURL(file),
              };
            }
            return column;
          }),
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const deleteColumn = (rowId, columnId) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          columns: row.columns.filter(column => column.id !== columnId),
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const deleteRow = (rowId) => {
    setRows(rows.filter(row => row.id !== rowId));
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const draggedRow = rows[dragIndex];
    const updatedRows = [...rows];
    updatedRows.splice(dragIndex, 1);
    updatedRows.splice(hoverIndex, 0, draggedRow);
    setRows(updatedRows);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className='header-container'>
        <div className='text-badge'>
    <p className='test-text'>
        <i className="fa-solid fa-arrow-left"></i> 
        <span className='custom-underline'> Test 3_staging</span>
    </p>
    <div className='badge'>Primary Feed</div>
</div>
        <button className='publish'>Publish Feed</button></div>
        
        <div className="rows-container">
          {rows.map((row, index) => (
            <Row
              key={row.id}
              row={row}
              rowIndex={index + 1}
              addColumn={() => addColumn(row.id)}
              handleImageUpload={handleImageUpload}
              deleteRow={() => deleteRow(row.id)}
              deleteColumn={deleteColumn}
              moveRow={moveRow}
              index={index}
            />
          ))}
        </div>
        <button className="add-row-button" onClick={addRow}>+ Add Row</button>
      </div>
    </DndProvider>
  );
}

function Row({ row, rowIndex, addColumn, handleImageUpload, deleteRow, deleteColumn, moveRow, index }) {
  const [, ref] = useDrop({
    accept: 'ROW',
    hover(item) {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index; // Update the index of the dragged item
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'ROW',
    item: { id: row.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
  
    <div ref={ref} className={`row ${isDragging ? 'dragging' : ''}`}>
      <div className='number-dot'>
      <div className="row-number">{rowIndex}</div>
      <div ref={drag} className="drag-handle">
        <div className="dot-container">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="dot"></div>
          ))}
        </div>
        </div>
      </div>
      <div className='divider'></div>
      <div className='filter-container'>
      <div className="product-filter">
        <button value="anarkali-kurthi" className="filter-button">
          Product Collection
        </button>
        <button value="lehenga" className="filter-button">
          Contains
        </button>
        <button value="saree" className="filter-button">
          Anarkali
        </button>
      </div>
      </div>
      <div className='divider'></div>
      <div className="columns-container">
        {row.columns.map((column, columnIndex) => (
          <React.Fragment key={column.id}>
            <Column
              content={column.content}
              image={column.image}
              rowId={row.id}
              columnId={column.id}
              handleImageUpload={handleImageUpload}
              deleteColumn={() => deleteColumn(row.id, column.id)}
            />
            {columnIndex < row.columns.length - 1 && <div className='divider'></div>}
          </React.Fragment>
        ))}
      </div>
      <button className="add-column-button" onClick={addColumn}>+ Add Column</button>
      <button className="delete-row-button" onClick={deleteRow}>Delete Row</button>
    </div>
  );
}

function Column({ content, image, rowId, columnId, handleImageUpload, deleteColumn }) {
  const [{ isDragging }, ref] = useDrag({
    type: 'COLUMN',
    item: { content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'COLUMN',
    drop: (item) => console.log('Dropped item:', item),
  });

  return (
    <div ref={(node) => ref(drop(node))} className={`column ${isDragging ? 'dragging' : ''}`}>
      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(rowId, columnId, e)} />
      {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
      <div className="column-content">{content}</div>
      <button className="delete-column-button" onClick={deleteColumn}>Delete Column</button>
    </div>
  );
}

export default Product;