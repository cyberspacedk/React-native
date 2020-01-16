import styled from 'styled-components';

import Colors from '../../constants/colors';

export const Container = styled.View`
  align-items: center;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-color:  #ccc;
  border-width: 1px;

`;

export const ImageLabel = styled.Text`
  
`;

export const Image = styled.Image`
  width:100%;
  height: 100%;
`; 

export const UploadButton = styled.Button`
  margin: 10px;
`;