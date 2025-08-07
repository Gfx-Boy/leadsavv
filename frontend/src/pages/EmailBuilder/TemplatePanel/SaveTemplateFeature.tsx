import React, { useState, useMemo } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { renderToStaticMarkup } from '@usewaypoint/email-builder'; // Import renderToStaticMarkup
import { useDocument } from '../documents/editor/EditorContext.tsx';

export default function SaveTemplateFeature() {
  const [open, setOpen] = useState(false); // State to control the popup
  const [templateName, setTemplateName] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const document = useDocument();
  const code = useMemo(() => renderToStaticMarkup(document, { rootBlockId: 'root' }), [document]);

  // Convert the document to HTML using renderToStaticMarkup

  const handleSaveTemplate = async () => {
    const token = sessionStorage.getItem('token'); // Get token from sessionStorage
    if (!token) {
      setError('Authorization token is missing.');
      return;
    }

    try {
      const response = await fetch('https://api.leadsavvyai.com/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: templateName,
          content: code, // Send the HTML content
          category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save the template.');
      }

      // Redirect to /email/templates after successful save
      navigate('/email/templates');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Save Template Button */}
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Save Template
      </Button>

      {/* Save Template Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Save Template</DialogTitle>
        <DialogContent>
          <TextField
            label="Template Name"
            fullWidth
            margin="normal"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <TextField
            label="Category"
            select
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Support">Support</MenuItem>
          </TextField>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(false);
              handleSaveTemplate();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}