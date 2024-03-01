import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreator } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreator, dispatch);
};