import React, { useState } from "react";
import styled from 'styled-components';

const SavedPostBoxMenuIcon = (props) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleOptionClick = (option) => {
        // ここで、選択されたオプションに対する処理を実装する
        console.log(option);
    };

    const options = [
        { label: "[保存した投稿]から削除", value: "all" },
        { label: "共有", value: "ongoing" },
    ];

    return (
        <SSlidersIconWrap>
            <SSlidersIcon onClick={() => setShowOptions(!showOptions)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
                {showOptions && (
                    <SOptionsListWrap>
                        <SOptionsList>
                            {options.map((option, index) => (
                                <SOption key={index} onClick={() => handleOptionClick(option)}>
                                    <span>{option.label}</span>
                                </SOption>
                            ))}
                        </SOptionsList>
                    </SOptionsListWrap>
                )}
            </SSlidersIcon>
        </SSlidersIconWrap>
    )
};

const SSlidersIconWrap = styled.div`
     display: flex;
     align-items: center;
`;

const SSlidersIcon = styled.div`
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: #FFA500;
`;

const SOptionsListWrap = styled.div`
    position: relative;
    @media (max-width: 480px) {
    right: 135px;
    top: 20px;
  }
`;

const SOptionsList = styled.ul`
    position: absolute;
    display: flex;
    left: 0;
    z-index: 1;
    flex-direction: row; // ← 追加
    align-items: center; // ← 追加
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 0px;
    border-radius: 5px;
    list-style: none;
    color: black;
    @media (max-width: 480px) {
    display: block;
    text-align: left;
  }
`;


const SOption = styled.li`
    display: inline-block; // ← 追加
    cursor: pointer;
    padding: 5px 10px; // 余白を調整
    font-size: 13px;
    white-space: nowrap; // 一行に収めるために必要
    border-radius: 5px;
    &:hover {
        background-color: #FFA500;
        color: #f5f5f5;
    }
`;

export default SavedPostBoxMenuIcon;

