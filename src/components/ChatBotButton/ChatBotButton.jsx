import { IconButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { ReactComponent as ChefIcon } from '@public/icons/chef_hat.svg';

const ChatBotButton = (props) => {
    return (
        <IconButton
            isRound={true}
            variant="solid"
            backgroundColor="#8bc6ec"
            color="white"
            aria-label="ChatBot open"
            fontSize="1.5rem"
            icon={<ChefIcon />}
            padding="0.25rem"
            {...props}
        />
    );
};

ChatBotButton.propTypes = {};

export default ChatBotButton;
