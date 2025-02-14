import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = 'http://localhost:8080/api/ads';

interface Ad {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
}

function AdsBoard(): JSX.Element {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await fetch(API_ENDPOINT);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Ad[] = await response.json();
                setAds(data);
            } catch (err) {
                setError((err as Error).message);
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    if (loading) {
        return <div className="text-center">Loading ads...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Ads Board</h1>
            <div className="text-center mb-4">
                <Button
                    onClick={() => navigate("/create-ad")}
                    className="btn btn-primary rounded-lg"
                >
                    Create Ad
                </Button>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {ads.map((ad) => (
                    <div key={ad.id} className="col">
                        <div className="card shadow-sm h-100">
                            {ad.imageUrl && (
                                <img
                                    src={ad.imageUrl}
                                    alt={ad.title}
                                    className="card-img-top border-secondary rounded"
                                    style={{ width: '100%', maxHeight: '350px', height: '400px', objectFit: 'contain' }} // Set max size and preserve aspect ratio
                                />
                            )}
                            <div className="card-body d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h5 className="card-title" style={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        WebkitLineClamp: 3,
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {ad.title}
                                    </h5>
                                    <p className="card-text" style={{ display: "none" }}>
                                        {ad.description}
                                    </p>
                                    <p className="card-text"><strong>Price:</strong> {ad.price} ₴</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdsBoard;
