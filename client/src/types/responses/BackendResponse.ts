import FailureResponse from './FailureResponse';
import SuccessfulDataResponse from './SuccessfulDataResponse';

type BackendResponse<T> = SuccessfulDataResponse<T> | FailureResponse;

export default BackendResponse;
