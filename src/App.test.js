import { render, screen, within, fireEvent, act } from '@testing-library/react';
import App from './App';

test('renders the hero heading and primary landmarks', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /complicated work/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
});

test('features the two priority projects before the additional project and archive', () => {
  render(<App />);
  const titles = screen
    .getAllByRole('heading', { level: 3 })
    .map((h) => h.textContent);
  const ops = titles.indexOf('AI Customer Operations Workspace');
  const map = titles.indexOf('Interactive Career Path Map');
  const image = titles.indexOf('AI Image Analysis Platform');
  expect(ops).toBeGreaterThanOrEqual(0);
  expect(map).toBeGreaterThan(ops);
  expect(image).toBeGreaterThan(map);
});

test('older projects are listed in the archive, not the showcase', () => {
  render(<App />);
  const archive = screen.getByRole('region', { name: /earlier experiments/i });
  expect(within(archive).getByText(/Weather API Platform/i)).toBeInTheDocument();
});

test('lists all three roles from the resume, newest first', () => {
  render(<App />);
  const experience = screen.getByRole('region', { name: /where i.ve worked/i });
  const companies = within(experience)
    .getAllByRole('heading', { level: 3 })
    .map((h) => h.textContent);
  expect(companies).toEqual([
    'Blackwave Services LLC',
    'Talentix Solutions Inc.',
    'SiriusMindShare LLC',
  ]);
});

test('shows education and links the publication by DOI', () => {
  render(<App />);
  expect(screen.getByText('Northeastern University')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /10\.1007\/978-981-92-1546-1_29/ })).toHaveAttribute(
    'href',
    'https://doi.org/10.1007/978-981-92-1546-1_29'
  );
});

test('image analysis demo runs a batch, is searchable and can export', () => {
  jest.useFakeTimers();
  render(<App />);
  const demo = screen.getByRole('list', { name: /image batch/i }).closest('.demo');

  fireEvent.click(within(demo).getByRole('button', { name: /run batch/i }));
  // Each image schedules the next timer from an effect, so advance one step per act().
  for (let i = 0; i < 4; i += 1) {
    act(() => { jest.advanceTimersByTime(800); });
  }
  expect(within(demo).getByRole('status')).toHaveTextContent(/batch complete/i);

  fireEvent.change(within(demo).getByRole('searchbox'), { target: { value: 'luna' } });
  expect(within(demo).getAllByRole('listitem')).toHaveLength(1);

  fireEvent.click(within(demo).getByRole('button', { name: /export report/i }));
  expect(within(demo).getByRole('status')).toHaveTextContent(/report\.csv ready/i);
  jest.useRealTimers();
});

test('projects without a public link show no placeholder text', () => {
  render(<App />);
  expect(screen.queryByText(/case study in progress/i)).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /read the related paper/i })).toBeInTheDocument();
});
