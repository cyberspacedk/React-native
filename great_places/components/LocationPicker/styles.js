import styled from 'styled-components';

export const LocationScreen = styled.View`
  margin-bottom: 15px; 
`;

export const MapPreview = styled.View`
  margin: 20px 0;
  width: 100%;
  height: 150px;
  background-color: #ccc;
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

export const EmptyMessage = styled.Text`

`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const GetLocationButton = styled.Button`
  width: 200px;
  text-align: center;
`;

export const PickOnMapButton = styled.Button`
  width: 200px;
  text-align: center; 
`;