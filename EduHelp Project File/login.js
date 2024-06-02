import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"

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

//logging in
const login_button = document.querySelector(".login");
const LoginForm = document.querySelector(".EduHelp2");
login_button.addEventListener('click', (e) => {
    e.preventDefault()
    const email = LoginForm.email1.value
    const password = LoginForm.password1.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user logged in!', cred.user)
            alert("User Logged In Successfully!");
            window.location.href = '/home_page1.html';
            LoginForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
            alert("User Login Credentials are Incorrect!");
        })
})
