import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const SEE_ME_QUERY = gql`
    query seeMe {
        seeMe {
            username
            avatar
        }
    }
`;

const useUser = () => {
    const hasToken = useReactiveVar(isLoggedInVar);
    const { data } = useQuery(SEE_ME_QUERY, {
        skip: !hasToken
    });
    // console.log(data);
    useEffect(() => {
        if (data?.seeMe === null) {
            // There is a token on localStorage but the token didn't work on the backend
            logUserOut();
        }
    }, [data])
    return null;
}

export default useUser;