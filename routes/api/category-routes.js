const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  console.log('==============')
  Category.findAll({
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  console.log('==============')
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
    .then(dbCategoryData => {
      if(!dbCategoryData) {
        res.status(404).json({message: 'No category found with this id'})
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  console.log('==============')
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // create a new category
});

router.put('/:id', (req, res) => {
  console.log('==============')
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
    )
      .then(dbCategoryData => {
        if (!dbCategoryData) {
          res.status(404).json({message: 'No category found with this id'});
          return;
        }
        res.json(dbCategoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  console.log('==============')
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if(!dbCategoryData) {
        res.status(404).json({ message: "No category found with this id"});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
  // delete a category by its `id` value
});

module.exports = router;
