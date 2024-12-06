import {
    auth, doc, db, collection, addDoc, onSnapshot, serverTimestamp, orderBy, query, where
} from "./firebase.js";

let post = async () => {

    var title = document.getElementById("title");
    var description = document.getElementById("description");
    // let radioBtn = [document.getElementById('IT'),document.getElementById('blog'),document.getElementById('marketing')]
    try {
        const docRef = await addDoc(collection(db, "post"), {
            title: title.value,
            description: description.value,
            time: serverTimestamp(),
            // category: radioBtn.checked 
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (err) {
        console.log(err);
    }
}
let postBtn = document.getElementById("post");
postBtn.addEventListener('click', postBtn)



let getTodos = () => {
    //   const q =query(collection(db, "Todos"),orderBy("time","desc"));
    const q = query(collection(db, "post"), orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        var title = document.getElementById("title");
        var description = document.getElementById("description");
        title.value = "";
        description.value = "";
        querySnapshot.forEach((doc) => {
            //   cities.push(doc.data());
            console.log(doc.data().time);

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
            document.getElementById("todo-input").value = ""
        });
    });
};
getTodos()
// function post() {
// var title = document.getElementById("title");
// var description = document.getElementById("description");

// var currentTime = new Date().toLocaleTimeString();
// if (title.value.trim() && description.value.trim()) {
//     var post = document.getElementById("post");
//     post.innerHTML += `<div class="card">
//     <div class="card-header d-flex">
//         <div class="name-time d-flex flex-column">
//            ${auth.displayName}
//             <div class="time">${currentTime}</div>
//         </div>
//         <div class="d-flex editBtnImg ms-auto">
//             <button type="button" onclick="editpost(this)" class="btn btn-success editBtn m-1">Edit</button>
//             <button type="button" onclick="deletePost(this)"
//                 class="btn btn-danger deleteBtn m-1">delete</button>
//         </div>

//     </div>
//     <div class="card-body">
//         <blockquote class="blockquote mb-0">
//             <p>${title.value}</p>
//             <footer class="blockquote-footer">${description.value}</footer>
//         </blockquote>
//     </div>
// </div>`;
//     title.value = "";
//     description.value = "";
// } else {
//     Swal.fire({
//         title: "Empty Post",
//         text: "Can't publish post without Title or Description",
//         icon: "question",
//     });
// }

// }

function deletePost(button) {
    button.parentNode.parentNode.parentNode.remove();
}
function editpost(button) {
    var card = button.parentNode.parentNode.parentNode;
    var title = card.childNodes[3].childNodes[1].childNodes[1].innerHTML;
    var description = card.childNodes[3].childNodes[1].childNodes[3].innerHTML;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    card.remove();
}