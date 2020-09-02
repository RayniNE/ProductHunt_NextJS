import '../styles/globals.css'
import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAutentication from '../hooks/useAutenticacion';


function MyApp({ Component, pageProps }) {

  const usuario = useAutentication();
  console.log(usuario);

  return (

    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >

      <Component {...pageProps} />

    </FirebaseContext.Provider>

  )
}

export default MyApp
