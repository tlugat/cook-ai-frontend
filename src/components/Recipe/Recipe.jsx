import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRecipeById, getAverageRatingById, addRating, getRecipeComments, addComment } from '@api/api';
import placeHolder from '@public/images/placeHolder.webp';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const { recipeId } = useParams();
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const selectedRecipe = await getRecipeById(recipeId);
        setRecipe(selectedRecipe);
      } catch (error) {
        console.error('There was a problem fetching the recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  useEffect(() => {
    const fetchRecipeRating = async () => {
      try {
        const averageRating = await getAverageRatingById(recipeId); 
        setRating(averageRating); 
      } catch (error) {
        console.error('There was a problem fetching the rating:', error);
      }
    };

    fetchRecipeRating();
  }, [recipeId]);

  useEffect(() => {
    const fetchComments = async () => {
        try {
            const comments = await getRecipeComments(recipeId);
            setComments(comments);
        } catch (error) {
            console.error('There was a problem fetching the comments:', error);
        }
    };

    fetchComments();
  }, [recipeId]);

  const handleRatingChange = (event) => {
    setUserRating(event.target.value);
  };

  const submitRating = async () => {
    try {
      const payload = {
        rating: parseFloat(userRating),
        recipeId,
      };
  
      console.log('Payload sent during vote:', payload);
      await addRating(payload);
    } catch (error) {
      console.error('There was a problem submitting the rating:', error);
    }
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const submitNewComment = async () => {
    try {
      await addComment({ content: newComment, recipeId });
      setNewComment("");
      const updatedComments = await getRecipeComments(recipeId);
      setComments(updatedComments);
    } catch (error) {
      console.error('There was a problem submitting the comment:', error);
    }
  };

  const renderIngredients = (ingredients) => {
    return ingredients.map((ingredient, index) => (
      <ListItem key={index}>{`${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}`}</ListItem>
    ));
  };

  const renderSteps = (steps) => {
    return steps.map((step, index) => (
      <ListItem key={index}>{step.content}</ListItem>
    ));
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
      <Container>
          <h1>Recipe Details</h1>
          <RecipeCard>
              <RecipeImage src={placeHolder} alt="Placeholder" />
              <RecipeDetails>
                  <RecipeTitle>{recipe.title}</RecipeTitle>
                  <RecipeDescription>{recipe.description}</RecipeDescription>
                  <p>Difficulty: {recipe.difficulty}</p>
                  <p>Duration: {recipe.duration} minutes</p>
                  <p>Season: {recipe.season}</p>
                  <h3>Ingredients</h3>
                  <List>{renderIngredients(JSON.parse(recipe.ingredients))}</List>
                  <h3>Steps</h3>
                  <List>{renderSteps(JSON.parse(recipe.steps))}</List>
                  <h3>Rating</h3>
                  <List>
                      <p>Average Rating: {rating !== null ? rating : 'N/A'}</p>
                  </List>
                  <select value={userRating} onChange={handleRatingChange}>
                      <option value={0}>Select Rating</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                  </select>
                  <button onClick={submitRating}>Submit Rating</button>
              </RecipeDetails>
          </RecipeCard>
          <CommentsSection>
              <h1>Comments:</h1>
              <CommentList>
                  {comments.map((comment) => (
                      <CommentListItem key={comment.id}>{comment.content}</CommentListItem>
                  ))}
              </CommentList>
              <CommentInput
                  placeholder="Add a comment"
                  type="text"
                  value={newComment}
                  onChange={handleNewCommentChange}
              />
              <SubmitCommentButton onClick={submitNewComment}>Add Comment</SubmitCommentButton>
          </CommentsSection>
      </Container>
  );
};

Recipe.propTypes = {
  recipeId: PropTypes.string, 
};

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  font-family: Arial, sans-serif;
  margin-top:2rem;
`;

const RecipeCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  cursor: pointer;
  overflow: hidden;
  margin-top:1rem;
`;

const RecipeImage = styled.img`
  width: 100%;
  max-height: 150px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: cover;
`;

const RecipeDetails = styled.div`
  padding: 20px;
  color: black;
`;

const RecipeTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const RecipeDescription = styled.p`
  font-size: 16px;
  color: #333;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 16px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
`;
const CommentsSection = styled.div`
  margin-top: 20px;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
`;

const CommentListItem = styled.li`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitCommentButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkblue;
  }
`;
export default Recipe;
