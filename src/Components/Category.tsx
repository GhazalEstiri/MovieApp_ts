import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
function Category() {
  interface Category {
    id: number;
    name: string;
  }
  const [category, setCategory] = useState<Category|undefined>();
  const { categoryId } = useParams();

  const showMovie = async (categoryId: string | undefined) => {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
    );
    const json = await res.json();
    const category = json.genres.find(
      (value: Category) => value.id === Number(categoryId),
    );

    if (!category) {
      throw new Error("No match found.");
    }

    return category;
  };

  useEffect(() => {
    console.log("params CategoryId container", categoryId);

    showMovie(categoryId)
      .then((category) => {
        setCategory(category);
      })
      .catch((error) => {
        setCategory(undefined); // maintain state invariant of object
      });
  }, [categoryId]);

  return (
    <>
      <h2>
        <a href="#">{category?.name}</a>
      </h2>

      <h2>
        <Link to={`/items/${category?.id}`}>{category?.name}</Link>
      </h2>
      <section>
        <h1>{category?.id}</h1>
        <h3>{category?.name}</h3>
      </section>
    </>
  );
}
export default Category;
