import { callApi } from './callApi';

/* Auth */
export const login = (credentials) => callApi('/auth/login', { method: 'POST', data: credentials });
export const register = (user) => callApi('/users', { method: 'POST', data: user });
/* Recipes */
export const getRecipeById = (recipeId) => callApi(`/recipes/${recipeId}`, { method: 'GET' });
export const getRecipes = () => callApi('/recipes', { method: 'GET' });
/* search */
export const getSearch = (query) => callApi(`/recipes/search?search=${query}`, { method: 'GET' });
/* rating */
export const getAverageRatingById = (ratingId) => callApi(`/ratings/average/${ratingId}`, { method: 'GET' });
export const addRating = (ratingData) => callApi('/ratings', { method: 'POST', data: ratingData });
/* comment */
export const getRecipeComments = (recipeId) => callApi(`/comments?recipeId=${recipeId}`, { method: 'GET' });
export const addComment = (commentData) => callApi('/comments', { method: 'POST', data: commentData });
