import {useSelector} from 'react-redux';
import {RootState} from '../store/configureStore';

/**
 * Hook to check if user is authorized (has auth token)
 */
export default function useAuthorized(): boolean {
  return useSelector((state: RootState) => state.app?.authToken !== null);
}
