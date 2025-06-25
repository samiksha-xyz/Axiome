import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MermaidEditor from './MermaidEditor';

describe('MermaidEditor', () => {
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with initial elements', () => {
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    // Check if the heading is rendered
    expect(screen.getByText('Mermaid Input')).toBeInTheDocument();
    
    // Check if the textarea is rendered
    expect(screen.getByLabelText('Mermaid Input')).toBeInTheDocument();
    
    // Check if the update button is rendered
    expect(screen.getByRole('button', { name: /update excalidraw/i })).toBeInTheDocument();
  });

  it('displays the default mermaid code in the textarea', () => {
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    const expectedDefaultCode = `flowchart TD
    A[Start] --> B{Is it?};
    B -- Yes --> C[OK];
    C --> D[Rethink];
    D --> A;
    B -- No --> E[End];`;
    
    expect(textarea).toHaveValue(expectedDefaultCode);
  });

  it('updates the textarea value when user types', async () => {
    const user = userEvent.setup();
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    
    // Clear the textarea and type new content
    await user.clear(textarea);
    await user.type(textarea, 'flowchart LR\n    A --> B');
    
    expect(textarea).toHaveValue('flowchart LR\n    A --> B');
  });

  it('calls onUpdate with current mermaid code when update button is clicked', async () => {
    const user = userEvent.setup();
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const updateButton = screen.getByRole('button', { name: /update excalidraw/i });
    
    await user.click(updateButton);
    
    const expectedDefaultCode = `flowchart TD
    A[Start] --> B{Is it?};
    B -- Yes --> C[OK];
    C --> D[Rethink];
    D --> A;
    B -- No --> E[End];`;
    
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(expectedDefaultCode);
  });

  it('calls onUpdate with updated mermaid code after user modifies textarea', async () => {
    const user = userEvent.setup();
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    const updateButton = screen.getByRole('button', { name: /update excalidraw/i });
    const newMermaidCode = 'flowchart LR\n    Start --> End';
    
    // Clear textarea and type new code
    await user.clear(textarea);
    await user.type(textarea, newMermaidCode);
    
    // Click update button
    await user.click(updateButton);
    
    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(newMermaidCode);
  });

  it('does not call onUpdate when textarea changes without clicking update button', async () => {
    const user = userEvent.setup();
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    
    await user.clear(textarea);
    await user.type(textarea, 'new code');
    
    // onUpdate should not be called until the button is clicked
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    
    expect(textarea).toHaveAttribute('aria-label', 'Mermaid Input');
  });

  it('has proper styling for textarea', () => {
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    
    expect(textarea).toHaveStyle({
      height: '200px',
      width: '100%',
      fontFamily: 'monospace',
      fontSize: '16px'
    });
  });


  it('handles multiple button clicks correctly', async () => {
    const user = userEvent.setup();
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const updateButton = screen.getByRole('button', { name: /update excalidraw/i });
    
    // Click button multiple times
    await user.click(updateButton);
    await user.click(updateButton);
    await user.click(updateButton);
    
    expect(mockOnUpdate).toHaveBeenCalledTimes(3);
  });

  it('handles empty textarea content', async () => {
    const user = userEvent.setup();
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    const updateButton = screen.getByRole('button', { name: /update excalidraw/i });
    
    // Clear the textarea completely
    await user.clear(textarea);
    await user.click(updateButton);
    
    expect(mockOnUpdate).toHaveBeenCalledWith('');
  });

  it('preserves textarea content across multiple interactions', async () => {
    const user = userEvent.setup();
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    const updateButton = screen.getByRole('button', { name: /update excalidraw/i });
    const customCode = 'flowchart TB\n    A --> B --> C';
    
    // Type custom code
    await user.clear(textarea);
    await user.type(textarea, customCode);
    
    // Click update button
    await user.click(updateButton);
    
    // Verify textarea still contains the custom code
    expect(textarea).toHaveValue(customCode);
    expect(mockOnUpdate).toHaveBeenCalledWith(customCode);
  });
});
