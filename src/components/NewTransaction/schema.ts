import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
    description: yup.string().required("A descrição é obrigatória"),
    value: yup.number().min(0.01, "O valor mínimo deve ser maior que 0.01").required("O valor é obrigatório"),
    typeId: yup.number().min(1, "Selecione um tipo de transação").required("O tipo de transação é obrigatório"),
    categoryId: yup.number().min(1, "Selecione uma categoria").required("A categoria é obrigatória"),
});