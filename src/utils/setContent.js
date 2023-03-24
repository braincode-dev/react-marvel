import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";
import Skeleton from "../components/skeleton/Skeleton";

const setContent = (proccess, Component, data ) => {
    switch (proccess){
      case 'waiting':
        return <Skeleton />;
      case 'loading':
        return <Spinner />;
      case 'confirmed':
          return <Component data={data}/>;
      case 'error':
        return <ErrorMessage />;
      default:
        throw new Error('Unexpected proccess state.');
    }
}

export default   setContent;