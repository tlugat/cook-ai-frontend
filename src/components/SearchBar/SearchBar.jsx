import { useState } from 'react';
import { getSearch } from '@api/api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import placeHolder from '@public/images/placeHolder.webp';

const Searchbar = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getSearch(query);
            setRecipes(response);
            setSearchSubmitted(true);
        } catch (err) {
            setError(err.message || 'Error occurred during search');
        }
        setLoading(false);
    };

    return (
        <Container>
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes"
            />
            <Button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </Button>
            {error && <Error>Error: {error}</Error>}
            {searchSubmitted && <h1>Les recettes recherchées</h1>}
            <RecipeList>
                {recipes.map((recipe, index) => (
                    <RecipeContainer key={index}>
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
};

const Container = styled.div`
    margin: 20px;
    font-family: Arial, sans-serif;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top:3rem;

`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover {
        background-color: #0056b3;
    }
`;

const Error = styled.div`
    color: red;
    margin: 10px;
`;

const RecipeList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 1rem;
`;

const SimpleDescription = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const RecipeContainer = styled.div`
    border: 1px solid #e7e7e7;
    background-color: #E2E8F0;
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
    margin-bottom: 1rem;
`;

const RecipeDetails = styled.div`
    flex: 1;
    text-align: left;
`;

const RecipeTitle = styled.h2`
    color: #333;
    text-align: left;
    margin-bottom: 1rem;
`;

export default Searchbar;