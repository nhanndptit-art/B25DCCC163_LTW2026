import React from 'react';

const StudentItem = ({ student, onDelete }) => {
  // Destructuring Assignment
  const { id, name, score, className } = student;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>{className}</td>
      <td>
        <button className="delete-btn" onClick={() => onDelete(id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;