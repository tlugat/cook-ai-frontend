import * as yup from 'yup';

export const chatBotFormSchema = yup.object({
    message: yup.string().max(300),
});
