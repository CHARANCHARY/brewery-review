import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import * as Styled from './styledcomponent';

const BreweryDetail = () => {
    const { id } = useParams();
    const [brewery, setBrewery] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 1, description: '' });
    const [loading, setLoading] = useState(true); // Added loading state
    // console.log(typeof(id));
    useEffect(() => {
        const fetchBrewery = async () => {
            try {
                const breweryResponse = await axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`);
                setBrewery(breweryResponse.data);
            } catch (error) {
                console.error('Error fetching brewery:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const reviewsResponse = await axios.get(`https://brewery-review-a3v2.onrender.com/brewery/${id}`);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false); // Update loading state after fetching reviews
            }
        };

        fetchBrewery();
        fetchReviews();
    }, [id]);

    const handleReviewChange = e => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
        if (!token) {
            // Handle case where token is null (user is not authenticated)
            alert('You are not authenticated. Please log in to add a review.');
            // Redirect user to login page or perform appropriate action
            return;
        }
         console.log('Submitting review:', newReview);
         console.log(id);
          const rating = newReview.rating;
          const description = newReview.description;
          const breweryId = id;
        console.log('Brewery ID:', id);
            const reviewResponse = await axios.post(`https://brewery-review-a3v2.onrender.com/brewery/${id}`,
                {
                    breweryId,
                    rating,
                    description,
                }
            ,{
                headers: { Authorization : `Bearer ${token}` }
            });
            console.log('Review response:', reviewResponse);
            if (reviewResponse.status === 200) {
                alert('Review added successfully');
                setNewReview({ rating: 1, description: '' });
                setReviews([...reviews, reviewResponse.data]); // Assuming reviewResponse.data contains the new review object
            } else {
                alert('client side Failed to add your review. Please try again later.');
            }
        } catch (error) {
            console.error('Error adding review:', error);
            alert(' client side Failed to add review. Please try again later.');
        }
    };
    

    return (
        <Styled.Container>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {brewery && (
                        <>
                            <Styled.Title>{brewery.name}</Styled.Title>
                            <Styled.Info>Address: {brewery.street}, {brewery.city}, {brewery.state}</Styled.Info>
                            <Styled.Info>Phone: {brewery.phone}</Styled.Info>
                            <Styled.Info>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></Styled.Info>
                        </>
                    )}
                    <Styled.ReviewSection>
                        <Styled.ReviewTitle>Reviews</Styled.ReviewTitle>
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <Styled.ReviewCard key={review._id}>
                                    <Styled.ReviewRating>Rating: {review.rating}</Styled.ReviewRating>
                                    <Styled.ReviewDescription>{review.description}</Styled.ReviewDescription>
                                    <Styled.ReviewUsername>By: {review.username}</Styled.ReviewUsername>
                                </Styled.ReviewCard>
                            ))
                        ) : (
                            <p>No reviews yet</p>
                        )}
                        <Styled.Form onSubmit={handleReviewSubmit}>
                            <Styled.Label>Rating</Styled.Label>
                            <Styled.Select name="rating" value={newReview.rating} onChange={handleReviewChange}>
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </Styled.Select>
                            <Styled.Label>Description</Styled.Label>
                            <Styled.TextArea name="description" value={newReview.description} onChange={handleReviewChange} />
                            <Styled.Button type="submit">Add Review</Styled.Button>
                        </Styled.Form>
                    </Styled.ReviewSection>
                </>
            )}
        </Styled.Container>
    );
};

export default BreweryDetail;
