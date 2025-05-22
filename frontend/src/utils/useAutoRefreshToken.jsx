import { useEffect } from 'react';
import { useRefreshTokenQuery } from '../redux/api';

export const useAutoRefreshToken = () => {

  const { data, refetch } = useRefreshTokenQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 4 * 60 * 1000); // every 4 minutes

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
  }, [data]);
};