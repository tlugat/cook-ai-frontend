import { Text } from '@chakra-ui/react';
import { OPENAI_MESSAGE_ROLES } from '@utils/constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import chefIcon from '@public/icons/chef_hat.svg';
import userIcon from '@public/icons/pan_egg.svg';

const ChatBoxMessage = ({ message }) => {
    const { role, content } = message;
    const imageSource = role === OPENAI_MESSAGE_ROLES.ASSISTANT ? chefIcon : userIcon;
    return (
        <MessageWrapper role={role}>
            <Message role={role}>
                <Text fontSize="0.875rem">{content}</Text>
            </Message>
            <RoleIconWrapper role={role}>
                <img src={imageSource} />
            </RoleIconWrapper>
        </MessageWrapper>
    );
};

const Message = styled.div`
    padding: 1rem;
    background-color: #c1d9f0;
    border-radius: 1rem 1rem 0 1rem;
    width: fit-content;

    ${({ role }) =>
        role === OPENAI_MESSAGE_ROLES.ASSISTANT &&
        `
        border-radius: 1rem 1rem 1rem 0;
        align-self: flex-start;
        background-color: #f7f7f9;
    `}
`;
const MessageWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    column-gap: 0.5rem;
    align-self: flex-end;

    ${({ role }) =>
        role === OPENAI_MESSAGE_ROLES.ASSISTANT &&
        `
    align-self: flex-start;
`}
`;
const RoleIconWrapper = styled.div`
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

    ${({ role }) => role === OPENAI_MESSAGE_ROLES.ASSISTANT && `order: -1;`}
`;

ChatBoxMessage.propTypes = {
    message: PropTypes.shape({
        role: PropTypes.oneOf(Object.values(OPENAI_MESSAGE_ROLES)),
        content: PropTypes.string,
    }),
};

export default ChatBoxMessage;
