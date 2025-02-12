import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/ui/Button.tsx";

const CreateAdPage = () => {
  const [adData, setAdData] = useState({
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to hold image preview
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/ads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} ${response.statusText}: ${errorData.message || 'Failed to create ad'}`);
      }

      const newAd = await response.json();
      console.log('Ad created:', newAd);

      // Reset the form after successful submission
      setAdData({
        title: '',
        description: '',
        price: 0,
        imageUrl: '',
      });

      // Redirect to a new page, for example, the homepage or a confirmation page
      navigate('/'); // Redirect to home page or other relevant page
    } catch (error) {
      console.error('Error creating ad:', error);
      alert('Error creating ad. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    setAdData({ ...adData, [target.name]: target.value });

    // If the input field is the imageUrl, update the preview
    if (target.name === 'imageUrl') {
      setImagePreview(target.value); // Set image URL for preview
    }
  };

  const handleExit = () => {
    navigate('/'); // Redirect to home or another page (can be customized)
  };

  // Function to check if the URL is a valid image
  const isValidImageUrl = (url: string) => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Create New Ad</h1>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={adData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={adData.description}
            onChange={handleChange}
            required
            rows={6} // This will make the textarea appear larger
          ></textarea>
        </div>


        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={adData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="form-control"
            value={adData.imageUrl}
            onChange={handleChange}
          />
        </div>

        {/* Image Preview Section */}
        {imagePreview && isValidImageUrl(imagePreview) && (
          <div className="mb-3 text-center">
            <h5>Image Preview:</h5>
            <img
              src={imagePreview}
              alt="Preview"
              className="img-fluid rounded border"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="text-center">
          <Button type="submit" variant="primary" className="btn btn-primary rounded-lg me-2">
            Submit Ad
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="btn btn-secondary rounded-lg"
            onClick={handleExit}
          >
            Exit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdPage;
