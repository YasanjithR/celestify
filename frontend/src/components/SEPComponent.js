// import React from 'react';
// import useSEPFetchDataFromDonki from '../hooks/fetchSEPDONKI';
// const SEPCompoenent = ({ title, startDate, endDate, type }) => {

//   const { data, loading, error } = useSEPFetchDataFromDonki(startDate, endDate, type);
//   const ipsData = data && data.length > 0 ? data[0] : null;
//   const { sepID, link, submissionTime,eventTime,} = ipsData || {};
//   console.log(data)
  
//   return (
//     <>
//     <h1>{title}</h1>
//     <p>Interplanetary shocks are a type of collisionless shock — ones where particles transfer energy through electromagnetic fields instead of directly bouncing into one another</p>

//     {loading && <p>Loading...</p>}
//     {error && <p>Error: {error.message}</p>}

//     {ipsData && (
//         <div>
//             <p>Event Time: {eventTime}</p>
//             <p>Submission Time: {submissionTime}</p>
//             <p>SEP ID: {sepID}</p>
//             <p>Link: <a href={link}>{link}</a></p>
//         </div>
//     )}
// </>
//   );
// };
// export default SEPCompoenent;
