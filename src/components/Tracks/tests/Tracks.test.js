import {screen, render} from '@testing-library/react';
import Tracks from '../typescript/index.tsx';

test('all tracks fully rendered', () => {
  render(<Tracks/>);
  expect(screen.getByTestId('list-of-tracks')).toBeInTheDocument();
})