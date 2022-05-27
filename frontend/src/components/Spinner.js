/*
 * Spinner derived from https://tobiasahlin.com/spinkit/.
 */

import React from 'react';

import styled from '@emotion/styled/macro';

function Spinner({ size, color }) {
    size = size || 12;
    color = color || '#090';
    const Spinner = styled.div`
        display: inline-block;
        text-align: center;
        @keyframes bounce-delay {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1.0);
            }
        }
    `;
    const Dot = styled.div`
        display: inline-block;
        border-radius: 100%;
        width: 12px;
        height: 12px;
        margin: 6px; /* (width / 2) or (height / 2) */
        background-color: #333;
        animation: bounce-delay infinite 1.4s ease-in-out both;
        &:nth-of-type(1) {
            animation-delay: -0.32s;
        }
        &:nth-of-type(2) {
            animation-delay: -0.16s;
        }
    `;

    return (
        <Spinner>
            <Dot />
            <Dot />
            <Dot />
        </Spinner>
    );
}

export default Spinner;
