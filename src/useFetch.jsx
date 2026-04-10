import { useState, useEffect } from "react";

function useFetch(url) {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {

            fetch(url, {signal: abortCont.signal})
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setBlogs(data); 
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                    }
                    else{
                        setIsPending(false); 
                        setError(err.message);
                    }
                })
        },1000);
        return () => abortCont.abort();
    },[url]);
    return { blogs, isPending, error };
}
export default useFetch;