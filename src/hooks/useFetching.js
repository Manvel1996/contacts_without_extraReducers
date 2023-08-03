import { useDispatch } from "react-redux";

import { setPending, setIsLoading, setError } from "../redux/slices/auth";

export default function useFetching(callback) {
  const dispatch = useDispatch();

  const fetching = async () => {
    try {
      dispatch(setPending());
      await callback();
    } catch (e) {
      dispatch(setError(e));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return fetching;
}
