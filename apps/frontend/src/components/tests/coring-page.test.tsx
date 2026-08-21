import { render, screen } from '@testing-library/react';
import CoringPage from '@/app/coring/page';

describe('CoringPage route', () => {
  test('renders header, hero, and services sections', async () => {
    const element = await CoringPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
    render(element);

    expect(screen.getByRole('button', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'Slab Sawing' })).not.toHaveLength(0);
    expect(
      screen.getByRole('heading', { name: 'Complete Coring Solutions for Your Project' }),
    ).toBeInTheDocument();
  });
});
