import React from 'react';
import useFetchDataFromDonki from '../hooks/fetchDONKI';
import { Typography, CircularProgress } from '@material-ui/core';

const CMEComponent = ({ title, startDate, endDate, type }) => {
   const { data, loading, error } = useFetchDataFromDonki(startDate, endDate, type);

    const cmeData = data && data.length > 0 ? data[0] : null;
    const { catalog, link, submissionTime, startTime, note } = cmeData || {};

    return (
        <div style={{ margin: '20px 0' }}>
            <Typography variant="h6">Coronal Mass Ejections</Typography>
            <Typography variant="body1">Coronal Mass Ejections (CMEs) are large expulsions of plasma and magnetic field from the Sun's corona. They can eject billions of tons of coronal material and carry an embedded magnetic field (frozen in flux) that is stronger than the background solar wind interplanetary magnetic field (IMF) strength.</Typography>

            {loading && <CircularProgress style={{ marginTop: '10px' }} />}
            {error && <Typography variant="body1" color="error">Error: {error.message}</Typography>}

            {cmeData && (
                <div style={{ marginTop: '20px' }}>
                    <hr />
                    <Typography variant="body1">Start Time: {startTime}</Typography>
                    <Typography variant="body1">Submission Time: {submissionTime}</Typography>
                    <Typography variant="body1">Catalog: {catalog}</Typography>
                    <Typography variant="body1">Note: {note}</Typography>
                    <Typography variant="body1">Link: <a href={link} style={{ color: '#1976d2', textDecoration: 'none' }}>{link}</a></Typography>
                    <hr />
                </div>
            )}
        </div>
    );
};

export default CMEComponent;
