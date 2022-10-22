import { useQuery } from '@tanstack/react-query'
import { Spin } from 'antd'
import { getSessionUser } from "../../fetchers/login";

export default function UserSession() {
  const { isLoading, isError, data, error } = useQuery(['session_user'], getSessionUser, { refetchInterval: 120000 });
  if (isLoading) {
    return <Spin />
  }
  if (isError) {
    return <span>{`Error: ${error}`}</span>
  }

  if(data === undefined) {
    return <Spin />
  }

  return (
    <strong>{data.login}</strong>
  )
}