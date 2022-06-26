interface Room {
  roomID: string;
  data: firebase.firestore.DocumentData;
}

interface User {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  uid: string | null;
}
