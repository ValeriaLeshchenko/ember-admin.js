import Asset from "appkit/logic/asset";

var ProductImage = Asset.extend({
  type: DS.attr('string', {defaultValue: "Avatar"})
});

ProductImage.FIXTURES = [
  {
    id: 1,
    url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSy98kZOLj0d8am_AWJ8zI9G_8-QQ8-ou-DipH9Tyh6msC-Rpv",
    thumb_url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSy98kZOLj0d8am_AWJ8zI9G_8-QQ8-ou-DipH9Tyh6msC-Rpv"
  },
  {
    id: 2,
    url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSy98kZOLj0d8am_AWJ8zI9G_8-QQ8-ou-DipH9Tyh6msC-Rpv",
    thumb_url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSy98kZOLj0d8am_AWJ8zI9G_8-QQ8-ou-DipH9Tyh6msC-Rpv"
  },
  {
    id: 3,
    url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSy98kZOLj0d8am_AWJ8zI9G_8-QQ8-ou-DipH9Tyh6msC-Rpv",
    thumb_url: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTSy98kZOLj0d8am_AWJ8zI9G_8-QQ8-ou-DipH9Tyh6msC-Rpv"
  }
];

export default ProductImage;