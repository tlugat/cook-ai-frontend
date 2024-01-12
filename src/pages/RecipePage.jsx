import Header from "@components/Header";
import Recipe from "@components/Recipe";
import { useParams } from 'react-router-dom';

const RecipePage = () => {
    const { id } = useParams();

    return (
        <>
            <Header />
            <Recipe recipeId={id} />
        </>
    );
};
export default RecipePage;
