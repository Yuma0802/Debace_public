import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DebateLink = (props) => {

    const navigate = useNavigate()

    const onFun = () => {
        navigate(`/debate?did=${props.did}&page=1`)
    }

    return(
        <SDebateLinkBox onClick={onFun}>
            { props.text }
        </SDebateLinkBox>
    );
}
export default DebateLink;

const SDebateLinkBox = styled.a`
    display: block;
    font-family: 'Volkhov';
    font-style: italic;
    font-weight: 700;
    font-size: 16px;
    color: #2CC0FF !important;
    text-decoration: underline #20ABFA !important;
    cursor: pointer;
`;