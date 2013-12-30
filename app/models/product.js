var Product = DS.Model.extend({
  title:       DS.attr('string'),
  description: DS.attr('string'),
  price:       DS.attr('number'),
  image:       DS.belongsTo('productImage'),

  fileuploads: ['image']
});

Product.FIXTURES = [

  {
    id: 1,
    title: "Product1",
    description: "description",
    price: 1.1,
    image: 1
  },

  {
    id: 2,
    title: "Product2",
    description: "description",
    price: 1.1,
    image: 2
  },

  {
    id: 3,
    title: "Product3",
    description: "description",
    price: 1.1,
    image: 3
  }
];

export default Product;