import axios from "axios";
import { auth } from "../Firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

function waitForFirebaseAuth() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); 
      resolve(user);
    });
  });
}

export async function secureFetch(url, options = {}) {
  let user = auth.currentUser;


  if (!user) {
    user = await waitForFirebaseAuth();
  }

  if (!user) {
    throw new Error("User not authenticated");
  }

  const idToken = await user.getIdToken(true);

   console.log("Firebase JWT Token:", idToken);

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${idToken}`,
    "Content-Type": "application/json",
  };

  return axios({
    url,
    method: options.method || "GET",
    data: options.body || null,
    headers,
  });
}
