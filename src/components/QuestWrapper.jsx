import React from 'react';
import { QuestProvider } from '@questlabs/react-sdk';
import { questConfig } from '../config/questConfig';

const QuestWrapper = ({ children }) => {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      {children}
    </QuestProvider>
  );
};

export default QuestWrapper;