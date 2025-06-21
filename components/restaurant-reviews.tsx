"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
}

interface RestaurantReviewsProps {
  reviews: Review[]
  restaurantId: string
}

export function RestaurantReviews({ reviews: initialReviews, restaurantId }: RestaurantReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews)
  const [newReview, setNewReview] = useState({ user: "", rating: 0, comment: "" })

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.user && newReview.rating > 0 && newReview.comment) {
      const reviewToAdd: Review = {
        id: `r${Date.now()}`,
        user: newReview.user,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      }
      setReviews((prev) => [reviewToAdd, ...prev])
      setNewReview({ user: "", rating: 0, comment: "" }) // Reset form
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      {/* Review Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label htmlFor="reviewer-name">Your Name</Label>
              <Input
                id="reviewer-name"
                value={newReview.user}
                onChange={(e) => setNewReview((prev) => ({ ...prev, user: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label>Your Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      star <= newReview.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="review-comment">Your Comment</Label>
              <Textarea
                id="review-comment"
                placeholder="Share your experience..."
                value={newReview.comment}
                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="bg-appRed hover:bg-red-600">
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Existing Reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{review.user}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </CardHeader>
              <CardContent>
                <p>{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No reviews yet. Be the first to leave one!</p>
      )}
    </div>
  )
}
