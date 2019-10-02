import { store } from '../firebase/FirebaseConfig';
import { action } from './action';
import { arrayUnion } from 'firebase';
import firebase from '../firebase/FirebaseConfig';

export const MESSAGE_CREATED_SUCESSFULLY = 'MESSAGE_CREATED_SUCESSFULLY';

/**
 * Send a message to another user.
 * @function
 * @param {Message} message
 */
export const sendMessage = message => {
  attachMessageToUsersMessages(message.to, message.from, message);
  attachMessageToUsersMessages(message.from, message.to, message);
};

const attachMessageToUsersMessages = (to, from, message) => {
   
  store
    .collection('users')
    .doc(to)
    .collection('messages')
    .doc(from)
    .get()
    .then(res => {
      // message thread does not exist.
      if (!res.exists) {
        createNewMessageThread(to, from, message);
      } else {
        res.ref
          .update({
            messages: firebase.firestore.FieldValue.arrayUnion(message),
          })
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

const createNewMessageThread = (to, from, message) => {
   
  store
    .collection('users')
    .doc(from)
    .get()
    .then(res => {
      const user = res.data();

      // create messageThread in users messages
      store
        .collection('users')
        .doc(to)
        .collection('messages')
        .doc(from)
        .set({
          firstName: user.firstName,
          lastName: user.lastName,
          messages: [message],
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

export const USER_HAS_NO_MESSAGES = 'USER_HAS_NO_MESSAGES';
export const COLLECTED_USER_MESSAGES = 'COLLECTED_USER_MESSAGES';
export const COLLECTING_USER_MESSAGES_INIT = 'COLLECTING_USER_MESSAGES_INIT';

/**
 * Subscribe to the users messages.
 * @function
 * @param uid
 * @param dispatch
 */
export const subscribeToMessages = (uid, dispatch) => {
   
  dispatch(action(COLLECTING_USER_MESSAGES_INIT));
  store
    .collection('users')
    .doc(uid)
    .collection('messages')
    .onSnapshot(snapshot => {
      if (snapshot.empty) {
        dispatch(action(USER_HAS_NO_MESSAGES));
        return;
      }
      const messageThreads = [];
      snapshot.forEach(doc => {
        const messageThread = doc.data();
        messageThread.id = doc.id;
        messageThreads.push(messageThread);
      });
      dispatch(action(COLLECTED_USER_MESSAGES, messageThreads));
    });
};
