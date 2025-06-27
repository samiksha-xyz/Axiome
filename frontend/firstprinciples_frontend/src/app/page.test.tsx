import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';

// Mock the child components
jest.mock('../components/TextInterface', () => {
  return function MockTextInterface({ onUpdate }: { onUpdate: (code: string) => void }) {
    return (
      <div data-testid="text-interface">
        <button 
          data-testid="trigger-update" 
          onClick={() => onUpdate('flowchart TD\n    A --> B')}
        >
          Trigger Update
        </button>
      </div>
    );
  };
});

jest.mock('../components/Header', () => {
  return function MockHeader({ title }: { title: string }) {
    return <div data-testid="header">{title}</div>;
  };
});

// Mock the dynamic ExcalidrawWrapper
const mockUpdateScene = jest.fn();
jest.mock('next/dynamic', () => {
  return function mockDynamic(importFunc: any, options: any) {
    const MockExcalidrawWrapper = React.forwardRef((props: any, ref: any) => {
      React.useImperativeHandle(ref, () => ({
        updateScene: mockUpdateScene,
      }));
      return <div data-testid="excalidraw-wrapper">Excalidraw Wrapper</div>;
    });
    MockExcalidrawWrapper.displayName = 'MockExcalidrawWrapper';
    return MockExcalidrawWrapper;
  };
});

// Mock external libraries
const mockParseMermaidToExcalidraw = jest.fn();
const mockConvertToExcalidrawElements = jest.fn();

jest.mock('@excalidraw/mermaid-to-excalidraw', () => ({
  parseMermaidToExcalidraw: mockParseMermaidToExcalidraw,
}));

jest.mock('@excalidraw/excalidraw', () => ({
  convertToExcalidrawElements: mockConvertToExcalidrawElements,
}));

// Mock console and window
const originalConsoleError = console.error;
const originalWindowAlert = window.alert;

describe('Page Component - Mermaid to Excalidraw Conversion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
    window.alert = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    window.alert = originalWindowAlert;
  });

  describe('Component Rendering', () => {
    it('renders all main components correctly', () => {
      render(<Page />);
      
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByText('Axiome')).toBeInTheDocument();
      expect(screen.getByTestId('excalidraw-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('text-interface')).toBeInTheDocument();
    });
  });

  describe('Successful Mermaid Conversion', () => {
    const mockMermaidCode = 'flowchart TD\n    A --> B';
    const mockParsedElements = [
      { id: '1', type: 'text', fontSize: 16, text: 'A' },
      { id: '2', type: 'text', fontSize: 14, text: 'B' },
      { id: '3', type: 'arrow', x: 0, y: 0 }, // No fontSize property
    ];
    const mockConvertedElements = [
      { id: '1', type: 'text', fontSize: 20, text: 'A' },
      { id: '2', type: 'text', fontSize: 20, text: 'B' },
      { id: '3', type: 'arrow', x: 0, y: 0 },
    ];

    beforeEach(() => {
      mockParseMermaidToExcalidraw.mockResolvedValue({
        elements: mockParsedElements,
      });
      mockConvertToExcalidrawElements.mockReturnValue(mockConvertedElements);
    });

    it('successfully converts valid Mermaid code to Excalidraw elements', async () => {
      render(<Page />);
      
      const triggerButton = screen.getByTestId('trigger-update');
      triggerButton.click();

      await waitFor(() => {
        expect(mockParseMermaidToExcalidraw).toHaveBeenCalledWith(mockMermaidCode);
      });

      expect(mockConvertToExcalidrawElements).toHaveBeenCalledWith([
        { id: '1', type: 'text', fontSize: 20, text: 'A' },
        { id: '2', type: 'text', fontSize: 20, text: 'B' },
        { id: '3', type: 'arrow', x: 0, y: 0 },
      ]);

      expect(mockUpdateScene).toHaveBeenCalledWith(mockConvertedElements);
    });

    it('applies 20px font size to elements with fontSize property', async () => {
      render(<Page />);
      
      const triggerButton = screen.getByTestId('trigger-update');
      triggerButton.click();

      await waitFor(() => {
        expect(mockConvertToExcalidrawElements).toHaveBeenCalledWith([
          { id: '1', type: 'text', fontSize: 20, text: 'A' },
          { id: '2', type: 'text', fontSize: 20, text: 'B' },
          { id: '3', type: 'arrow', x: 0, y: 0 }, // Unchanged - no fontSize
        ]);
      });
    });

    it('preserves elements without fontSize property unchanged', async () => {
      const elementsWithoutFontSize = [
        { id: '1', type: 'rectangle', width: 100, height: 50 },
        { id: '2', type: 'ellipse', radiusX: 30, radiusY: 20 },
      ];

      mockParseMermaidToExcalidraw.mockResolvedValue({
        elements: elementsWithoutFontSize,
      });

      render(<Page />);
      
      const triggerButton = screen.getByTestId('trigger-update');
      triggerButton.click();

      await waitFor(() => {
        expect(mockConvertToExcalidrawElements).toHaveBeenCalledWith(elementsWithoutFontSize);
      });
    });
  });

  describe('Error Handling', () => {
    it('handles invalid Mermaid syntax gracefully', async () => {
      const mockError = new Error('Invalid Mermaid syntax');
      mockParseMermaidToExcalidraw.mockRejectedValue(mockError);

      render(<Page />);
      
      const triggerButton = screen.getByTestId('trigger-update');
      triggerButton.click();

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith(
          'Error converting Mermaid to Excalidraw:',
          mockError
        );
      });

      expect(window.alert).toHaveBeenCalledWith(
        'Invalid syntax. Please follow the example adjacency list.'
      );
      expect(mockUpdateScene).not.toHaveBeenCalled();
    });

    it('handles conversion library errors', async () => {
      const mockError = new Error('Conversion failed');
      mockParseMermaidToExcalidraw.mockResolvedValue({
        elements: [{ id: '1', type: 'text', fontSize: 16 }],
      });
      mockConvertToExcalidrawElements.mockImplementation(() => {
        throw mockError;
      });

      render(<Page />);
      
      const triggerButton = screen.getByTestId('trigger-update');
      triggerButton.click();

      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith(
          'Error converting Mermaid to Excalidraw:',
          mockError
        );
      });

      expect(window.alert).toHaveBeenCalledWith(
        'Invalid syntax. Please follow the example adjacency list.'
      );
      expect(mockUpdateScene).not.toHaveBeenCalled();
    });
  });

  describe('Integration Flow', () => {
    it('completes the full flow from TextInterface to ExcalidrawWrapper', async () => {
      const mockElements = [
        { id: '1', type: 'text', fontSize: 12, text: 'Start' },
        { id: '2', type: 'text', fontSize: 14, text: 'End' },
      ];
      const mockStyledElements = [
        { id: '1', type: 'text', fontSize: 20, text: 'Start' },
        { id: '2', type: 'text', fontSize: 20, text: 'End' },
      ];
      const mockFinalElements = [
        { id: '1', type: 'text', fontSize: 20, text: 'Start', converted: true },
        { id: '2', type: 'text', fontSize: 20, text: 'End', converted: true },
      ];

      mockParseMermaidToExcalidraw.mockResolvedValue({ elements: mockElements });
      mockConvertToExcalidrawElements.mockReturnValue(mockFinalElements);

      render(<Page />);
      
      const triggerButton = screen.getByTestId('trigger-update');
      triggerButton.click();

      // Verify the complete flow
      await waitFor(() => {
        expect(mockParseMermaidToExcalidraw).toHaveBeenCalledWith('flowchart TD\n    A --> B');
      });

      expect(mockConvertToExcalidrawElements).toHaveBeenCalledWith(mockStyledElements);
      expect(mockUpdateScene).toHaveBeenCalledWith(mockFinalElements);

      // Verify no errors occurred
      expect(console.error).not.toHaveBeenCalled();
      expect(window.alert).not.toHaveBeenCalled();
    });
  });
});
