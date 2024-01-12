import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getRecipes } from '@api/api';
import placeHolder from '@public/images/placeHolder.webp';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipesData = await getRecipes();
                setRecipes(recipesData);
            } catch (error) {
                console.error('There was a problem fetching the recipes:', error);
            }
        };

        fetchRecipes();
    }, []);



    return (
        <Container>
            <h1>Les Recette les mieux notés </h1>
            <RecipeList>
                {recipes.map(recipe => (
                    <RecipeContainer key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>
                        <RecipeTitle>{recipe.title}</RecipeTitle>
                            <RecipeImage src={placeHolder} alt="Placeholder" />
                            <RecipeDetails>
                                <SimpleDescription>
                                <p>Difficulty: {recipe.difficulty}</p>
                                <p>Duration: {recipe.duration} minutes</p>
                                </SimpleDescription>
                                <p>Season: {recipe.season}</p>
                            </RecipeDetails>
                        </Link>
                    </RecipeContainer>
                ))}
            </RecipeList>
        </Container>
    );
}

const Container = styled.div`
    margin: 20px;
    font-family: Arial, sans-serif;
    
`;

const RecipeList = styled.div`
    display: flex;
    flex-wrap: wrap; 
    gap: 20px; 
    margin-top:1rem;
`;
const SimpleDescription = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom:1rem;
    `;
const RecipeContainer = styled.div`
    border: 1px solid #e7e7e7;
    background-color:#E2E8F0;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    flex-basis: calc(33.33% - 20px); 
    max-width: calc(33.33% - 20px); 
    text-align: center;
    flex-grow: 1;
    min-width: 300px; 
    max-width: 320px; 

`;

const RecipeImage = styled.img`
    width: 100%;
    max-height: 150px;
    margin: 0 auto; 
    margin-bottom:1rem;
`;

const RecipeDetails = styled.div`
    flex: 1;
    text-align: left;
`;

const RecipeTitle = styled.h2`
    color: #333;
    text-align: left;
    margin-bottom:1rem;
`;

export default Recipes;
