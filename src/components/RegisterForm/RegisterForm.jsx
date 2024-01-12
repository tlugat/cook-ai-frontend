/* eslint-disable no-unused-vars */
import { Controller, useForm } from 'react-hook-form';
import { registerFormSchema } from './RegisterForm.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import Cluster from '@components/layout/Cluster';
import useCreateUserMutation from '@queries/user/useCreateUserMutation.hook';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(registerFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            password_confirmation: '',
        },
    });
    const { isDirty, isValid } = formState;
    const register = useCreateUserMutation();

    const onSubmit = (formData) => {
        const { password_confirmation, ...data } = formData;
        register.mutate(data, {
            onSuccess: () => {
                navigate('/login', { replace: true });
            },
        });
    };

    return (
        <CenteredCard>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Cluster gap="1rem" align="center">
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
                        <Label>Pseudo</Label>
                        <Controller
                            control={control}
                            name="username"
                            render={({ field, fieldState: { error } }) => (
                                <Input {...field} type="text" />
                            )}
                        />
                    </FormControl>
                </Cluster>
                <Cluster gap="1rem" align="center">
                    <FormControl>
                        <Label>Nom</Label>
                        <Controller
                            control={control}
                            name="lastName"
                            render={({ field, fieldState: { error } }) => (
                                <Input {...field} type="text" />
                            )}
                        />
                    </FormControl>
                    <FormControl>
                        <Label>Prénom</Label>
                        <Controller
                            control={control}
                            name="firstName"
                            render={({ field, fieldState: { error } }) => (
                                <Input {...field} type="text" />
                            )}
                        />
                    </FormControl>
                </Cluster>
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
                <FormControl>
                    <Label>Confirmer le mot de passe</Label>
                    <Controller
                        control={control}
                        name="password_confirmation"
                        render={({ field, fieldState: { error } }) => (
                            <Input {...field} type="password" />
                        )}
                    />
                </FormControl>
                <SubmitButton disabled={!isDirty || !isValid} type="submit">
                    S'inscrire
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
export default RegisterForm;