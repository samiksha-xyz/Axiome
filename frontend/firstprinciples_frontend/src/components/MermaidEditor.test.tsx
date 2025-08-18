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
    expect(screen.getByText('Mermaid Diagram Editor')).toBeInTheDocument();
    
    // Check if the textarea is rendered
    expect(screen.getByLabelText('Mermaid Input')).toBeInTheDocument();
    
    // Check if the update button is rendered
    expect(screen.getByRole('button', { name: "Update Diagram" })).toBeInTheDocument();
  });

  it('displays the default mermaid code in the textarea', () => {
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    const expectedDefaultCode = `graph TD;\n`;
    
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

  it('calls onUpdate with updated mermaid code after user modifies textarea', async () => {
    const user = userEvent.setup();
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    const updateButton = screen.getByRole('button', { name: "Update Diagram" });
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

  it('handles empty textarea content', async () => {
    const user = userEvent.setup();
    render(<MermaidEditor onUpdate={mockOnUpdate} />);
    
    const textarea = screen.getByLabelText('Mermaid Input');
    const updateButton = screen.getByRole('button', { name: "Update Diagram" });
    
    // Clear the textarea completely
    await user.clear(textarea);
    await user.click(updateButton);
    
    expect(mockOnUpdate).toHaveBeenCalledWith('');
  });
});
