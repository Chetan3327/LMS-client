import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const useAuthHeaders = () => {
  const [cookie] = useCookies(['jwt-access-token']);
  const [headers, setHeaders] = useState({
    'Content-Type': 'application/json',
  });
  useEffect(() => {
    setHeaders(prevHeaders => {
      if (cookie['jwt-access-token']) {
        return {
          ...prevHeaders,
          Authorization: cookie['jwt-access-token'],
        };
      } else {
        // Remove Authorization header if token is not present
        const { Authorization, ...restHeaders } = prevHeaders;
        return restHeaders;
      }
    });
  }, [cookie]);

  return headers;
};

export default useAuthHeaders;
