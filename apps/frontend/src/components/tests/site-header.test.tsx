import { fireEvent, render, screen } from '@testing-library/react';
import { SiteHeader } from '../layout/SiteHeader';

describe('SiteHeader', () => {
  test('opens a compact services dropdown positioned under the Services button', () => {
    render(<SiteHeader />);

    const servicesButton = screen.getByRole('button', { name: 'Services' });
    fireEvent.click(servicesButton);

    const servicesMenu = screen.getByRole('menu', { name: 'Services menu' });

    expect(servicesMenu).toHaveClass('absolute', 'left-0', 'top-full');
    expect(servicesMenu).toHaveClass('w-64');
    expect(screen.getByRole('link', { name: 'Home Inspection' })).toHaveAttribute(
      'href',
      '/home-inspection',
    );
    expect(screen.getByRole('link', { name: 'Property Management' })).toHaveAttribute(
      'href',
      '/property-management',
    );
    expect(screen.getByRole('link', { name: 'Construction Services' })).toHaveAttribute(
      'href',
      '/construction',
    );
    expect(screen.getByRole('link', { name: 'Coring' })).toHaveAttribute('href', '/coring');
    expect(screen.getByText('Home Inspection')).toBeInTheDocument();
    expect(screen.getByText('Property Management')).toBeInTheDocument();
    expect(screen.getByText('Construction Services')).toBeInTheDocument();
    expect(screen.getByText('Coring')).toBeInTheDocument();
    expect(screen.queryByText('Slab Sawing')).not.toBeInTheDocument();
    expect(screen.queryByText('Concrete Testing')).not.toBeInTheDocument();
    expect(screen.queryByText('Engineering Consultants')).not.toBeInTheDocument();
  });

  test('closes services dropdown when clicked again', () => {
    render(<SiteHeader />);

    const servicesButton = screen.getByRole('button', { name: 'Services' });
    fireEvent.click(servicesButton);
    expect(screen.getByText('Home Inspection')).toBeInTheDocument();

    fireEvent.click(servicesButton);
    expect(screen.queryByRole('link', { name: 'Home Inspection' })).not.toBeInTheDocument();
  });
});
