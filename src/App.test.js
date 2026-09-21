import { render, screen, within } from '@testing-library/react';
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
