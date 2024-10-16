import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import './Product.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Heading from '../../Components/Headings/Heading';

function Product() {
  const [rows, setRows] = useState([
    {
      id: uuidv4(),
      columns: [
        { id: uuidv4(), content: 'Upload Image', image: null, imageName: '' },
      ],
    },
  ]);

  const addRow = () => {
    setRows([...rows, { id: uuidv4(), columns: [{ id: uuidv4(), content: 'Upload Image', image: null, imageName: '' }] }]);
  };

  const addColumn = (rowId) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          columns: [...row.columns, { id: uuidv4(), content: 'Upload Image', image: null, imageName: '' }],
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
                imageName: file.name,
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

  // Calculate total columns
  const totalColumns = rows.reduce((max, row) => Math.max(max, row.columns.length), 0);

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
          <button className='publish'>Publish Feed</button>
        </div>

        {/* Render the Heading component */}
        <Heading columnCount={totalColumns} />

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
        <div className="add-row-div" onClick={addRow}><i className="fa-solid fa-plus"></i></div>
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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={ref} 
      className={`row ${isDragging ? 'dragging' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='delete-container-box'>
        <div className={`delete-row-div ${isHovered ? 'visible' : 'hidden'}`} onClick={deleteRow}>
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
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
          <button value="anarkali-kurthi" className="filter-button">Product Collection</button>
          <button value="lehenga" className="filter-button">Contains</button>
          <button value="saree" className="filter-button">Anarkali</button>
        </div>
      </div>
      <div className='divider'></div>
      <div className="columns-container">
        {row.columns.map((column, columnIndex) => (
          <React.Fragment key={column.id}>
            <Column
              content={column.content}
              image={column.image}
              imageName={column.imageName}  // Pass image name to Column
              rowId={row.id}
              columnId={column.id}
              handleImageUpload={handleImageUpload}
              deleteColumn={() => deleteColumn(row.id, column.id)}
            />
            {columnIndex < row.columns.length - 1 && <div className='divider'></div>}
          </React.Fragment>
        ))}
      </div>
      <div className="add-row-div" onClick={addColumn}><i className="fa-solid fa-plus"></i></div>
    </div>
  );
}

function Column({ content, image, imageName, rowId, columnId, handleImageUpload, deleteColumn }) {
  const [{ isDragging }, ref] = useDrag({
    type: 'COLUMN',
    item: { content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  return (
    <div 
      ref={ref} 
      className={`column ${isDragging ? 'dragging' : ''}`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={(e) => handleImageUpload(rowId, columnId, e)} 
      />

      {!image && (
        <>
          <AddPhotoAlternateOutlinedIcon 
            className="upload-icon" 
            onClick={handleIconClick} 
            style={{ cursor: 'pointer', fontSize: '40px' }} 
          />
          <div className="column-content">{content}</div>
        </>
      )}

      {image && (
        <>
          <img src={image} alt="Uploaded" className="uploaded-image" />
          <div className="image-name">{imageName}</div> {/* Display image name */}
        </>
      )}

      <button className={`delete-column-button ${isHovered ? 'visible' : 'hidden'}`} onClick={deleteColumn}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}

export default Product;