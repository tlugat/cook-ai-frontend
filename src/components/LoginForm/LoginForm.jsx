/* eslint-disable no-unused-vars */
import { Controller, useForm } from 'react-hook-form';
import { loginFormSchema } from './LoginForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import useLoginMutation from './useLoginMutation.hook';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const { isDirty, isValid, errors } = formState;
    const login = useLoginMutation();

    const onSubmit = (data) => {
        login.mutate(data, {
            onSuccess: ({ accessToken }) => {
                localStorage.setItem('accessToken', accessToken);
                navigate('/', { replace: true });
            },
        });
    };

    return (
        <CenteredCard>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Label>Email</Label>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field, fieldState: { error } }) => (
                            <Input {...field} type="text" />
                        )}
                    />
                </FormControl>
                <FormControl>
                    <Label>Mot de passe</Label>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field, fieldState: { error } }) => (
                            <Input {...field} type="password" />
                        )}
                    />
                </FormControl>
                <SubmitButton disabled={!isDirty || !isValid} type="submit">
                    Se connecter
                </SubmitButton>
            </Form>
        </CenteredCard>
    );
};

const CenteredCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
`;

const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    align-items: flex-start;
`;

const Label = styled.label`
    font-size: 1.2rem;
`;

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export default LoginForm;