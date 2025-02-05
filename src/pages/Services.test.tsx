import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Services from './Services';

// Mock the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Services Page', () => {
  const renderServices = () => {
    return render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderServices();
    expect(screen.getByText(/Shi Shi Kokoro Property Management Services/i)).toBeInTheDocument();
  });

  it('displays all service packages', () => {
    renderServices();
    expect(screen.getByText(/Basic Management Package/i)).toBeInTheDocument();
    expect(screen.getByText(/Standard Management Package/i)).toBeInTheDocument();
    expect(screen.getByText(/Full-Service Management Package/i)).toBeInTheDocument();
  });

  it('handles "Get Started" button click correctly', () => {
    renderServices();
    const getStartedButtons = screen.getAllByText('Get Started');
    fireEvent.click(getStartedButtons[0]);
    
    expect(mockNavigate).toHaveBeenCalledWith('/?scrollTo=contact');
  });

  it('displays contact information', () => {
    renderServices();
    expect(screen.getByText(/Let's Work Together!/i)).toBeInTheDocument();
    expect(screen.getByText(/info@shishikokoroproperty.com/i)).toBeInTheDocument();
  });

  it('displays all additional services', () => {
    renderServices();
    expect(screen.getByText(/Tenant Placement Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Lease Renewal & Compliance/i)).toBeInTheDocument();
    expect(screen.getByText(/Property Maintenance/i)).toBeInTheDocument();
    expect(screen.getByText(/24\/7 Emergency Response/i)).toBeInTheDocument();
    expect(screen.getByText(/Tenant Rewards Program/i)).toBeInTheDocument();
    expect(screen.getByText(/Financial Management/i)).toBeInTheDocument();
  });
});