export const moneyMapper = (value:number) => {
    return value.toLocaleString('pt-br', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });
}
