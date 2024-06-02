import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import{ collection, onSnapshot, getFirestore, addDoc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDriFib5R2QlvsCYLS1GDzpErXFYTi-lfc",
    authDomain: "edu-help-forum-ad3f3.firebaseapp.com",
    projectId: "edu-help-forum-ad3f3",
    storageBucket: "edu-help-forum-ad3f3.appspot.com",
    messagingSenderId: "923212713707",
    appId: "1:923212713707:web:c8f773e0582037dd0038ae"
}

initializeApp(firebaseConfig)
const db = getFirestore();
const colRef = collection(db,"Doubt");
const q = query(colRef, orderBy('createdAt'));

// adding doubts
const buttn = document.querySelector('.addn');
const addDoubt = document.querySelector('.doubts-container');

addDoubt.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        Doubt: addDoubt.doubt.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        alert("Doubt Uploaded successfully!");
        addDoubt.reset()
    })
})

// real-time collection data
const doubtList = document.getElementById('doubts-list');

onSnapshot(q, (snapshot) => {
    doubtList.innerHTML = ''; // Clear the list before adding new data
    snapshot.docs.forEach((doc) => {
        let doubtData = doc.data();
        let doubtElement = document.createElement('div');
        doubtElement.className = 'doubt';
        doubtElement.innerHTML = `
            <div> <h3> Doubt: </h3> </div>
            <p>${doubtData.Doubt}</p>
            <form class="response-form" data-id="${doc.id}">
                <textarea name="response" placeholder="Type your response" rows="3" required></textarea>
                <button class="post_but" type="submit">Post Response</button>
            </form>
            <div> <h3> Responses: </h3> </div>
            <div class="responses" id="responses-${doc.id}"></div>
        `;
        doubtList.appendChild(doubtElement);

        // Fetch and display responses for the doubt
        const responsesRef = collection(db, `Doubt/${doc.id}/Responses`);
        const responsesQuery = query(responsesRef, orderBy('createdAt'));

        onSnapshot(responsesQuery, (responseSnapshot) => {
            const responsesDiv = document.getElementById(`responses-${doc.id}`);
            responsesDiv.innerHTML = ''; // Clear the responses before adding new data
            responseSnapshot.docs.forEach((responseDoc) => {
                let responseData = responseDoc.data();
                let responseElement = document.createElement('p');
                responseElement.textContent = responseData.Response;
                responsesDiv.appendChild(responseElement);
            });
        });
    });

    // Adding response to the database
    document.querySelectorAll('.response-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            const responseText = e.target.response.value;
            const responsesRef = collection(db, `Doubt/${id}/Responses`);
            
            addDoc(responsesRef, {
                Response: responseText,
                createdAt: serverTimestamp()
            }).then(() => {
                alert("Response Uploaded successfully!");
                e.target.reset();
            });
        });
    });
});
