const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

/* retrieve all categories */
  const allCategories = await Category.findAll({
    include: [Product],
  });
  console.log(allCategories);
/* convert the sql models to plain obj */
  const parsedCategories = allCategories.map((category) =>
  category.get({ plain: true })
  );
/* return the categories as JSON */
  return res.status(200).json(parsedCategories);
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

/* retrieve category with specified id */
  const id = req.params.id;
  const oneCategory = await Category.findByPk(id, {
    include: [product],
  });
/* return 404 response if it doesn't exist */
  if(!oneCategory) {
    return res.status(404).json({message: "This does not exist."});
  }
  console.log(oneCategory, "oneCategory");
/* convert to plain object */
  const parsedOneCategory = oneCategory.get({ plain: true });
/* return as JSON */
  return res.status(200).json(parsedOneCategory);
});


router.post('/', (req, res) => {
  // create a new category

/* extract category name from request body */
  try {
    const categoryName = req.body.category_name;
/* create new category with specific name */
    const newCategory = await Category.create({ category_name: categoryName });
/* convert to plain object */
    const parsedNewCategory = newCategory.get ({ plain: true });
/* return as JSON */
    return res.status(200).json ({ parsedNewCategory });
  } catch (err) {
/* if err while creating category, return 400 err */
    return res.status(400).json({ message: "Category was not created."})
  }
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(res.body, {
      where: {
        id: req.params.id,
      },
    });
/* if no row affected, return 400 err */
    if (!updateCategory[0]) {
      res.status(400).json({ message: "Category was not updated."});
      return;
    }
/* if successful, return as JSON */
    res.status(200).json(updateCategory);
  } catch (err) {
/* if err, return 500 response */
    res.status(500).json(err);
  }
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

 /* update with specified id */ 
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
/* if no rows affected, return a 400 err response */
    if (!updateCategory[0]) {
      res.status(400).json({ message: "Category not updated" });
      return;
    }
/* if update successful, return as JSON */
    res.status(200).json(updateCategory);
  } catch (err) {
/* if err, return  500 err response */
    res.status(500).json(err);
  }
});


module.exports = router;
