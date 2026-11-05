import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-card center-card">
      <h2>404 – Không tìm thấy trang</h2>
      <Link to="/" className="primary-link-btn">
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;