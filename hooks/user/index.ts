import { UserType } from "interfaces";
import { GET_USER } from "services";
import { ProfilApiService } from "services";
import { useQuery } from "react-query";
import { useSession } from "next-auth/client";

export const useUser = () => {
  const [session] = useSession();
  // const user = session?.user ? (session.user as UserType) : undefined;
  // if (session) {
  console.log(session);
  const { data, isLoading, refetch } = useQuery<any>([GET_USER], () =>
    ProfilApiService.getUser()
  );

  // if (apiUser) {
  // 	console.log('api', apiUser);
  // 	apiUser = ProfileResponse.mapValuesTo(apiUser.data);
  // 	console.log('desp', apiUser);
  // }

  return { data, loading: isLoading, refetch };
  // }
};
