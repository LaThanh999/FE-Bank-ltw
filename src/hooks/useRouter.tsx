import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const push = (keyword: string) => {
    navigate(keyword);
  };

  const replace = (keyword: string) => {
    navigate(keyword, { replace: true });
  };

  const query = (keyword: string) => {
    return searchParams.get(keyword);
  };

  const params = () => {
    return useParams;
  };

  return {
    push,
    replace,
    query,
    params,
    location: useLocation(),
  };
};
