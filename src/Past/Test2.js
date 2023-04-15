import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Test2 = () => {
  
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState(null);
  const [userAge, setUserAge] = useState(null);
  const [userId, setUserId] = useState(null);
  const [changeAge, setChangeAge] = useState(null);
  const [deleteId, setDeleteId ] = useState(null);

  const db = initializeApp;
  
  //data取得
  const onGet = async () => {
    const snapshot = await db.collection('user').get();
    const _users = [];
    snapshot.forEach(doc => {
      _users.push({
        userID: doc.id,
        ...doc.data()
      });
    });

    setUsers(_users);

  };
 const userLIstItems = users.map(user => {
    return (
      <li>{user.name}:{user.age}</li>
    );
  });

  //data追加

  const onPush = async () => {
    if(!userName || !userAge){
      alert('入力せよ');
      return;
    }
    const addData = await db.collection('user').add({
      name:userName,
      age:userAge
    });
    setUserName('');
    setUserAge('');
  };
  const onUpdate = async () => {
    if(!userId || !changeAge){
      alert('入力せよ');
      return;
    }
    const addData = await db.collection('user').doc(userId).update({
      age:changeAge
    });
    console.log(changeAge ,'-', userId);
    setUserId('');
    setChangeAge('');
  };
  const onDelete = async () => {
    if(!deleteId){
      alert('入力せよ');
      return;
    }
    const deleteData = await db.collection('user').doc(deleteId).delete();
    console.log(deleteId);
    setDeleteId(null);
  };

  return(
    <>
    <h1>Test2</h1>
    <button onClick={onGet}>取得</button>
    <ul>{userLIstItems}</ul>
    {/* 追加 */}
    <p><input 
        type="text"
        placeholder="name"
        onChange={(event) => {setUserName(event.target.value)}}
        />
      <input 
        type="int"
        placeholder="age"
        onChange={(event) => {setUserAge(event.target.value)}}
        />
      <button onClick={onPush}>追加</button>
    </p>
    {/* 更新 */}
    <p><input 
        type="text"
        placeholder="ID"
        onChange={(event) => {setUserId(event.target.value)}}
        />
      <input 
        type="int"
        placeholder="changeAge"
        onChange={(event) => {setChangeAge(event.target.value)}}
        />
      <button onClick={onUpdate}>更新</button>
    </p>
    {/* 削除 */}
    <p><input 
        type="text"
        placeholder="deleteID"
        onChange={(event) => {setDeleteId(event.target.value)}}
        />
      <button onClick={onDelete}>削除</button>
    </p>
    </>
  );
};

export default Test2;