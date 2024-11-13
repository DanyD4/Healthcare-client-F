import React from 'react';
import AvailableTimes from './AvailableTimes';
import { useAuth } from '../hooks/useAuth';

const SeekHealth = () => {
  const {
    authState: { user },
  } = useAuth();

  return (
    <div>
      <h1>Välkommen till SeekHealth</h1>
      <AvailableTimes caregiverId={user.caregiverId} />
    </div>
  );
};

export default SeekHealth;
