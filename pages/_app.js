import '../styles/globals.css'
import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAutentication from '../hooks/useAutenticacion';


function MyApp({ Component, pageProps }) {

  const usuario = useAutentication();

  return (

    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}
    >

      <Component {...pageProps} />

    </FirebaseContext.Provider>

  )
}

export default MyApp
