export const expression = {
    phonenum: /^(?=(?:\D*\d){7,14}$)[\d\s]+$/,//acepta numeros con espacios con un rango de numeros del 7 al 14
    age: /^(1[89]|[2-9][0-9])$/,//valida que la edad sea numero y que este entre 18 a 99 años
    fullname: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,//permite letras, mayusculas, acentos y espacios
    email: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3})$/,
    text: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\n,*]+$/,
    date: /^(\d{4})-(\d{2})-(\d{2})$/,
    time: /^([01]\d|2[0-3]):([0-5]\d)$/,
    password: /^.{4,12}$/,
}