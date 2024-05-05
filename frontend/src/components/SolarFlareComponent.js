import React from 'react';
import useSolarFetchDataFromDonki from '../hooks/fetchSolarDONKI';
import { Typography, CircularProgress } from '@material-ui/core';

const SolarFlareComponent = ({ title, startDate, endDate, type }) => {
  const { data, loading, error } = useSolarFetchDataFromDonki(startDate, endDate, type);
  const ipsData = data && data.length > 0 ? data[0] : null;
  const { beginTime, note, link, submissionTime } = ipsData || {};

  return (
    <div style={{ margin: '20px 0' }}>
      <Typography variant="h6">Solar Flare</Typography>
      <Typography variant="body1">A solar flare is an intense burst of radiation coming from the release of magnetic energy associated with sunspots. Flares are our solar system's largest explosive events. They are seen as bright areas on the sun and they can last from minutes to hours.</Typography>

      {loading && <CircularProgress style={{ marginTop: '10px' }} />}
      {error && <Typography variant="body1" color="error">Error: {error.message}</Typography>}

      {ipsData && (
        <div style={{ marginTop: '20px' }}>
          <hr />
          <Typography variant="body1">Event Time: {beginTime}</Typography>
          <Typography variant="body1">Note: {note}</Typography>
          <Typography variant="body1">Submission Time: {submissionTime}</Typography>
          <Typography variant="body1">Link: <a href={link} style={{ color: '#1976d2', textDecoration: 'none' }}>{link}</a></Typography>
          <hr />
        </div>
      )}
    </div>
  );
};

export default SolarFlareComponent;
