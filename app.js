import {
    auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, provider, getFirestore, db, setDoc, doc
} from '/firebase.js'

let signup = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpassword = document.getElementById('cpassword').value;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    let userData = { name, email, password };
    console.log(userData);

    if (emailRegex.test(email) && passwordRegex.test(password)) {
        // console.log(test);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Account created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.pathname = "index.html"
                // ____________________________________Set Doc
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        ...userData,
                        uId: user.uid,
                    });
                    console.log("Document written with ID: ", user.uid);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
               alert(error.message);
                alert(error.code);
            });
    } else {
        alert("Invalid email or Password");
    }
    if (password != cpassword) {
        alert("Passwords should be identical");
    }
}
let signup_btn = document.getElementById('signup_btn');
signup_btn.addEventListener('click', signup)

// //----------------------- login ------------------------------
let login = () => {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "login successfully",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.pathname = "index.html"
        })
        .catch((error) => {
            console.log(error.code);
        });
}

let login_btn = document.getElementById("login_btn");
login_btn.addEventListener("click", login);


//-------------------------- google Signup -------------------------
let googleSignup = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Account created successfully",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.pathname = "index.html"
            try {
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    number: user.phoneNumber
                });
                console.log("Document written with ID: ", user.uid);
                // console.log(user.email,user.password);
            }
            catch (e) {
                console.error("Error adding document: ", e);
            }
        }).catch((error) => {
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(email, credential, error.code);
        });
}

let googleBtn = document.getElementById('googleBtn');
googleBtn.addEventListener('click', googleSignup);