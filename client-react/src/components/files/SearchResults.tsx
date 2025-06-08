import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Image } from '../../Types';
import axiosInstance from '../axiosInstance';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = searchParams.get('query');

    useEffect(() => {
        if (query)
            fetchResults();
    }, [query]);

    const fetchResults = async () => {
        try {
            const response = await axiosInstance.get(`/Image/search?query=${encodeURIComponent(query || '')}`);
            setResults(response.data);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>תוצאות חיפוש עבור: {query}</h2>
            {loading ? (
                <p>טוען...</p>
            ) : results.length === 0 ? (
                <p>לא נמצאו תוצאות</p>
            ) : (
                <ul>
                    {results.map((img : Image) => (
                        <li key={img.id}>
                            <img src={img.s3URL} alt={img.name} width={200} />
                            <p>{img.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;
