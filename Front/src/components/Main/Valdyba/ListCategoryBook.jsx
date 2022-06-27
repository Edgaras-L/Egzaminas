import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import CreateBookForm from './CreateBookForm';


function ListCategoryBook({value, defaultData, subId, onEdit, onDelete, user, render, setRender, setId }) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleAddPopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <tr>
        <td>{value}</td>
        <td>
          <button onClick={(e) => onDelete(e, defaultData, subId)} className='btn border-0 me-1 fs-5'><MdDelete /></button>
          <button onClick={(e) => onEdit(e, subId)} className='btn border-0 me-1 fs-5'><AiFillEdit /></button>
          <button onClick={(e) => toggleAddPopup(e, subId)} className='btn border-0 me-2 fs-10'>Pridėti knygas</button>
          
        </td>
        {isOpen &&
              <CreateBookForm
                handlepopupClose={toggleAddPopup}
                setRender={setRender}
                userId={user}
                render={render}
                setId={setId}
              />}
    </tr>
    
  )
  
}

export default ListCategoryBook