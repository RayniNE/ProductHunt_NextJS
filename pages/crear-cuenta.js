import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/UI/Formulario';

//Validaciones.
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const CrearCuenta = () => {

    const STATE_INICIAL = {
        nombre: '',
        email: '',
        password: ''
    };

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

    const { nombre, email, password } = valores;

    function crearCuenta() {
        console.log('Creando cuenta...');
    }


    return (
        <div>

            <Layout>

                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                > Crear Cuenta </h1>

                <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {errores.nombre && <Error> {errores.nombre} </Error>}

                    <Campo>
                        <label htmlFor="nombre"> Nombre </label>
                        <input
                            type="text"
                            id="nombre"
                            placeholder="Tu nombre"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    {errores.email && <Error> {errores.email} </Error>}

                    <Campo>
                        <label htmlFor="email"> Email </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Tu email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    {errores.password && <Error> {errores.password} </Error>}

                    <Campo>
                        <label htmlFor="password"> Contraseña </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Tu contraseña"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    <InputSubmit
                        type="submit"
                        value="Crear cuenta"
                    />

                </Formulario>

            </Layout>

        </div >
    )
}
export default CrearCuenta;