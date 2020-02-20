import styled from 'styled-components'; 

export const TouchableOpacity = styled.TouchableOpacity`  
    padding: 10px; 
    border-color: #ccc;
    border-bottom-width: 1px; 
    width: 100%;  
    flex-direction:row;
    justify-content:space-between;
`; 
export const Screen = styled.View` 
    flex:1;
    justify-content:space-between;
    flex-direction: column; 
    padding-right: 5px; 
`;

export const Container = styled.View`  
    padding: 10px;  
`;

export const Image = styled.Image` 
    background-color: #ccc;
    border-color: #ccc;
    border-radius: 100px;
    border-width: 3px;
    height: 100px;
    width: 100px; 
`;

export const Title = styled.Text` 
    color: black;
    font-size: 18px;
    margin-bottom: 5px; 
`;

export const Address = styled.Text` 
    font-size: 12px;
    color: #666; 
    width: 95%;
`;
 
export const ButtonWrapper = styled.View`
    width: 100px; 
`;
export const Button = styled.Button``