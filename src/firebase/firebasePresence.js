import { useEffect } from 'react';

import { firebase } from './firebaseApp';
const firestoreDB = firebase.firestore();

function rtdb_and_local_fs_presence() {
  var uid = firebase.auth().currentUser.uid;

  var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

  var isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
    last_changed2: firebase.database.ServerValue.TIMESTAMP,
  };

  var isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
    last_changed2: firebase.database.ServerValue.TIMESTAMP,
  };

  var userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid);

  var isOfflineForFirestore = {
    state: 'offline',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    last_changed2: firebase.firestore.FieldValue.serverTimestamp(),
  };

  var isOnlineForFirestore = {
    state: 'online',
    last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    last_changed2: firebase.firestore.FieldValue.serverTimestamp(),
  };

  firebase
    .database()
    .ref('.info/connected')
    .on('value', function (snapshot) {
      if (snapshot.val() == false) {
        // Instead of simply returning, we'll also set Firestore's state
        // to 'offline'. This ensures that our Firestore cache is aware
        // of the switch to 'offline.'
        userStatusFirestoreRef.set(isOfflineForFirestore);
        return;
      }

      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(function () {
          userStatusDatabaseRef.set(isOnlineForDatabase);
          // We'll also add Firestore set here for when we come online.
          userStatusFirestoreRef.set(isOnlineForFirestore);
        });
    });
}

async function checkIfIAmOnline(callback) {
  var uid = firebase.auth().currentUser?.uid;

  if (uid) {
    var userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid);
    userStatusFirestoreRef.onSnapshot(function (doc) {
      var isOnline = doc.data().state == 'online';
      callback(isOnline);
    });
  } else {
    return callback('false');
  }
}
function checkIfUserOnline(uid, callback) {
  const userOnlineFirestoreRef = firebase.firestore().doc('/status/' + uid);
  userOnlineFirestoreRef.onSnapshot(function (doc) {
    var isOnline = doc.data()?.state == 'online';
    callback(isOnline);
  });
}
const authStateChanged = async (authState) => {
  if (authState) {
    rtdb_and_local_fs_presence();
  }
};

const initFirebasePresence = () => {
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);

    return () => unsubscribe();
  }, []);
};

export { initFirebasePresence, checkIfIAmOnline, checkIfUserOnline };
