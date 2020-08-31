import React, { useState, useEffect } from 'react';

const useValidacion = (stateInicial, validar, funcion) => {

    const [valores, setValores] = useState(stateInicial);
    const [errores, setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {

        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if (noErrores) {
                funcion(); // FUncion que se ejecuta segun el componente.
            }

            setSubmitForm(false);
        }
    }, [errores]);

    //Funcion que se ejecuta conforme el usuario escribe algo.
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    };

    //Funcion que se ejecuta cuando el usuario hace el submit.
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    }

    //Cuando se realiza el evento Blur.

    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
    }


    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    };
}

export default useValidacion;