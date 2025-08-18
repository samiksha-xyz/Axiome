import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Define the ref interface
interface ExcalidrawWrapperRef {
  updateScene: (newElements: any[]) => void;
}

// Mock the CSS import
jest.mock('@excalidraw/excalidraw/index.css', () => ({}));

// Mock the entire Excalidraw module with minimal implementation
jest.mock('@excalidraw/excalidraw', () => ({
  Excalidraw: ({ children }: any) => React.createElement('div', { 'data-testid': 'excalidraw' }, children),
  MainMenu: Object.assign(
    ({ children }: any) => React.createElement('div', { 'data-testid': 'menu' }, children),
    { Item: ({ children }: any) => React.createElement('button', null, children) }
  ),
}));

// Import the component after mocking
import ExcalidrawWrapper from './excalidrawWrapper';

describe('ExcalidrawWrapper', () => {
  it('renders without crashing', () => {
    const { container } = render(<ExcalidrawWrapper />);
    expect(container).toBeInTheDocument();
  });

  it('exposes ref with updateScene method', () => {
    const ref = React.createRef<ExcalidrawWrapperRef>();
    render(<ExcalidrawWrapper ref={ref} />);
    expect(ref.current?.updateScene).toBeDefined();
  });

  it('has correct displayName', () => {
    expect(ExcalidrawWrapper.displayName).toBe('ExcalidrawWrapper');
  });
});
