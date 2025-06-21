import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import QuestWrapper from './components/QuestWrapper.jsx';
import './index.css';
import '@questlabs/react-sdk/dist/style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuestWrapper>
      <App />
    </QuestWrapper>
  </StrictMode>
);