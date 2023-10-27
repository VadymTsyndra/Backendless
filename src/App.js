import React, {
 lazy, Suspense, useEffect, useState,
} from 'react';
import {
  Routes, Route, NavLink, Navigate,
} from 'react-router-dom';
import classNames from 'classnames';

// import tabs from './data/tabs.json';

import './App.css';

const DummyTable = lazy(() => import('./tabs/dummyTable'));
const DummyList = lazy(() => import('./tabs/dummyList'));
const DummyChart = lazy(() => import('./tabs/dummyChart'));

const getLinkClass = ({ isActive }) => classNames('tabs', {
  'active-tabs': isActive,
});

export const App = () => {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/backendless/data/tabs.json')
      .then(res => res.json())
      .then(data => setTabs(data));

  }, []);
  return (
    <div className="container">
      <div className="block-tabs">
        {tabs.map(tab => (
          <NavLink
            to={tab.path}
            className={getLinkClass}
            key={tab.id}
          >
            {tab.title}
          </NavLink>
        ))}

      </div>

      <div className="content-tabs">
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Navigate to="/tabs/dummyTable" replace />} />
            <Route path="/tabs/dummyTable" element={<DummyTable />} />
            <Route path="/tabs/dummyChart" element={<DummyChart />} />
            <Route path="/tabs/dummyList" element={<DummyList />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};
