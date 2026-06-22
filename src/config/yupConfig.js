import * as yup from "yup"

yup.setLocale({
    mixed: 
    {
        required: "Este campo es requerido",
        notType: ({ type }) => 
        {
            const types = {
                number: "Debe ser un número válido",
                date: "Debe ser una fecha válida",
                boolean: "Debe ser verdadero o falso",
                string: "Debe ser texto",
                object: "Formato de objeto inválido",
                array: "Debe ser una lista válida",
            };

            return types[type] ?? `Tipo de dato inválido (se esperaba ${type})`
        },
        defined: "Este campo no puede ser undefined",
        notNull: "Este campo no puede ser nulo",
        oneOf: ({ values }) => `Debe ser uno de los siguientes valores: ${values}`,
        notOneOf: ({ values }) => `No puede ser ninguno de los siguientes valores: ${values}`,
    },

    string: 
    {
        length: ({ length }) => `Debe tener exactamente ${length} caracteres`,
        min: ({ min }) => `Debe tener al menos ${min} caracteres`,
        max: ({ max }) => `No puede tener más de ${max} caracteres`,
        email: "Ingresa un correo electrónico válido",
        url: "Ingresa una URL válida (ej: https://ejemplo.com)",
        uuid: "Debe ser un UUID válido",
        trim: "No debe tener espacios al inicio ni al final",
        lowercase: "Debe estar en minúsculas",
        uppercase: "Debe estar en mayúsculas",
        matches: "El formato ingresado no es válido",
    },

    number: 
    {
        min: ({ min }) => `El valor mínimo permitido es ${min}`,
        max: ({ max }) => `El valor máximo permitido es ${max}`,
        lessThan: ({ less }) => `Debe ser menor que ${less}`,
        moreThan: ({ more }) => `Debe ser mayor que ${more}`,
        positive: "Debe ser un número positivo",
        negative: "Debe ser un número negativo",
        integer: "Debe ser un número entero",
    },

    date: 
    {
        min: ({ min }) =>
        `La fecha debe ser posterior a ${
            min instanceof Date ? min.toLocaleDateString("es-PE") : min
        }`,
        max: ({ max }) =>
        `La fecha debe ser anterior a ${
            max instanceof Date ? max.toLocaleDateString("es-PE") : max
        }`,
    },

    boolean: 
    {
        isValue: ({ value }) => `Debe ser ${value ? "verdadero" : "falso"}`,
    },

    object: 
    {
        noUnknown: ({ unknown }) =>
        `Contiene campos no permitidos: ${unknown}`,
    },

    array: 
    {
        min: ({ min }) => `Debe contener al menos ${min} elemento(s)`,
        max: ({ max }) => `No puede contener más de ${max} elemento(s)`,
        length: ({ length }) => `Debe contener exactamente ${length} elemento(s)`,
    },
})

export default yup;