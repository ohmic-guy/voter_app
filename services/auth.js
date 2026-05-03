let currentUser = null;
const listeners = new Set();

export function onAuthStateChanged(callback) {
  callback(currentUser);
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export async function signInWithEmailAndPassword(_auth, email, password) {
  if (!email || !password) throw new Error('Email and password are required.');
  currentUser = { uid: Date.now().toString(), email };
  listeners.forEach((cb) => cb(currentUser));
  return { user: currentUser };
}

export async function createUserWithEmailAndPassword(_auth, email, password) {
  return signInWithEmailAndPassword(_auth, email, password);
}

export async function signOut() {
  currentUser = null;
  listeners.forEach((cb) => cb(currentUser));
}

export const auth = {};
