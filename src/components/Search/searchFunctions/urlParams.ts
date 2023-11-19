'use client'

import {MediaSeason} from "~/gql/types.g";
import {useEffect, useMemo} from "react";
import {useRouter} from "next/router";
import {ParsedUrlQueryInput} from "querystring";

interface Props {
    queryParams: string | ParsedUrlQueryInput | null | undefined
}
export const urlParams = (queryParams: Props): void => {

    const {push, query, pathname} = useRouter()

    useEffect(() => {
        if (query.sort === undefined) {
        push({
            pathname: 'search/anime/',
            query: queryParams,
        });
    } else {
        push({
            pathname,
            query: queryParams,
        });
    }
    }, [push, query.sort, queryParams, pathname])
}