import { useState, useEffect, JSX } from 'react';
import Button from '../components/ui/Button';
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = 'http://localhost:8082/api/ads';

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

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Delete error! status: ${response.status}`);
            }
            // Обновляем список объявлений после успешного удаления
            setAds((prevAds) => prevAds.filter(ad => ad.id !== id));
        } catch (err) {
            console.error("Delete Error:", err);
            setError((err as Error).message);
        }
    };

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
                        <div className="card shadow-sm rounded-lg border-0" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                            {ad.imageUrl && (
                                <img
                                    src={ad.imageUrl}
                                    alt={ad.title}
                                    className="card-img-top"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderBottom: '1px solid #e0e0e0'
                                    }}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title" style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    lineHeight: '1.5',
                                    color: '#333',
                                    marginBottom: '10px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {ad.title}
                                </h5>
                                <p className="card-text" style={{
                                    fontSize: '0.9rem',
                                    color: '#777',
                                    lineHeight: '1.5',
                                    height: '2.6rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {ad.description}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="card-text" style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        color: '#00aaff',
                                    }}>
                                        {ad.price} ₴
                                    </p>
                                    <div className="d-flex gap-2">
                                        <Button
                                            onClick={() => navigate(`/${ad.id}/edit`)}
                                            className="btn btn-warning rounded-lg"
                                            style={{ borderRadius: '12px', fontSize: '14px', padding: '8px 16px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(ad.id)}
                                            className="btn btn-danger rounded-lg"
                                            style={{ borderRadius: '12px', fontSize: '14px', padding: '8px 16px' }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
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
