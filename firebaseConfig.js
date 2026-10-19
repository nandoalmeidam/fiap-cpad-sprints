import { initializeApp, getApps, getApp } from 'firebase/app';

import {
  getFirestore,
  connectFirestoreEmulator,
} from 'firebase/firestore';

import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  connectAuthEmulator,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

// Configuração local para testes no Android Emulator.
const USAR_EMULADORES = false;
const EMULADOR_HOST = '10.0.2.2';



const firebaseConfig = {
  apiKey: "AIzaSyCMhM0Wrd4YwHmJYvXcR_cuN5Z0S3AdO9Q",
  authDomain: "ecotrack-aefdb.firebaseapp.com",
  projectId: "ecotrack-aefdb",
  storageBucket: "ecotrack-aefdb.firebasestorage.app",
  messagingSenderId: "757010332216",
  appId: "1:757010332216:web:c438253c65eaccb2f444cd",
};

// Inicializa o Firebase uma única vez.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);


 // Banco de dados Firestore.
export const db = getFirestore(app);

// Conecta ao Firestore Emulator durante os testes locais.
if (USAR_EMULADORES) {
  connectFirestoreEmulator(db, EMULADOR_HOST, 8080);
}


// Autenticação com persistência no AsyncStorage.
let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw error;
  }
}


if (USAR_EMULADORES) {
  connectAuthEmulator(auth, `http://${EMULADOR_HOST}:9099`, {
    disableWarnings: true,
  });
}

export { app, auth };


export const storage = getStorage(app);
