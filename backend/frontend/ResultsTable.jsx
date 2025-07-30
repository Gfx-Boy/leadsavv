import React, { useEffect, useState } from 'react';

const ResultsTable = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/scrape'); // Adjust the endpoint if necessary
    const accumulatedResults = []; // Temporary array to accumulate results

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse the incoming JSON object
        accumulatedResults.push(data); // Add the new result to the array
        setResults([...accumulatedResults]); // Update state with a new array reference
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.addEventListener('complete', () => {
      console.log('Scraping complete.');
      eventSource.close(); // Close the connection when scraping is complete
    });

    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };

    return () => {
      eventSource.close(); // Clean up the SSE connection on component unmount
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Business Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Email</th>
          <th>Rating</th>
          <th>Reviews</th>
          <th>Category</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.businessName}</td>
            <td>{result.address}</td>
            <td>{result.phone}</td>
            <td>
              <a href={result.website} target="_blank" rel="noopener noreferrer">
                {result.website}
              </a>
            </td>
            <td>{result.email}</td>
            <td>{result.rating}</td>
            <td>{result.reviews}</td>
            <td>{result.category}</td>
            <td>{result.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
