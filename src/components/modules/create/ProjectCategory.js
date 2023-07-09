import { BsCheck } from 'react-icons/bs';

const categoriesList = [
  { categoryId: '60d76ecf5974447cae8ab4ae', categoryName: 'Infrastructure' },
  { categoryId: '60d76edf597444bee98ab4af', categoryName: 'Databases' },
  { categoryId: '60d76ee45974441d808ab4b0', categoryName: 'Data Science' },
  { categoryId: '60d76eeb597444b9da8ab4b1', categoryName: 'Frontend' },
  { categoryId: '60d76ef0597444095b8ab4b2', categoryName: 'Backend' },
  { categoryId: '60d76ef659744422d68ab4b3', categoryName: 'Fullstack' },
  { categoryId: '60d76ef95974443f628ab4b4', categoryName: 'Cloud' },
  { categoryId: '60d76f03597444144e8ab4b6', categoryName: 'Machine Learning' },
  { categoryId: '60d76f0e5974448f038ab4b7', categoryName: 'Open Source' },
  { categoryId: '60d76efd59744479fa8ab4b5', categoryName: 'AI' },
  { categoryId: '60d76f1759744461468ab4b8', categoryName: 'Development Tools' },
  { categoryId: '60d76f1c5974442f4b8ab4b9', categoryName: 'Components' },
  { categoryId: '60d76f21597444db6c8ab4ba', categoryName: 'Libraries' },
  { categoryId: '60d76f2559744477168ab4bb', categoryName: 'Games' },
  { categoryId: '60d76f295974444b818ab4bc', categoryName: 'Apps' },
  { categoryId: '60d773ea25c28f62309b652c', categoryName: 'Automation' },
  { categoryId: '60d773ec25c28f0eb69b652d', categoryName: 'DevOps' },
  { categoryId: '60d774b025c28f02759b652e', categoryName: 'Security' },
];

const ProjectCategory = ({ postCategories, setPostCategories }) => {
  const selectCategory = (id, name) => {
    setPostCategories({ ...postCategories, [id]: name });
  };

  const removeCategory = (id) => {
    if (postCategories[id]) {
      delete postCategories[id];
    }
    setPostCategories({ ...postCategories });
    setPostCategories(setPostCategories);
  };

  const CategoryPill = ({ category }) => {
    let postCategoriesArray = Object.values(postCategories);
    const categorySelected = postCategoriesArray?.find(function (item) {
      return category.categoryName === item;
    });

    return (
      <>
        {categorySelected ? (
          <button
            className="btn btn-pill relative"
            onClick={() =>
              removeCategory(category.categoryId, category.categoryName)
            }
          >
            <span>{category.categoryName}</span>

            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 ring-2 ring-white">
              <BsCheck className="h-4 w-4 text-white" />
            </span>
          </button>
        ) : (
          <button
            className="btn btn-pill relative"
            onClick={() =>
              selectCategory(category.categoryId, category.categoryName)
            }
          >
            <span>{category.categoryName}</span>
          </button>
        )}
      </>
    );
  };

  return (
    <div className="space-y-2">
      <label className="label">Categorize your project</label>

      <div className="flex flex-wrap gap-2">
        {categoriesList.map((category) => (
          <CategoryPill category={category} key={category.categoryId} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCategory;
