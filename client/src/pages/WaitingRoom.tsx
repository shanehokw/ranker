import React, { useEffect } from 'react';
import { actions } from '../state';

const WaitingRoom: React.FC = () => {
  useEffect(() => {
    console.log('Waiting room useEffect');
    actions.initializeSocket();
  }, []);
  return (
    <div className="flex flex-col w-full justify-between items-center">
      <h3>Waiting Room</h3>
    </div>
  );
};

export default WaitingRoom;
