import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="navbar-brand">Thử thách 3 mạng</div>
      <div className="navbar-links">
        <NavLink to="/" end className={getNavLinkClass}>
          Trang chủ
        </NavLink>
        <NavLink to="/questions" className={getNavLinkClass}>
          Ngân hàng câu hỏi
        </NavLink>
        <NavLink to="/history" className={getNavLinkClass}>
          Lịch sử
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;