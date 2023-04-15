import React, { useState } from "react";
import styled from 'styled-components';

const TestField = () => {

  const [list, setList] = useState(
    [
      <p>リストの中身</p>,
      <p>リストの中身</p>,
      <p>リストの中身</p>
    ]
  )

  const onFun = () => {
    let preList = [...list]
    preList.push(<p>追加リスト</p>)
    setList(preList)
  }


  return (
    <>
    <h1>テストです。</h1>
    {
      list.map((e) => (
        e
      ))
    }
    <button onClick={onFun}>やる気スイッチ</button>
    </>
    
  )
};

export default TestField;