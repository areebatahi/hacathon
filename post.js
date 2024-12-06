import {
    auth, doc, db, collection, addDoc, onSnapshot, serverTimestamp, orderBy, query, where
} from "./firebase.js";


let addDocument = async () => {
    try {
        let title_input = document.getElementById("title");
        let desc_input = document.getElementById("description");

        // Adding document to Firestore
        const docRef = await addDoc(collection(db, "Post"), {
            title: title_input.value,
            desc: desc_input.value,
            time: serverTimestamp(),
        });

        console.log("Successfully added document with ID: ", docRef.id);

        // Clear input fields
        title_input.value = '';
        desc_input.value = '';
    } catch (error) {
        console.log("Error adding document: ", error);
    }
};
// Add event listener to button
let button = document.getElementById("button");
button.addEventListener("click", addDocument);

const post = () => {
    try {
        const q = query(collection(db, "Post"), orderBy("time", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let post_data = document.getElementById("post_data");
            post_data.innerHTML = '';  // Clear previous posts

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const timeString = data.time ? data.time.toDate().toLocaleString() : "No Timestamp";
                const currentUser = auth.currentUser;
                const userName = currentUser && currentUser.displayName;

                // Create post elements dynamically
                const postElement = document.createElement('div');
                postElement.classList.add('p-2', 'mb-2');
                postElement.setAttribute('data-id', doc.id);

                post.innerHTML += `<div class="card">
                <div class="card-header d-flex">
                   <div class="name-time d-flex flex-column">
                      ${auth.displayName}
                        <div class="time">${doc.data().time}</div>
                    </div>
                    <div class="d-flex editBtnImg ms-auto">
                        <button type="button" onclick="editpost(this)" class="btn btn-success editBtn m-1">Edit</button>
                        <button type="button" onclick="deletePost(this)"
                            class="btn btn-danger deleteBtn m-1">delete</button>
                    </div>
       
                </div>
                <div class="card-body">
                <blockquote class="blockquote mb-0">
                        <p>${doc.data().title}</p>
                        <footer class="blockquote-footer">${doc.data().description}</footer>
                    </blockquote>
               </div>
            </div>`;

                post_data.appendChild(postElement);
            });

            attachEventListeners();

        });

        return unsubscribe;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

post();

const attachEventListeners = () => {
    const post_data = document.getElementById("post_data");

    post_data.addEventListener("click", async (e) => {
        if (e.target && e.target.classList.contains("deleteBtn")) {
            const postId = e.target.closest('.p-2').getAttribute('data-id');  // Ensure it gets the correct .p-2 (post card)
            if (postId) {
                try {
                    await deleteDoc(doc(db, "Post", postId)); // Delete from Firestore
                    alert("Post deleted successfully");
                } catch (error) {
                    console.error("Error deleting document:", error);
                    alert("Error deleting the post");
                }
            } else {
                alert("Post ID not found!");
            }
        }
    });

    post_data.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("editBtn")) {
            const postId = e.target.closest('.p-2').getAttribute('data-id'); // Ensure it gets the correct .p-2 (post card)
            const cardElement = e.target.closest('.p-2'); // Get the closest .p-2 for proper reference
            const currentTitle = cardElement.querySelector('.title').innerText;
            const currentDesc = cardElement.querySelector('.description').innerText;

            document.getElementById("title").value = currentTitle;
            document.getElementById("description").value = currentDesc;

            let updateButton = document.getElementById("update_post");
            if (updateButton) {
                updateButton.onclick = () => UpdatePost(postId, cardElement);
            }
        }
    });
};
