import React from 'react';
import { GetStarted } from '@questlabs/react-sdk';
import { questConfig } from '../config/questConfig';
import { useTask } from '../context/TaskContext';

const GetStartedQuest = () => {
  const { user } = useTask();

  // Generate unique user ID based on authenticated user or fallback
  const uniqueUserId = user?.id || localStorage.getItem('userId') || questConfig.USER_ID;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <GetStarted
        questId={questConfig.GET_STARTED_QUESTID}
        uniqueUserId={uniqueUserId}
        accent={questConfig.PRIMARY_COLOR}
        autoHide={false}
      >
        <GetStarted.Header />
        <GetStarted.Progress />
        <GetStarted.Content />
        <GetStarted.Footer />
      </GetStarted>
    </div>
  );
};

export default GetStartedQuest;