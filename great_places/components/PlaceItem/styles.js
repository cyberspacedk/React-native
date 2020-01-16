import styled from 'styled-components';
import Colors from '../../constants/colors';

export const TouchableOpacity = styled.TouchableOpacity` 
    flex-direction: row;
    padding: 15px 30px; 
    border-color: #ccc;
    border-bottom-width: 1px;
    align-items: center;
`; 

export const Container = styled.View` 
    width: 250px;
    margin-left: 25px;
    justify-content: center;
    align-items: flex-start;
`;

export const Image = styled.Image` 
    background-color: #ccc;
    border-color: ${Colors.primary};
    border-radius: 35px;
    border-width: 1px;
    height: 70px;
    width: 70px; 
`;

export const Title = styled.Text` 
    color: black;
    font-size: 18px;
    margin-bottom: 5px; 
`;

export const Address = styled.Text` 
    font-size: 16px;
    color: #666;
`;