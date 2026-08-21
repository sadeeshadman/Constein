import { fireEvent, render, screen } from '@testing-library/react';
import { CoringServices } from '@/components/coring/CoringServices';

describe('CoringServices', () => {
  test('renders all coring subservices with descriptions', () => {
    render(<CoringServices />);

    expect(screen.getByRole('heading', { name: 'Slab Sawing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Core Drilling' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Concrete Grinding' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Wire Sawing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Wall Sawing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Breaking & Removal' })).toBeInTheDocument();
  });

  test('opens the quote modal with the selected subservice', () => {
    render(<CoringServices />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Get a Quote' })[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Request a Quote' })).toBeInTheDocument();
  });

  test('opens the quote modal for a general inquiry from the CTA button', () => {
    render(<CoringServices />);

    fireEvent.click(screen.getByRole('button', { name: 'Request a Quote' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
