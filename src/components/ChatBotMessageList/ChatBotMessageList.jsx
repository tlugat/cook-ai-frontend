import PropTypes from 'prop-types';
import ChatBotMessage from '@components/ChatBotMessage';
import { OPENAI_MESSAGE_ROLES } from '@utils/constants';
import styled from 'styled-components';
import chefIcon from '@public/icons/chef_hat.svg';

const ChatBotMessageList = ({ messages, isTyping }) => {
    const initialChatBotAssistantMessage = {
        role: OPENAI_MESSAGE_ROLES.ASSISTANT,
        content: 'Bonjour, que puis-je faire pour vous ?',
    };

    return (
        <Wrapper>
            <ChatBotMessage message={initialChatBotAssistantMessage} />
            {messages.map((message, i) => (
                <ChatBotMessage key={i} message={message} />
            ))}
            {isTyping && (
                <AssistantTypingWrapper>
                    <AssistantIconWrapper>
                        <img src={chefIcon} />
                    </AssistantIconWrapper>
                    <DotFlashing />
                </AssistantTypingWrapper>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    height: 100%;
`;
const DotFlashing = styled.div`
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #8bc6ec;
    color: #8bc6ec;
    animation: dot-flashing 1s infinite linear alternate;
    animation-delay: 0.5s;

    &::before,
    &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
    }

    &::before {
        left: -15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #8bc6ec;
        color: #8bc6ec;
        animation: dot-flashing 1s infinite alternate;
        animation-delay: 0s;
    }
    &::after {
        left: 15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #8bc6ec;
        color: #8bc6ec;
        animation: dot-flashing 1s infinite alternate;
        animation-delay: 1s;
    }

    @keyframes dot-flashing {
        0% {
            background-color: #8bc6ec;
        }
        50%,
        100% {
            background-color: #8bc6ec;
            opacity: 0.2;
        }
    }
`;
const AssistantIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    padding: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #8bc6ec;
    background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);

    & > img {
        width: 100%;
        height: 100%;
    }
`;
const AssistantTypingWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1.5rem;
`;

ChatBotMessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            role: PropTypes.string,
            content: PropTypes.string,
        }),
    ),
    isTyping: PropTypes.bool,
};

ChatBotMessageList.defaultProps = {
    messages: [],
    isTyping: false,
};

export default ChatBotMessageList;
