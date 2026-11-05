import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  return (
    <div className="app-wrapper">
      <NavBar />
      <main className="main-container">
        {loading ? (
          <p className="status-message">Đang tải câu hỏi...</p>
        ) : error ? (
          <p className="status-message error-message">{error}</p>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Layout;