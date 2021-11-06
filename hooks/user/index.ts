import { useSession } from 'next-auth/client';
import { UserType } from 'interfaces';
import { GET_USER } from 'api';
import { ProfilApiService } from 'api';
import { useQuery } from 'react-query';
import { ProfileResponse } from 'api/dto/Profile.dto';

export const useUser = () => {
	const [session] = useSession();
	const user = session?.user ? (session.user as UserType) : undefined;
	let { data: apiUser } = useQuery<UserType>([GET_USER], () =>
		ProfilApiService.getUser()
	);

	if (apiUser) {
		console.log('api', apiUser);
		apiUser = ProfileResponse.mapValuesTo(apiUser.data);
		console.log('desp', apiUser);
	}

	return apiUser ? apiUser : user;
};
