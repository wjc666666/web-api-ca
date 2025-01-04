import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * DashboardPage component to display user-specific data.
 */
const DashboardPage = () => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {auth.user.username}!</h2>
      <p>Username: {auth.user.username}</p>
      {/* 在这里添加更多用户特定的数据，例如收藏的电影 */}
    </div>
  );
};

export default DashboardPage;