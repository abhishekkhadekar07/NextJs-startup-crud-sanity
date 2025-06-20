import React from 'react'
import Form from "next/form"
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'

const SearchForm = ({ query }: { query?: string }) => {

    return (
        <>
            <Form action='/' scroll={false} className='search-form'>
                <input
                    name="query"
                    defaultValue={query}
                    className='search-input'
                    placeholder='Search Startups'
                />
                <div className='flex gap-2'>
                    {query && <SearchFormReset />}
                    <button type='submit' className="search-btn text-white">
                        <Search className='size-5' />
                    </button>
                </div>

            </Form>

        </>
    )
}

export default SearchForm
// concept of
// const object1 = {
//   a: "some string",
//   b: 42,
// };
// const Obj1 = Object.entries(object1);
// console.log("first action",Obj1);
// const Obj2 = Object.fromEntries(Obj1)
// console.log("second action",Obj2);
// for (const [key, value] of Object.entries(object1)) {
//   console.log(`${key}: ${value}`);
// }