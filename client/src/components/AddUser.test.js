import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import AddUser from './AddUser';

jest.mock('axios');

describe('AddUser Component', () => {
  test('should add a new user and navigate to /budget', async () => {
    const mockUser = { nom: 'TestUser' };
    axios.post.mockResolvedValue({ data: mockUser });

    render(
      <Router>
        <AddUser />
      </Router>
    );

    // Fill in the input field
    fireEvent.change(screen.getByLabelText(/Nom Utilisateur/), { target: { value: 'TestUser' } });

    // Trigger the button click
    fireEvent.click(screen.getByText(/Ajouter Entité/));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users', mockUser);
      expect(screen.getByText(/Entity added successfully:/)).toBeInTheDocument();
      // You may add more assertions based on your actual implementation
    });

    // Ensure navigation to the desired path
    expect(window.location.pathname).toBe('/budget');
  });

  // You can add more test cases for different scenarios as needed
});
