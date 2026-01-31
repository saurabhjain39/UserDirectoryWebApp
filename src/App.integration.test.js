import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import UsersService from './api/UsersService';

jest.mock('./api/UsersService');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('App integration tests', () => {
  test('shows loading then "No users found." when API returns empty list', async () => {
    UsersService.getAll.mockResolvedValue([]);

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/no users found/i)).toBeInTheDocument();
    });
  });

  test('renders table rows when API returns users', async () => {
    UsersService.getAll.mockResolvedValue([
      { id: 1, name: 'Alice', age: 30, city: 'X', state: 'Y', pincode: '1234' },
    ]);

    render(<App />);

    // Wait for user row to appear
    expect(await screen.findByText('Alice')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('shows error message when API fails', async () => {
    UsersService.getAll.mockRejectedValue(new Error('Failed to load users'));

    render(<App />);

    expect(await screen.findByText(/failed to load users/i)).toBeInTheDocument();
  });

  test('navigates to Add page and shows validation errors on empty submit', async () => {
    UsersService.getAll.mockResolvedValue([]);

    render(<App />);

    userEvent.click(screen.getByText(/add/i));

    const save = screen.getByRole('button', { name: /save/i });
    userEvent.click(save);

    // validation errors from yup should appear
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Age is required/i)).toBeInTheDocument();
    expect(screen.getByText(/City is required/i)).toBeInTheDocument();
    expect(screen.getByText(/State is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Pincode is required/i)).toBeInTheDocument();
  });

  test('submits new user, shows success toast, and navigates back to list', async () => {
    UsersService.getAll.mockResolvedValue([]);
    UsersService.create.mockResolvedValue({ id: 2, name: 'Bob' });

    render(<App />);

    userEvent.click(screen.getByText(/add/i));

    userEvent.type(screen.getByPlaceholderText(/name/i), 'Bob');
    userEvent.type(screen.getByPlaceholderText(/age/i), '28');
    userEvent.type(screen.getByPlaceholderText(/city/i), 'City');
    userEvent.type(screen.getByPlaceholderText(/state/i), 'State');
    userEvent.type(screen.getByPlaceholderText(/pincode/i), '1234');

    // use fake timers so we can fast-forward the 1500ms navigation delay
    jest.useFakeTimers();

    userEvent.click(screen.getByRole('button', { name: /save/i }));

    // Toast should show
    expect(await screen.findByText(/User added successfully!/i)).toBeInTheDocument();

    // Fast-forward timeout to trigger navigation back to list
    jest.advanceTimersByTime(1500);

    // After navigation, the Add form should no longer be present
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/name/i)).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
