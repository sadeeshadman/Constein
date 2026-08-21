import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ServiceDetail } from '../services/ServiceDetail';
import { services } from '../../lib/services';
import { apiFetch } from '../../lib/api';

jest.mock('../../lib/api', () => ({
  apiFetch: jest.fn(),
}));

const mockedApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;

function mockSessionFetch(role: 'employee' | 'admin' | null) {
  const mock = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => (role ? { user: { role } } : { user: null }),
  });

  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    writable: true,
    value: mock,
  });

  return mock;
}

describe('ServiceDetail', () => {
  afterEach(() => {
    mockedApiFetch.mockReset();
    jest.restoreAllMocks();
  });

  test('renders subservice details directly in a card', () => {
    render(<ServiceDetail service={services[0]} />);

    expect(
      screen.getByText(
        'A full condition review before closing, focused on structural, electrical, plumbing, roofing, and safety-related findings.',
      ),
    ).toBeInTheDocument();
  });

  test('renders all coring subservices', () => {
    const coringService = services.find((service) => service.slug === 'coring');

    if (!coringService) {
      throw new Error('Expected coring service to exist');
    }

    render(<ServiceDetail service={coringService} />);

    expect(screen.getByText('Slab Sawing')).toBeInTheDocument();
    expect(screen.getByText('Core Drilling')).toBeInTheDocument();
    expect(screen.getByText('Concrete Grinding')).toBeInTheDocument();
    expect(screen.getByText('Wire Sawing')).toBeInTheDocument();
    expect(screen.getByText('Wall Sawing')).toBeInTheDocument();
    expect(screen.getByText('Breaking & Removal')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Get a Quote' })).toHaveLength(6);
  });

  test('keeps a matching subservice visible when provided', () => {
    render(
      <ServiceDetail service={services[0]} initialExpandedSubserviceId="pre-purchase-inspection" />,
    );

    expect(
      screen.getByText(
        'A full condition review before closing, focused on structural, electrical, plumbing, roofing, and safety-related findings.',
      ),
    ).toBeInTheDocument();
  });

  test('renders owner and tenant service groups for property management', () => {
    const propertyManagementService = services.find(
      (service) => service.slug === 'property-management',
    );

    if (!propertyManagementService) {
      throw new Error('Expected property-management service to exist');
    }

    render(<ServiceDetail service={propertyManagementService} />);

    expect(screen.getByRole('heading', { name: 'Services for Owners' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Services for Tenants' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Owner' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tenant' })).toBeInTheDocument();
    expect(screen.getByText('Property Management')).toBeInTheDocument();
    expect(screen.getByText('Become a Tenant')).toBeInTheDocument();
  });

  test('scrolls to tenant section when tenant audience is selected', () => {
    const propertyManagementService = services.find(
      (service) => service.slug === 'property-management',
    );

    if (!propertyManagementService) {
      throw new Error('Expected property-management service to exist');
    }

    const scrollIntoViewMock = jest.fn();

    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: scrollIntoViewMock,
    });

    render(<ServiceDetail service={propertyManagementService} />);

    fireEvent.click(screen.getByRole('button', { name: 'Tenant' }));

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  test('opens quote modal with service prefilled from page-level action', () => {
    render(<ServiceDetail service={services[0]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Request a Quote' }));

    expect(screen.getByRole('dialog', { name: 'Request a Quote' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Type of Service/i)).toHaveValue('Home Inspection');
    expect(screen.getByLabelText(/Specification/i)).toHaveValue('');
  });

  test('opens quote modal with subservice prefilled from subservice action', () => {
    render(<ServiceDetail service={services[0]} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Get a Quote' })[0]);

    expect(screen.getByRole('dialog', { name: 'Request a Quote' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Type of Service/i)).toHaveValue('Home Inspection');
    expect(screen.getByLabelText(/Specification/i)).toHaveValue('Pre-Purchase Inspection');
  });

  test('does not show subservice quote buttons for forms subservices', () => {
    const propertyManagementService = services.find(
      (service) => service.slug === 'property-management',
    );

    if (!propertyManagementService) {
      throw new Error('Expected property-management service to exist');
    }

    render(<ServiceDetail service={propertyManagementService} />);

    expect(screen.getByRole('heading', { name: 'Property Forms' })).toBeInTheDocument();
    expect(screen.getByText('Forms for Owners')).toBeInTheDocument();
    expect(screen.getByText('Forms for Tenants')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Get a Quote' })).toHaveLength(7);
  });

  test('shows owner forms list with Eviction Notice link', () => {
    const propertyManagementService = services.find(
      (service) => service.slug === 'property-management',
    );

    if (!propertyManagementService) {
      throw new Error('Expected property-management service to exist');
    }

    render(<ServiceDetail service={propertyManagementService} />);

    const formLink = screen.getByRole('link', { name: /Eviction Notice/i });

    expect(formLink).toBeInTheDocument();
    expect(formLink).toHaveAttribute(
      'href',
      '/forms/property-management/owners/N12-Notice%20of%20Eviction.pdf',
    );
  });

  test('hides report generator tools when inspector is not logged in', async () => {
    mockSessionFetch(null);

    render(<ServiceDetail service={services[0]} />);

    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'Open Report Generator' }),
      ).not.toBeInTheDocument();
    });
  });

  test('validates address before opening report generator', async () => {
    mockSessionFetch('employee');

    render(<ServiceDetail service={services[0]} />);

    await screen.findByRole('button', { name: 'Open Report Generator' });
    fireEvent.click(screen.getByRole('button', { name: 'Open Report Generator' }));

    expect(screen.getByText('Property address is required to start a report.')).toBeInTheDocument();
    expect(mockedApiFetch).not.toHaveBeenCalled();
  });

  test('starts inspection and navigates to report workspace', async () => {
    mockSessionFetch('employee');

    mockedApiFetch.mockResolvedValue({ inspection: { _id: 'inspection-123' } });

    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    render(<ServiceDetail service={services[0]} />);

    await screen.findByRole('button', { name: 'Open Report Generator' });
    fireEvent.change(screen.getByLabelText(/Property Address/i), {
      target: { value: '101 Example Ave, Ottawa' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Open Report Generator' }));

    await waitFor(() => {
      expect(mockedApiFetch).toHaveBeenCalledWith('/inspections/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyAddress: '101 Example Ave, Ottawa',
          propertyType: 'Detached',
        }),
      });
    });

    expect(openSpy).toHaveBeenCalledWith('/report-generator/inspection-123', '_self');
  });

  test('shows launch error if inspection start request fails', async () => {
    mockSessionFetch('employee');

    mockedApiFetch.mockRejectedValue(new Error('Start failed'));

    render(<ServiceDetail service={services[0]} />);

    await screen.findByRole('button', { name: 'Open Report Generator' });
    fireEvent.change(screen.getByLabelText(/Property Address/i), {
      target: { value: '88 Main St' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Open Report Generator' }));

    await waitFor(() => {
      expect(screen.getByText('Start failed')).toBeInTheDocument();
    });
  });
});
