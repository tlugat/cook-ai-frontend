import Header from "@components/Header";
import Recipes from "@components/Recipes";
import Searchbar from "@components/Searchbar";

const HomePage = () => {
    return (
        <div>
            <Header/>
            <Searchbar/>
            <Recipes/>
        </div>
    );
};

export default HomePage;
