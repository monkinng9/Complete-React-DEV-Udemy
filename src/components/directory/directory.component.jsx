import CategoryItem from '../category-item/category-item.component';
import "./directory.styles.scss";

const Directory = ({categories}) => {
  return(
    <div className="directory-container">
      {categories.map((categorie) => (
        <CategoryItem key={categorie.id} category={categorie}/>
      ))}
    </div>
  );
}

export default Directory;