import { useState,useEffect } from "react";
import { useParams,Link } from "react-router-dom";
function Category({ Categoris }) {
  const showMovie = async (categoryId) => {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
    );
    const json = await res.json();
    // const category = json.genres.find(
    //   (value) => value.properties.genre_ids === Number(categoryId),
    // );

    if (!category) {
      throw new Error("No match found.");
    }

    return category;
  };

  const ItemContainer = () => {
    const [category, setCategory] = useState({});
    const { categoryId } = useParams();

    useEffect(() => {
      console.log("params CategoryId container", categoryId);

      showMovie(categoryId)
        .then((category) => {
          setCategory(category);
        })
        .catch((error) => {
          setCategory({}); // maintain state invariant of object
        });
    }, [categoryId]);
  };

  return (
    <>
      <h2>
        <a href="#">{category}</a>
      </h2>

      <h2>
        <Link to={`/items/${category.id}`}>{category}</Link>
      </h2>
      <section>
        <h1>{Categoris.id}</h1>
        <h3>{Categoris.name}</h3>
      </section>
    </>
  );
}
export default Category;
