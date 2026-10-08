import React, { useState } from 'react';
import './App.css'; 
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

const App = () => {
  const initialData = [
    { id: 1, name: "Nguyễn Văn A", score: 8.5, className: "CNTT1" },
    { id: 2, name: "Trần Thị B", score: 4.0, className: "CNTT2" },
    { id: 3, name: "Lê Văn C", score: 6.5, className: "CNTT1" }
  ];

  const [students, setStudents] = useState(initialData);
  const [filterType, setFilterType] = useState('all');

  const handleAddStudent = (newStudent) => {
    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    setStudents([...students, { id: newId, ...newStudent }]);
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const filteredStudents = students.filter((student) => {
    if (filterType === 'excellent') return student.score >= 8;
    if (filterType === 'failed') return student.score < 5;
    return true; 
  });

  const totalStudents = filteredStudents.length;
  const averageScore = totalStudents === 0 
    ? 0 
    : (filteredStudents.reduce((acc, student) => acc + student.score, 0) / totalStudents).toFixed(2);

  return (
    <div className="app-container">
      <h1>Quản lý Điểm Sinh viên</h1>
      
      <StudentForm onAdd={handleAddStudent} />

      <div className="filter-container">
        <strong>Bộ lọc: </strong>
        <button className="btn" onClick={() => setFilterType('all')}>Tất cả</button>
        <button className="btn filter-btn" onClick={() => setFilterType('excellent')}>Học sinh Giỏi (&gt;= 8)</button>
        <button className="btn" onClick={() => setFilterType('failed')}>Học sinh Trượt (&lt; 5)</button>
      </div>

      <div className="stats-container">
        <p>{`Tổng số lượng sinh viên: ${totalStudents}`}</p>
        <p>{`Điểm trung bình: ${averageScore}`}</p>
      </div>

      <StudentTable students={filteredStudents} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default App;