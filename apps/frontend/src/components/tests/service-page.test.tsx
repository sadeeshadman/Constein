import { render, screen } from '@testing-library/react';
import ServicePage, { generateStaticParams } from '@/app/[slug]/page';

const notFoundMock = jest.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
});
const redirectMock = jest.fn((destination: string) => {
  throw new Error(`NEXT_REDIRECT:${destination}`);
});

jest.mock('next/navigation', () => ({
  notFound: () => notFoundMock(),
  redirect: (destination: string) => redirectMock(destination),
}));

describe('ServicePage route', () => {
  test('returns static params for all services', () => {
    const params = generateStaticParams();

    expect(params).toEqual(
      expect.arrayContaining([
        { slug: 'home-inspection' },
        { slug: 'property-management' },
        { slug: 'construction-services' },
        { slug: 'engineering-consultants' },
      ]),
    );
  });

  test('renders service page for a valid slug', async () => {
    const element = await ServicePage({
      params: Promise.resolve({ slug: 'construction-services' }),
      searchParams: Promise.resolve({}),
    });
    render(element);

    expect(screen.getByRole('heading', { name: 'Construction Services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Full Coring Services →' })).toHaveAttribute(
      'href',
      '/coring',
    );
  });

  test('calls notFound for invalid slug', async () => {
    await expect(
      ServicePage({
        params: Promise.resolve({ slug: 'not-a-service' }),
        searchParams: Promise.resolve({}),
      }),
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });

  test('redirects the old coring query URL to the dedicated page', async () => {
    await expect(
      ServicePage({
        params: Promise.resolve({ slug: 'construction-services' }),
        searchParams: Promise.resolve({ subservice: 'coring' }),
      }),
    ).rejects.toThrow('NEXT_REDIRECT:/coring');

    expect(redirectMock).toHaveBeenCalledWith('/coring');
  });
});
