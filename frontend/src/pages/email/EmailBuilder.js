import React, { useState } from 'react';
import { EmailBuilder as Builder } from 'email-builder-js'; // Import the EmailBuilder from the library

const EmailBuilder = ({ onClose }) => {
  const [emailData, setEmailData] = useState({
    subject: '',
    body: '',
    // Add other necessary fields for the email template
  });

  const handleSave = () => {
    // Logic to save the email template (to be implemented later)
    console.log('Email template saved:', emailData);
  };

  return (
    <div className="email-builder-container">
      <button onClick={onClose} className="close-button">Close</button>
      <Builder
        subject={emailData.subject}
        body={emailData.body}
        onSubjectChange={(newSubject) => setEmailData({ ...emailData, subject: newSubject })}
        onBodyChange={(newBody) => setEmailData({ ...emailData, body: newBody })}
        theme="dark" // Set the theme to dark
        // Add any other necessary props and configurations
      />
      <button onClick={handleSave} className="save-button">Save Template</button>
    </div>
  );
};
export default EmailBuilder;
