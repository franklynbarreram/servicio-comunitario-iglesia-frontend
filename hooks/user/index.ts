import { useSession } from 'next-auth/client';
import { UserType } from 'interfaces';
import { GET_USER } from 'services';
import { ProfilApiService } from 'services';
import { useQuery } from 'react-query';
import { ProfileResponse } from 'services/dto/Profile.dto';

export const useUser = () => {
	const [session] = useSession();
	const user = session?.user ? (session.user as UserType) : undefined;
	// let { data: apiUser } = useQuery<UserType>([GET_USER], () =>
	// 	ProfilApiService.getUser()
	// );
	const apiUser = '';

	// if (apiUser) {
	// 	console.log('api', apiUser);
	// 	apiUser = ProfileResponse.mapValuesTo(apiUser.data);
	// 	console.log('desp', apiUser);
	// }

	return apiUser ? apiUser : user;
};
