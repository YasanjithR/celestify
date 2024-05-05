import React from 'react';
import useIPSFetchDataFromDonki from '../hooks/fetchIPSDONKI';
import { Typography, CircularProgress } from '@material-ui/core';

const IPSComponent = ({ title, startDate, endDate, type }) => {
  const { data, loading, error } = useIPSFetchDataFromDonki(startDate, endDate, type);
  const ipsData = data && data.length > 0 ? data[0] : null;
  const { catalog, link, submissionTime, eventTime } = ipsData || {};

  return (
    <div style={{ margin: '20px 0' }}>
      <Typography variant="h6">Interplanetary Shocks</Typography>
      <Typography variant="body1">Interplanetary shocks are a type of collisionless shock — ones where particles transfer energy through electromagnetic fields instead of directly bouncing into one another.</Typography>

      {loading && <CircularProgress style={{ marginTop: '10px' }} />}
      {error && <Typography variant="body1" color="error">Error: {error.message}</Typography>}

      {ipsData && (
        <div style={{ marginTop: '20px' }}>
          <hr />
          <Typography variant="body1">Event Time: {eventTime}</Typography>
          <Typography variant="body1">Submission Time: {submissionTime}</Typography>
          <Typography variant="body1">Catalog: {catalog}</Typography>
          <Typography variant="body1">Link: <a href={link} style={{ color: '#1976d2', textDecoration: 'none' }}>{link}</a></Typography>
          <hr />
        </div>
      )}
    </div>
  );
};

export default IPSComponent;
