import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

import Layout from '../../components/layout/Layout';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/UI/Formulario';
import Boton from '../../components/UI/Boton';

const ContenedorProducto = styled.div`

    @media(min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }

`;

const Producto = () => {

    //State del componente.
    const [ producto, setProducto ] = useState({});
    const [ error, setError ] = useState(false);

    //Routing para obtener el id actual.
    const router = useRouter();
    const { query: { id } } = router;

    //Context de firebase.
    const {firebase, usuario} = useContext(FirebaseContext);

    useEffect(() => {

        if(id){
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(producto.exists){
                    setProducto(producto.data());
                } else{
                    setError(true);
                }
                
            }
            obtenerProducto();
        }

    },[id, producto])

    if(Object.keys(producto).length === 0) return 'Cargando..'

    const {comentarios, creado, descripcion, empresa, nombre, url, creador, urlimagen, votos, haVotado } = producto;

    //Administrar y validar los votos.
    const votarProducto = () => {
        if(!usuario){
            return router.push('/login');
        }

        //Obtener y sumar un nuevo voto.
        const nuevoTotal = votos + 1;

        //Verificar si el usuario actual ha votado.
        if(haVotado.includes(usuario.uid)) return;

        //Guardar el id del usuario que ha votado.
        const nuevoHaVotado = [...haVotado, usuario.uid];
        
        //Actualizar en la base de datos.
        firebase.db.collection('productos').doc(id).update({votos: nuevoTotal, haVotado: nuevoHaVotado});

        //Actualizar el State.
        setProducto({
            ...producto,
            votos: nuevoTotal
        });
    }


    return ( 
        
        <Layout>

            <>
                { error && <Error404/>}

                <div className="contenedor">

                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    > {nombre} </h1>

                    <ContenedorProducto>
                        <div>
                            <p> Publicado hace: { formatDistanceToNow(new Date(creado), {locale: es})} </p>
                            <p> Creador por: {creador.nombre} de {empresa}</p>

                            <img src={urlimagen}/>

                            <p> {descripcion} </p>

                            { usuario && (
                                <>

                                    <h2> Agrega tu comentario </h2>

                                    <form>
                                        <Campo>
                                            <input
                                                type="text"
                                                name="mensaje"
                                            />
                                        </Campo>
        
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar comentario"
                                        />
                                    </form>
                                </>
                            )}

                            <h2
                                css={css`
                                    margin: 2rem 0;
                                `}
                            > Comentarios </h2>

                            {comentarios.map((comentario) => (
                                <li>
                                    <p> {comentario.nombre} </p>
                                    <p>Escrito por: {comentario.usuarioNombre} </p>
                                </li>
                            ))}
                        </div>

                        <aside>
                            <Boton
                                target="_blank"
                                bgColor="true"
                                href={url}
                            > Visitar URL </Boton>

                                

                            <div
                                css={css`
                                    margin-top: 5rem;
                                `}
                            >
                                <p
                                css={css`
                                    text-align: center;
                                `}> {votos} votos</p>

                                <Boton
                                    onClick={votarProducto}
                                > Votar </Boton>
                            </div>
                        </aside>
                    </ContenedorProducto>

                </div>
            </>
            
        </Layout>

     );
}
 
export default Producto;