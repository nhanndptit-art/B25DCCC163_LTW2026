import React from 'react';
import StudentItem from './StudentItem';

const StudentTable = ({ students, onDelete }) => {
  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ Tên</th>
          <th>Điểm Số</th>
          <th>Lớp</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentItem 
            key={student.id} 
            student={student} 
            onDelete={onDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;