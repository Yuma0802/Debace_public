import styled, { keyframes } from 'styled-components';

const NewLoader = () => {
  return(
    <>
      <SLoadingspinner>
        <Ssquare1></Ssquare1>
        <Ssquare2></Ssquare2>
        <Ssquare3></Ssquare3>
        <Ssquare4></Ssquare4>
        <Ssquare5></Ssquare5>
      </SLoadingspinner>
    </>
  )
}

const square1 = keyframes`
  0% {
    left: calc( 0 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  8.333% {
    left: calc( 0 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  100% {
    left: calc( 0 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }
`

const square2 = keyframes`
 0% {
    left: calc( 0 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  8.333% {
    left: calc( 0 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  16.67% {
    left: calc( 1 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  25.00% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  83.33% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  91.67% {
    left: calc( 1 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  100% {
    left: calc( 0 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }
`

const square3 = keyframes`
  0%,100% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  16.67% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  25.00% {
    left: calc( 1 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  33.33% {
    left: calc( 2 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  41.67% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  66.67% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  75.00% {
    left: calc( 2 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  83.33% {
    left: calc( 1 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  91.67% {
    left: calc( 1 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }
`

const square4 = keyframes`
  0% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  33.33% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  41.67% {
    left: calc( 2 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  50.00% {
    left: calc( 3 * var(--offset) );
    top: calc( 2 * var(--offset) );
  }

  58.33% {
    left: calc( 3 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  100% {
    left: calc( 3 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }
`

const square5 = keyframes`
  0% {
    left: calc( 3 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  50.00% {
    left: calc( 3 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  58.33% {
    left: calc( 3 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  66.67% {
    left: calc( 2 * var(--offset) );
    top: calc( 0 * var(--offset) );
  }

  75.00% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }

  100% {
    left: calc( 2 * var(--offset) );
    top: calc( 1 * var(--offset) );
  }
`

const aquarefadein = keyframes`
  0% {
    transform: scale(0.75);
    opacity: 0.0;
  }

  100% {
    transform: scale(1.0);
    opacity: 1.0;
  }
`

const SLoadingspinner = styled.div`
  --square: 26px;
  --offset: 30px;
  --duration: 2.4s;
  --delay: 0.2s;
  --timing-function: ease-in-out;
  --in-duration: 0.4s;
  --in-delay: 0.1s;
  --in-timing-function: ease-out;
  width: calc( 3 * var(--offset) + var(--square));
  height: calc( 2 * var(--offset) + var(--square));
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  position: relative;
`

const Ssquare1 = styled.div`
  --square: 26px;
  --offset: 30px;
  --duration: 2.4s;
  --delay: 0.2s;
  --timing-function: ease-in-out;
  --in-duration: 0.4s;
  --in-delay: 0.1s;
  --in-timing-function: ease-out;
  width: calc( 3 * var(--offset) + var(--square));
  height: calc( 2 * var(--offset) + var(--square));
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  position: relative;

  display: inline-block;
  background: darkorange;
    /*background: var(--text-color);*/
    /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);*/
  border: none;
  border-radius: 2px;
  width: var(--square);
  height: var(--square);
  position: absolute;
  padding: 0px;
  margin: 0px;
  font-size: 6pt;
  color: black;

  left: calc( 0 * var(--offset) );
  top: calc( 0 * var(--offset) );
  animation: ${square1} var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
`
const Ssquare2 = styled.div`
  --square: 26px;
  --offset: 30px;
  --duration: 2.4s;
  --delay: 0.2s;
  --timing-function: ease-in-out;
  --in-duration: 0.4s;
  --in-delay: 0.1s;
  --in-timing-function: ease-out;
  width: calc( 3 * var(--offset) + var(--square));
  height: calc( 2 * var(--offset) + var(--square));
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  position: relative;

  display: inline-block;
  background: darkorange;
    /*background: var(--text-color);*/
    /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);*/
  border: none;
  border-radius: 2px;
  width: var(--square);
  height: var(--square);
  position: absolute;
  padding: 0px;
  margin: 0px;
  font-size: 6pt;
  color: black;

  left: calc( 0 * var(--offset) );
  top: calc( 1 * var(--offset) );
  animation: ${square2} var(--duration) var(--delay) var(--timing-function) infinite,
              squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
`
const Ssquare3 = styled.div`
  --square: 26px;
  --offset: 30px;
  --duration: 2.4s;
  --delay: 0.2s;
  --timing-function: ease-in-out;
  --in-duration: 0.4s;
  --in-delay: 0.1s;
  --in-timing-function: ease-out;
  width: calc( 3 * var(--offset) + var(--square));
  height: calc( 2 * var(--offset) + var(--square));
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  position: relative;

  display: inline-block;
  background: darkorange;
    /*background: var(--text-color);*/
    /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);*/
  border: none;
  border-radius: 2px;
  width: var(--square);
  height: var(--square);
  position: absolute;
  padding: 0px;
  margin: 0px;
  font-size: 6pt;
  color: black;

  left: calc( 1 * var(--offset) );
  top: calc( 1 * var(--offset) );
  animation: ${square3} var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(2 * var(--in-delay)) var(--in-timing-function) both;

`
const Ssquare4 = styled.div`
  --square: 26px;
  --offset: 30px;
  --duration: 2.4s;
  --delay: 0.2s;
  --timing-function: ease-in-out;
  --in-duration: 0.4s;
  --in-delay: 0.1s;
  --in-timing-function: ease-out;
  width: calc( 3 * var(--offset) + var(--square));
  height: calc( 2 * var(--offset) + var(--square));
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  position: relative;

  display: inline-block;
  background: darkorange;
    /*background: var(--text-color);*/
    /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);*/
  border: none;
  border-radius: 2px;
  width: var(--square);
  height: var(--square);
  position: absolute;
  padding: 0px;
  margin: 0px;
  font-size: 6pt;
  color: black;

  left: calc( 2 * var(--offset) );
  top: calc( 1 * var(--offset) );
  animation: ${square4} var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(3 * var(--in-delay)) var(--in-timing-function) both;

`
const Ssquare5 = styled.div`
  --square: 26px;
  --offset: 30px;
  --duration: 2.4s;
  --delay: 0.2s;
  --timing-function: ease-in-out;
  --in-duration: 0.4s;
  --in-delay: 0.1s;
  --in-timing-function: ease-out;
  width: calc( 3 * var(--offset) + var(--square));
  height: calc( 2 * var(--offset) + var(--square));
  padding: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  position: relative;

  display: inline-block;
  background: darkorange;
    /*background: var(--text-color);*/
    /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);*/
  border: none;
  border-radius: 2px;
  width: var(--square);
  height: var(--square);
  position: absolute;
  padding: 0px;
  margin: 0px;
  font-size: 6pt;
  color: black;

  left: calc( 3 * var(--offset) );
  top: calc( 1 * var(--offset) );
  animation: ${square5} var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(4 * var(--in-delay)) var(--in-timing-function) both;
`



export default NewLoader;