import axios from "axios";
import { auth } from "../Firebase/firebase.config";


export async function secureFetch(url, options = {}) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Get Firebase ID token (JWT)
  const idToken = await user.getIdToken(/* forceRefresh= */ true);

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
