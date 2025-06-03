import { useEffect } from 'react';
// import { useRefreshTokenQuery } from '../redux/api';
import { useRefreshTokenQuery } from '../slices/userApiSlice';

export const useAutoRefreshToken = () => {
  console.log('Start Refresh....');
  const { data, refetch } = useRefreshTokenQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 14 * 60 * 1000); // every 4 minutes

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
    }
  }, [data]);
};