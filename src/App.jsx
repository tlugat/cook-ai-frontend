import { Theme, mediaQueries } from '@styles/theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@styles/global.css';
import { ChakraProvider } from '@chakra-ui/react';
import ChatBotButton from '@components/ChatBotButton';
import { useState } from 'react';
import ChatBot from '@components/ChatBot';

const router = createBrowserRouter(routes);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 /* ms */ * 60 /* sec */ * 60 /* min */, // 60 min
        },
    },
});

function App() {
    const [isChatBotOpen, setIsChatBotOpen] = useState(false);

    const handleOpenChatBot = () => setIsChatBotOpen(true);
    const handleCloseChatBot = () => setIsChatBotOpen(false);

    return (
        <ThemeProvider theme={mediaQueries}>
            <ChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <Theme />
                    <RouterProvider router={router} />
                    {isChatBotOpen ? (
                        <ChatBotWrapper>
                            <ChatBot onClose={handleCloseChatBot} />
                        </ChatBotWrapper>
                    ) : (
                        <ChatBotButtonWrapper>
                            <ChatBotButton onClick={handleOpenChatBot} />
                        </ChatBotButtonWrapper>
                    )}
                </QueryClientProvider>
            </ChakraProvider>
        </ThemeProvider>
    );
}

const ChatBotWrapper = styled.div`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 100;

    ${({ theme }) => theme.mediaQueries.mobile} {
        bottom: 0;
        right: 0;
    }
`;
const ChatBotButtonWrapper = styled.div`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 100;
`;

export default App;
