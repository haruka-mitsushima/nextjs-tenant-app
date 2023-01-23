import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { User } from 'pages/api/user'

export default function useUser({
    redirectTo = '',
    reactIfFound = false,
} = {}) {
    const {data : user, mutate: mutateUser} = useSWR<User>('api/user')
useEffect(()=>{
    if(!redirectTo || !user) return

    if (
        (redirectTo && !reactIfFound && !user?.isLoggedIn) ||
        (reactIfFound && user?.isLoggedIn)
    ) {
        Router.push(redirectTo)
    }
}, [user, reactIfFound, redirectTo])

return {user, mutateUser}
}
