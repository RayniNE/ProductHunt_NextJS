import React, { useState, useContext } from "react";
import { css } from "@emotion/core";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/UI/Formulario";

import { FirebaseContext } from "../firebase";

import Error404 from "../components/layout/404";

//Validaciones.
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  imagen: "",
  url: "",
  urlimagen: "",
  descripcion: "",
};

const NuevoProducto = () => {
  //State de las imagenes.
  const [nombreimagen, setNombreImagen] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlimagen, setUrlImagen] = useState("");

  const [error, setError] = useState(false);

  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, nuevoProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  //Hook de routing para redireccionar.
  const router = useRouter();

  //Context con las operaciones CRUD de firebase.
  const { usuario, firebase } = useContext(FirebaseContext);

  async function nuevoProducto() {
    //Si el usuario no esta autenticado.
    if (!usuario) {
      return router.push("/login");
    }

    //Crear el objeto de nuevo producto.

    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      haVotado: [],
    };

    //Insertarlo en la base de datos.
    firebase.db.collection("productos").add(producto);

    return router.push("/");
  }

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };

  const handleProgress = (progreso) => setProgreso({ progreso });

  const handleUploadError = (error) => {
    setSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = (nombre) => {
    setProgreso(100);
    setSubiendo(false);
    setNombreImagen(nombre);
    firebase
      .storage()
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setUrlImagen(url);
      });
  };

  return (
    <div>
      <Layout>
        {!usuario ? (
          <Error404 msg="No se puede mostrar" />
        ) : (
          <>
            <h1
              css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
            >
              {" "}
              Agregar nuevo producto{" "}
            </h1>

            <Formulario onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend> Información general </legend>

                {errores.nombre && <Error> {errores.nombre} </Error>}

                <Campo>
                  <label htmlFor="nombre"> Nombre </label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Nombre del producto"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                {errores.empresa && <Error> {errores.empresa} </Error>}

                <Campo>
                  <label htmlFor="empresa"> Empresa </label>
                  <input
                    type="text"
                    id="empresa"
                    placeholder="Nombre de la empresa o compañia"
                    name="empresa"
                    value={empresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                <Campo>
                  <label htmlFor="imagen"> Imagen </label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFileName
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Campo>

                {errores.url && <Error> {errores.url} </Error>}

                <Campo>
                  <label htmlFor="url"> Url </label>
                  <input
                    type="url"
                    placeholder="URL de tu producto"
                    id="url"
                    name="url"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
              </fieldset>

              <fieldset>
                <legend> Sobre tu producto </legend>

                {errores.descripcion && <Error> {errores.descripcion} </Error>}

                <Campo>
                  <label htmlFor="descripcion"> Descripción </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
              </fieldset>

              {error && <Error> {error} </Error>}

              <InputSubmit type="submit" value="Crear producto" />
            </Formulario>
          </>
        )}
      </Layout>
    </div>
  );
};
export default NuevoProducto;
NuevoProducto;
