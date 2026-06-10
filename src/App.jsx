import AppRoutes from './routes/AppRoutes.jsx';
import { FeedbackProvider } from './context/FeedbackContext.jsx';
import { ChatProvider } from './context/ChatContext.jsx';

export default function App() {
  return (
    <FeedbackProvider>
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>
    </FeedbackProvider>
  );
}
