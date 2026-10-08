import React, { useState } from 'react';

const StudentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', score: '', className: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, score, className } = formData;
    
    // Ràng buộc dữ liệu
    if (!name || !score || !className) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const numScore = parseFloat(score);
    if (numScore < 0 || numScore > 10) {
      setError('Điểm số không hợp lệ (phải từ 0 đến 10)!');
      return;
    }

    setError(''); 
    onAdd({ name, score: numScore, className });
    setFormData({ name: '', score: '', className: '' });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Thêm sinh viên mới</h3>
      {error && <p className="error-text">{error}</p>}
      
      <input 
        type="text" 
        name="name" 
        placeholder="Họ tên" 
        value={formData.name} 
        onChange={handleChange} 
      />
      <input 
        type="number" 
        name="score" 
        placeholder="Điểm số" 
        step="0.1" 
        value={formData.score} 
        onChange={handleChange} 
      />
      <input 
        type="text" 
        name="className" 
        placeholder="Lớp" 
        value={formData.className} 
        onChange={handleChange} 
      />
      
      <button type="submit" className="btn">Thêm</button>
    </form>
  );
};

export default StudentForm;