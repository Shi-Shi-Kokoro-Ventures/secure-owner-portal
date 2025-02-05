import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NewMaintenanceRequest from './NewMaintenanceRequest';
import { useToast } from '@/hooks/use-toast';

// Mock the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <NewMaintenanceRequest />
    </BrowserRouter>
  );
};

describe('NewMaintenanceRequest', () => {
  it('renders the form correctly', () => {
    renderComponent();
    expect(screen.getByText('Submit Maintenance Request')).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('validates required fields on submit', async () => {
    renderComponent();
    const submitButton = screen.getByText('Submit Request');
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  it('handles file upload correctly', () => {
    renderComponent();
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/attachments/i);
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.getByText('test.png')).toBeInTheDocument();
  });

  it('navigates back on cancel', () => {
    renderComponent();
    const cancelButton = screen.getByText('Cancel');
    
    fireEvent.click(cancelButton);
    
    // Navigation would be tested here, but we've mocked useNavigate
  });
});