import styled from 'styled-components';

export const setNL = (txt) => {
  return txt.replace(/\n/g, 'NL!NL');
};

export const lnToBr = (txt) => {
  return (
    txt.split(/NL!NL/g).map(t => (t === 'NL!NL')?<br/>:<p>{t}</p>)
  )
};

export const exNl = (txt) => {
  if(txt == null){
    return txt
  }
  return (
    txt.replace(/NL!NL/g,"")
  )
};
export const Nlgl = (txt) => {
  return (
    txt.replace(/NL!NL/g,"<br>")
  )
};

// const W = styled.div`
//   height: 20px;
// `;
// const P = styled.p`
//   margin: 6px;
// `
