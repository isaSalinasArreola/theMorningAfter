import styled from 'styled-components';
import { v } from './variables';

export const STable = styled.table`
    width : 95%;
    border-collapse: collapse;
    text-align: center;
    border-radius: ${v.borderRadius};
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const STHead = styled.thead`
    position: sticky;
    z-index: 100;
`;

export const STHeadTR = styled.tr`
    background: ${v.bg};
    background-color: #253494;
`;

export const STH = styled.th`
    font-weight: normal;
    padding: 10px;
    color: white;
    text-transform: capitalize;
    font-weight: 700;
    font-size: 16px;

    :not(:last-of-type){
        border-right: 1px solid white;
    }
    :first-of-type{
        width: 1%;
        white-space: nowrap;
    }
`;

export const STBody = styled.tbody`
    padding: 20px;
`;

export const STBodyTR = styled.tr`
    background: ${v.white};

`;

export const STD = styled.td`
    padding: ${v.smSpacing};
    border: 1px solid ${v.bg2};
    font-size: 14px;
    background-color: #ece7f2;
`;

