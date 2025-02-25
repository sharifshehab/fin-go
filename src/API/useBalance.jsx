import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';

const useBalance = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: credentials = [], isPending, refetch } = useQuery({
        queryKey: ['credentials'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?info=${user.email}`);
            return res.data;
        }
    })

    return [credentials, isPending, refetch];
};

export default useBalance;