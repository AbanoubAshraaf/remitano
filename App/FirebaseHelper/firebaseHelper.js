import firebase from 'firebase';

export const readData = (setData, setError, ref) => {
  firebase
    .database()
    .ref(`${ref}/`)
    .once('value', function(snapshot) {
      if (snapshot.val()) {
        setData(snapshot.val());
      } else {
        setError(`no existing ${ref}`);
      }
    })
    .catch(error => {
      //error callback
      setError(error);
    });
};
