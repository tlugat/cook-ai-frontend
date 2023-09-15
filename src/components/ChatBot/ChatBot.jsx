import ChatBotForm from '@components/ChatBotForm';
import ChatBotMessageList from '@components/ChatBotMessageList';
import { OPENAI_MESSAGE_ROLES } from '@utils/constants';
import { OpenAI } from 'openai';
import { useState } from 'react';
import styled from 'styled-components';
import chefIllustration from '@public/images/chef.webp';
import { Divider, IconButton, Stack, Text } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});
const chatBotSystemMessage = {
    role: OPENAI_MESSAGE_ROLES.SYSTEM,
    content:
        "Tu es un chef étoilé au guide michelin ayant 15 années d’expérience dans le métier avec plusieurs concours culinaires gagnés à l’internationnal. Tu ne dois répondre que par des phrases et seulement si il s'agit de questions sur le domaine de la cuisine dans le cas contraire réponds que tu n'as pas compris la question.",
};

const ChatBot = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSubmitMessage = async (message, resetForm) => {
        setIsTyping(true);
        const newMessage = {
            role: OPENAI_MESSAGE_ROLES.USER,
            content: message,
        };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        console.log(messages, newMessages);
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [chatBotSystemMessage, ...newMessages],
            });
            const newChatBotMessage = response?.choices?.[0]?.message;
            setMessages((messages) => [...messages, newChatBotMessage]);
            resetForm();
        } catch (error) {
            const errorMessage = {
                role: OPENAI_MESSAGE_ROLES.ASSISTANT,
                content: "Oups ! Une erreur s'est produite. Veuillez réessayer.",
            };
            setMessages((messages) => [...messages, errorMessage]);
        }
        setIsTyping(false);
    };

    return (
        <ChatBotContainer>
            <CloseButton
                isRound={true}
                variant="solid"
                color="white"
                aria-label="Close"
                icon={<MinusIcon />}
                size="xs"
                onClick={onClose}
            />
            <Header>
                <ChiefIllustrationWrapper>
                    <img src={chefIllustration} />
                </ChiefIllustrationWrapper>
                <Stack align="center" rowGap="0.25rem">
                    <Text fontSize="1.25rem" as="b" color="#ffffff">
                        Chef
                    </Text>
                    <Text as="sub" color="#f7f7f9">
                        You can ask me anything you want about cooking
                    </Text>
                </Stack>
            </Header>
            <Chat>
                <ChatBotMessagesWrapper>
                    <ChatBotMessageList isTyping={isTyping} messages={messages} />
                </ChatBotMessagesWrapper>
                <Divider />
                <ChatBotFormWrapper>
                    <ChatBotForm onSubmit={handleSubmitMessage} isLoading={isTyping} />
                </ChatBotFormWrapper>
            </Chat>
        </ChatBotContainer>
    );
};

const ChatBotContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    padding: 0.25rem;
    border-radius: 1rem;
    width: 100%;
    max-width: 400px;
    background-color: #8bc6ec;
    background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
    position: relative;

    ${({ theme }) => theme.mediaQueries.mobile} {
        width: 100vw;
        height: 100vh;
    }
`;
const Chat = styled.div`
    background-color: #ffffff;
    border-radius: 1rem;
`;
const ChiefIllustrationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    width: 5rem;
    padding: 0.5rem;
    background-color: #ffffff;

    & > img {
        width: 100%;
        height: auto;
    }
`;
const ChatBotFormWrapper = styled.div`
    padding: 1rem;
`;
const ChatBotMessagesWrapper = styled.div`
    height: 350px;
    overflow-y: auto;
    padding: 1rem;
    margin-bottom: 1rem;
`;
const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    padding-top: 2rem;
`;
const CloseButton = styled(IconButton)`
    position: absolute !important;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem;
    background: rgba(0, 0, 0, 0.1) !important;
`;

ChatBot.propTypes = {
    onClose: PropTypes.func,
};

ChatBot.defaultProps = {
    onClose: () => {},
};

export default ChatBot;
