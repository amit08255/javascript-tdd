import styled from 'styled-components';

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;

    input{
        padding: 10px;
    }

    input + input{
        margin-top: 12px;
    }

    button{
        margin-top: 12px;
    }
`;

export default LoginWrapper;
