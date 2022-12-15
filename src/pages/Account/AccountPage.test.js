import React from 'react';
// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import AccountPage from './AccountPage';

// import keycloak from "../../Keycloak";
// import {ReactKeycloakProvider, useKeycloak} from "@react-keycloak/web";


describe('<AccountPage />', () => {
  test('it should mount', () => {

    let mockInitialized = true;
    let mockKeycloakStub = {"tokenParsed": {"name": ""}};

    jest.mock("@react-keycloak/web", () => {
      const originalModule = jest.requireActual("@react-keycloak/web");
      return {
        ...originalModule,
        useKeycloak: () =>  [
          mockKeycloakStub,
          mockInitialized
        ]
      };
    });

    // render(<ReactKeycloakProvider authClient={keycloak}><AccountPage /></ReactKeycloakProvider>);
    
    // const account = screen.getByTestId('AccountPage');
    // expect(account).toBeInTheDocument();
  });
});