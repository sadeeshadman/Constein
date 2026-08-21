import { act, fireEvent, render, screen } from '@testing-library/react';
import { CoringHero } from '@/components/coring/CoringHero';

describe('CoringHero', () => {
  test('advances slides using next and previous controls', () => {
    render(<CoringHero />);

    expect(screen.getByRole('heading', { name: 'Slab Sawing' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('heading', { name: 'Core Drilling' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByRole('heading', { name: 'Slab Sawing' })).toBeInTheDocument();
  });

  test('jumps to a slide when dot indicator is clicked', () => {
    render(<CoringHero />);

    fireEvent.click(screen.getByRole('button', { name: 'Go to Wall Sawing' }));

    expect(screen.getByRole('heading', { name: 'Wall Sawing' })).toBeInTheDocument();
  });

  test('autoplays to next slide after interval', () => {
    jest.useFakeTimers();

    render(<CoringHero />);

    expect(screen.getByRole('heading', { name: 'Slab Sawing' })).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByRole('heading', { name: 'Core Drilling' })).toBeInTheDocument();

    jest.useRealTimers();
  });
});
