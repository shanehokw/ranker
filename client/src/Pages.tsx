import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSnapshot } from 'valtio';

import { AppPage, actions, state } from './state';
import Welcome from './pages/Welcome';
import Create from './pages/Create';
import Join from './pages/Join';
import WaitingRoom from './pages/WaitingRoom';

const routeConfig = {
  [AppPage.Welcome]: Welcome,
  [AppPage.Create]: Create,
  [AppPage.Join]: Join,
  [AppPage.WaitingRoom]: WaitingRoom,
};

const Pages: React.FC = () => {
  const currentSnapshot = useSnapshot(state);

  useEffect(() => {
    // if I have a poll and it hasn't started
    if (currentSnapshot.me?.id && !currentSnapshot.poll?.hasStarted) {
      actions.setPage(AppPage.WaitingRoom);
    }
  }, [currentSnapshot.me?.id, currentSnapshot.poll?.hasStarted]);

  return (
    <>
      {Object.entries(routeConfig).map(([page, Component]) => (
        <CSSTransition
          key={page}
          in={page === currentSnapshot.currentPage}
          timeout={300}
          classNames={'page'}
          unmountOnExit
        >
          <div className="page mobile-height max-w-screen-sm mx-auto py-8 px-4 overflow-y-auto">
            <Component />
          </div>
        </CSSTransition>
      ))}
    </>
  );
};

export default Pages;
