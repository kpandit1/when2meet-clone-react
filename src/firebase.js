import app from "firebase/app";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA62nydNJf-dz12wm-BuQlPPpM2X3qQ1MI",
  authDomain: "when2meet-clone.firebaseapp.com",
  databaseURL: "https://when2meet-clone.firebaseio.com",
  projectId: "when2meet-clone",
  storageBucket: "when2meet-clone.appspot.com",
  messagingSenderId: "383434540084",
  appId: "1:383434540084:web:c8ebbb31819ba5e843f661",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
}

export default Firebase;