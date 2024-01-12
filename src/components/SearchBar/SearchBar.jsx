import { useState } from 'react';
import { getSearch } from '@api/api';
import styled from 'styled-components';

const Searchbar = () => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getSearch(query);
            console.log(response);
            setRecipes(response.data || []);
            setModalOpen(true); 
        } catch (err) {
            setError(err.message || 'Error occurred during search');
        }
        setLoading(false);
    };

    const closeModal = () => {
        setModalOpen(false);
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
            <RecipeList>
                {recipes.map((recipe, index) => (
                    <RecipeItem key={index}>{recipe.title}</RecipeItem>
                ))}
            </RecipeList>
            <Modal isOpen={modalOpen}>
                <ModalContent>
                    <CloseButton onClick={closeModal}>&times;</CloseButton>
                    {recipes.map((recipe, index) => (
                        <div key={index}>
                            <RecipeItem>{recipe.title}</RecipeItem>
                            <p>{recipe.description}</p>
                        </div>
                    ))}
                </ModalContent>
            </Modal>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:4rem;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const RecipeItem = styled.div`
  margin: 10px;
`;

const Modal = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width:50%;
  height:50%;

  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
export default Searchbar;
