import * as yup from 'yup';

export const schema = yup.object().shape({
    email: yup.string().email("E-mail Inválido").required("E-mail é obrigatório"),
    password: yup.string().min(6, "A senha deve conter no mínimo 6 caracteres").required("Senha é obrigatória")
}); 