"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import qs from "query-string";
import Input from "./Input";

interface  SearchInputProps {

};

export const SearchInput: FC<SearchInputProps> = (props) => {


    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        });

        router.push(url);

    }, [router, debouncedValue]);

    return (
        <Input 
            placeholder="What do you want to listen to ?"
            value={  value }
            onChange={ (e) => setValue(e.target.value) }
        />
    );
}
