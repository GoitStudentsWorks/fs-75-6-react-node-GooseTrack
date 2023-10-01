import styled from "@emotion/styled";
import { media } from 'utils/queries';

export const BoxUserProfile = styled.div` 
display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 335px;    
    padding: 59px 18px 40px 18px;    
    background-color: ${props => props.theme.userAvatarBackground};
    border: 1px solid #111;
    border-radius: 16px;
    position: fixed;
    gap: 40px;
    width: 100%;
    margin: 95px auto;
     
    ${media('tablet', '')`
        max-width: 704px;
        padding: 40px 175px; 
        margin: 0 auto;       
    `}
    ${media('desktop', '')`        
        max-width: 1087px;
        max-hight: 752px;
        
        gap: 44px;
        padding: 60px 165px;
        
    `}
`;