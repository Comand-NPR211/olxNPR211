import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const API_ENDPOINT = 'http://localhost:8082/api/ads';

interface Ad {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
}

function EditAd() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ad, setAd] = useState<Ad | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Загружаем данные объявления по id
    useEffect(() => {
        const fetchAd = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Ad = await response.json();
                setAd(data);
            } catch (err) {
                setError((err as Error).message);
                console.error('Fetch Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAd();
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!ad) return;

        try {
            const response = await fetch(`${API_ENDPOINT}/${id}`, {
                method: 'PUT', // или PATCH, в зависимости от реализации на сервере
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ad),
            });
            if (!response.ok) {
                throw new Error(`Update error! status: ${response.status}`);
            }
            // После успешного обновления переходим на главную страницу или страницу объявления
            navigate('/');
        } catch (err) {
            setError((err as Error).message);
            console.error('Update Error:', err);
        }
    };

    if (loading) {
        return <div className="text-center">Loading ad details...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">Error: {error}</div>;
    }

    if (!ad) {
        return <div className="text-center">No ad found.</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Edit Ad</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={ad.title}
                        onChange={(e) => setAd({ ...ad, title: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={ad.description}
                        onChange={(e) => setAd({ ...ad, description: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price (₴)</label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        value={ad.price}
                        onChange={(e) => setAd({ ...ad, price: Number(e.target.value) })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        className="form-control"
                        value={ad.imageUrl || ''}
                        onChange={(e) => setAd({ ...ad, imageUrl: e.target.value })}
                    />
                </div>
                <div className="text-center">
                    <Button type="submit" className="btn btn-success rounded-lg">
                        Update Ad
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditAd;
