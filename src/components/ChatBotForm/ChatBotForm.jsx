import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { chatBotFormSchema } from './ChatBotForm.schema';
import PropTypes from 'prop-types';
import { IconButton, Input } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import styled from 'styled-components';

const ChatBotForm = ({ onSubmit, isLoading }) => {
    const { control, handleSubmit, formState, reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(chatBotFormSchema),
        defaultValues: {
            message: '',
        },
    });
    const { isDirty, isValid } = formState;

    return (
        <Form onSubmit={handleSubmit(({ message }) => onSubmit(message, reset))}>
            <Controller
                control={control}
                name="message"
                render={({ field, fieldState: { error } }) => (
                    <InputStyled
                        {...field}
                        variant="unstyled"
                        placeholder="Type and press [enter]"
                        isDisabled={isLoading}
                        isInvalid={!!error}
                    />
                )}
            />
            <IconButton
                isRound={true}
                variant="solid"
                backgroundColor="#8bc6ec"
                color="white"
                aria-label="Done"
                fontSize="1.5rem"
                icon={<ArrowForwardIcon />}
                isDisabled={!isDirty || !isValid || isLoading}
                type="submit"
            />
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
`;
const InputStyled = styled(Input)`
    flex: 1;
    font-size: 0.875rem !important;
`;

ChatBotForm.propTypes = {
    onSubmit: PropTypes.func,
    isLoading: PropTypes.bool,
};

ChatBotForm.defaultProps = {
    onSubmit: () => {},
    isLoading: false,
};

export default ChatBotForm;
