interface Message {
  from: ?string;
  to: ?string;
  message: string;
  timestamp: string;
  uid: ?string;
  email: ?string;
}
interface Room {
  roomID: string;
  roomName: string;
  messageHistory: Message[];
}

interface User {
  email: ?string;
  displayName: ?string;
  photoURL: ?string;
  uid: ?string;
  messageHistory: ?Message[];
}

interface NewUser {
  email: ?string;
  displayName: ?string;
  photoURL: ?string;
  uid: ?string;
}
