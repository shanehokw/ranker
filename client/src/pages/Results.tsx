import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { actions, state } from '../state';
import ResultCard from '../components/ui/ResultCard';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';

const Results: React.FC = () => {
  const { poll, isAdmin, participantCount, rankingsCount } = useSnapshot(state);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLeavePollOpen, setIsLeavePollOpen] = useState(false);

  return (
    <>
      <div className="mx-auto flex flex-col w-full justify-between items-center h-full max-w-sm">
        <div className="w-full">
          <h1 className="text-center mt-12 mb-4">Results</h1>
          {poll?.results.length ? (
            <ResultCard results={poll.results} />
          ) : (
            <p className="text-center text-xl">
              <span className="text-orange-600">{rankingsCount}</span> of{' '}
              <span className="text-purple-600">{participantCount}</span>{' '}
              participants have voted
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center">
          {isAdmin && !poll?.results.length && (
            <>
              <button
                className="box btn-orange my-2"
                onClick={() => setIsConfirmationOpen(true)}
              >
                End Poll
              </button>
            </>
          )}
          {!isAdmin && !poll?.results.length && (
            <div className="my-2 italic">
              Waiting for Admin,{' '}
              <span className="font-semibold">
                {poll?.participants[poll.adminID]}, to finalize the poll
              </span>
            </div>
          )}
          {!!poll?.results.length && (
            <button
              className="box btn-purple my-2"
              onClick={() => setIsLeavePollOpen(true)}
            >
              Leave Poll
            </button>
          )}
        </div>
      </div>
      {isAdmin && (
        <ConfirmationDialog
          message="Close poll and calculate rankings?"
          showDialog={isConfirmationOpen}
          onCancel={() => setIsConfirmationOpen(false)}
          onConfirm={() => {
            actions.closePoll();
            setIsConfirmationOpen(false);
          }}
        />
      )}
      {isLeavePollOpen && (
        <ConfirmationDialog
          message="You will lose your results, is that alright?"
          showDialog={isLeavePollOpen}
          onCancel={() => setIsLeavePollOpen(false)}
          onConfirm={() => actions.startOver()}
        />
      )}
    </>
  );
};

export default Results;
