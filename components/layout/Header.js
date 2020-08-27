import React from 'react';
import Buscar from '../UI/Buscar';
import Navegacion from './Navegacion';
import Link from 'next/link';

const Header = () => {

    return (
        <header>
            <div>
                <div>
                    <p> P </p>

                    {/* Buscador aqui. */}
                    <Buscar />

                    {/* Nav aqui. */}
                    <Navegacion />
                </div>

                <div>

                    <p> Hola: Rayni </p>

                    <button type="button"> Cerrar sesión </button>

                    <Link href="/"> Iniciar sesión </Link>
                    <Link href="/"> Crear cuenta </Link>

                </div>
            </div>
        </header>
    );
}

export default Header;