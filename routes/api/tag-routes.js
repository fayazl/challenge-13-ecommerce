const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  console.log('==============')
    Tag.findAll({
      include: [
        {
          model: Product,
          as:'tag_products',
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })
      .then(dbTagData => res.json(dbTagData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  console.log('==============')
    Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          as:'tag_products',
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })
    .then(dbTagData => {
      if(!dbTagData) {
        res.status(404).json({message: 'No tag found with this id'})
        return;
      }
      res.json(dbTagData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  
    console.log('id found')
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  console.log('==============')
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });  
  // create a new tag
});

router.put('/:id', (req, res) => {
  console.log('==============')
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
    )
      .then(dbTagData => {
        if (!dbTagData) {
          res.status(404).json({message: 'No tag found with this id'});
          return;
        }
        res.json(dbTagData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
