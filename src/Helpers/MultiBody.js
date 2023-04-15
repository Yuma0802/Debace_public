import React from "react";
import styled from 'styled-components';

const MultiBody = (props) => {
  const texts = props.children.split('NL!NL').map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    );
  });
  return <div>{texts}</div>;
};

export default MultiBody;