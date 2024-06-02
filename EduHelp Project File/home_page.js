import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getAuth,signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyDriFib5R2QlvsCYLS1GDzpErXFYTi-lfc",
    authDomain: "edu-help-forum-ad3f3.firebaseapp.com",
    projectId: "edu-help-forum-ad3f3",
    storageBucket: "edu-help-forum-ad3f3.appspot.com",
    messagingSenderId: "923212713707",
    appId: "1:923212713707:web:c8f773e0582037dd0038ae"
}

initializeApp(firebaseConfig)
const auth = getAuth()

//logging out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', (e) => {
    signOut(auth)
        .then(() => {
            console.log('the user signed out')
            alert("User Logged Out Successfully!");
            window.location.href = '/index.html';
        })
        .catch((err) => {
            console.log(err.message)
        })
})