import React, { useState } from 'react';
import { AppPage, actions } from '../state';
import { makeRequest } from '../api';
import { Poll } from 'shared/poll-types';

const Join: React.FC = () => {
  const [pollID, setPollID] = useState('');
  const [name, setName] = useState('');
  const [apiError, setApiError] = useState('');

  const areFieldsValid = (): boolean => {
    if (pollID.length < 1 || pollID.length > 6) {
      return false;
    }

    if (name.length < 1 || name.length > 25) {
      return false;
    }

    return true;
  };

  const handleJoinPoll = async () => {
    actions.startLoading();
    setApiError('');

    const { data, error } = await makeRequest<{
      poll: Poll;
      accessToken: string;
    }>('/polls/join', {
      method: 'POST',
      body: JSON.stringify({
        pollID,
        name,
      }),
    });

    console.log(data, error);

    if (error && error.statusCode === 400) {
      setApiError('Please make sure to include a poll topic!');
    } else if (error && error?.statusCode !== 400) {
      setApiError('Unknown API error');
    } else {
      actions.initializePoll(data.poll);
      actions.setPollAccessToken(data.accessToken);
      actions.setPage(AppPage.WaitingRoom);
    }

    actions.stopLoading();
  };

  return (
    <div className="flex flex-col w-full justify-around items-stretch h-full mx-auto max-w-sm">
      <div className="mb-12">
        <div className="my-4">
          <h3 className="text-center">Enter Code Provided by Friend</h3>
          <div className="text-center w-full">
            <input
              maxLength={6}
              onChange={(e) => {
                setPollID(e.target.value.toUpperCase());
              }}
              className="box info w-full"
              autoCapitalize="characters"
              style={{ textTransform: 'uppercase' }}
            />
          </div>
        </div>
        <div className="my-4">
          <h3 className="text-center">Your Name</h3>
          <div className="text-center w-full">
            <input
              maxLength={25}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="box info w-full"
            ></input>
            {apiError && (
              <p className="text-center text-red-600 font-light mt-8">
                {apiError}
              </p>
            )}
          </div>
          <div className="my-12 flex flex-col justify-center items-center">
            <button
              disabled={!areFieldsValid()}
              className="box btn-orange w-32 my-2"
              onClick={handleJoinPoll}
            >
              Join
            </button>

            <button
              disabled={!areFieldsValid()}
              className="box btn-purple w-32 my-2"
              onClick={() => {
                actions.startOver();
              }}
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
