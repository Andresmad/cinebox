import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyClIAGq3rlZRjnhC5R_0Kuj6K-DX1eTflg",
    authDomain: "projeto-f64be.firebaseapp.com",
    projectId: "projeto-f64be",
    storageBucket: "projeto-f64be.appspot.com",
    messagingSenderId: "462802744687",
    appId: "1:462802744687:web:bcab4125664fa2635a249a"
};

import { 
    getFirestore, 
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    updateDoc,
    deleteField,
    query,
    where,
    limit,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

window.database = {
    get: async function (key) {
        //Guarda no localstorage o id do user autenticado
        const userAuthenticatedId = localStorage.getItem('userAuthenticatedId');
        //Cria um filtro na base de dados com o id de cada user 
        const q = query(collection(db, key), where("userAuthenticatedId", "==", userAuthenticatedId));
        const querySnapshot = await getDocs(q);
        const data = [];

        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                movie: doc.data()
            });
        });

        return data;
    },
    
    add: async function (key, data) {
        //Guarda na base de dados o ID do user autenticado na data do documento
        data.userAuthenticatedId = localStorage.getItem('userAuthenticatedId');
        //Adiciona um documento na base de dados
        await addDoc(collection(db, key), data);
    },
    delete: async function (key, id) {
        //Remove um documento na base de dados
        await deleteDoc(doc(db, key, id));
    }
};





  
