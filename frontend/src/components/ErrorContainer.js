import React from 'react';

import styled from '@emotion/styled/macro';

function ErrorContainer({ children }) {
    const Container = styled.div `
        padding: 10px;
        background-color: #ff7c7c;
        color: #fff;
    `;
    return <Container>{children}</Container>
}

export default ErrorContainer;