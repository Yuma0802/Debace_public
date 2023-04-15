import React, { useState } from "react";
import styled from 'styled-components';

const SlidersIcon = (props) => {
    const [showOptions, setShowOptions] = useState(false);
    const [slidersName, setSlidersName] = useState("全件表示");

    const handleOptionClick = (option) => {
        console.log(option.label);
        setShowOptions(false);
        setSlidersName(option.label);

        props.fun(option.value)
    };
    
    const options = [
        { label: "全件表示", value: 99 },
        { label: "議論中のみ", value: 1 },
        { label: "議論前", value: 0 },
        { label: "投票中", value: 2 },
        { label: "終了済み議論", value: 3 }
    ];

    return (
        <SSlidersIconWrap>
            <SSlidersIcon onClick={() => setShowOptions(!showOptions)}>
              <SSlidersNameWrap>
                <SSlidersName>{slidersName}</SSlidersName>
              </SSlidersNameWrap>
                {showOptions && (
                    <SOptionsList>
                        {options.map((option, index) => (
                            <SOption key={index} onClick={() => handleOptionClick(option)}>
                                <span>{option.label}</span>
                            </SOption>
                        ))}
                    </SOptionsList>
                )}
            </SSlidersIcon>
        </SSlidersIconWrap>
    )
};

const SSlidersIconWrap = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    position: relative;
    margin-top: 5px;
`;

const SSlidersIcon = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-bottom: 5px;
`;

const SSlidersNameWrap = styled.div`
padding-right: 90px;
@media (max-width: 480px) {
    padding-right: 5px;
}

`;

const SSlidersName = styled.div`
    line-height: 40px;
    background-color: white;
    border: 2px solid #FFA500;
    font-size: 20px;
    text-align: center;
    color: #FFA500;
    font-weight: bold;
    height: 44px;
    width: 150px;
    border-radius: 5px;
    
    @media (max-width: 480px) {
    height: 40px;
    padding-top: 5px;
    width: 130px;
    font-size: 18px;
    margin-right: 10px;
    line-height: 27px;
    border-radius: 5px;
    }
`;

const SOptionsList = styled.ul`
    position: absolute;
    width: 150px;
    /* text-align: center; */
    left: 0;
    top: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    padding: 0px;
    list-style: none;
    border-radius: 5px;
    @media (max-width: 480px) {
    
    width: 130px;
    font-size: 18px;
    margin-left: 10px;
  }

    
`;

const SOption = styled.li`
    cursor: pointer;
    padding: 7px 12px;
    font-size: 17px;
    /* font-weight: bold; */
    width: 100%;
    border-radius: 5px;
    &:hover {
        background-color: #FFA500;
        color: white;
    }
    span {
        display: inline;
        white-space: nowrap;
        text-align: right;
    }
`;

export default SlidersIcon;
