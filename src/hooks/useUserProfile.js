import axios from 'axios';
import { useContext } from 'react';
import { UserStateContext } from 'context/user';

export default function useUserProfile() {
  const { user, setUser } = useContext(UserStateContext);

  const getUser = async () => {
    const requestUrl = `${process.env.BASEURL}/api/profile/me`;

    if (requestUrl != '') {
      await axios
        .get(requestUrl)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error.status);
        });
    }
  };

  return [user, getUser];
}
