import TomatoImage from "../assets/images/tomato.png";
import EggplantImage from "../assets/images/eggplant.png";
import PotatoImage from "../assets/images/potato.png";
import CarrotImage from "../assets/images/carrot.png";
import OnionImage from "../assets/images/onion.png";
import CabbageImage from "../assets/images/cabbage.png";

export const categoriesData = [
  {
    id: 1,
    name: "Vegetables",
    img: require("../assets/images/vegetables.jpg"),
    description: "Fresh farm vegetables, straight to you!",
    // route: "/vegetable",
    // products: [
    //   {
    //     id: "1",
    //     name: "Tomato",
    //     quantity: "20kg",
    //     price: 24,
    //     oldPrice: 30,
    //     discount: "20%",
    //     rating: 4.3,
    //     image: TomatoImage,
    //   },
    //   {
    //     id: "2",
    //     name: "Eggplant",
    //     quantity: "30kg",
    //     price: 40,
    //     oldPrice: 45,
    //     discount: "11%",
    //     rating: 4.2,
    //     image: EggplantImage,
    //   },
    //   {
    //     id: "3",
    //     name: "Potato",
    //     quantity: "32kg",
    //     price: 62,
    //     oldPrice: 70,
    //     discount: "12%",
    //     rating: 4.1,
    //     image: PotatoImage,
    //   },
    //   {
    //     id: "4",
    //     name: "Carrot",
    //     quantity: "25kg",
    //     price: 52,
    //     oldPrice: 55,
    //     discount: "5%",
    //     rating: 4.8,
    //     image: CarrotImage,
    //   },
    //   {
    //     id: "5",
    //     name: "Onion",
    //     quantity: "40kg",
    //     price: 65,
    //     oldPrice: 70,
    //     discount: "7%",
    //     rating: 4.5,
    //     image: OnionImage,
    //   },
    //   {
    //     id: "6",
    //     name: "Cabbage",
    //     quantity: "22kg",
    //     price: 32,
    //     oldPrice: 35,
    //     discount: "8%",
    //     rating: 4.7,
    //     image: CabbageImage,
    //   },
    // ],
  },
  {
    id: 2,
    name: "Millets",
    img: require("../assets/images/millets.jpeg"),
    description: "Nutritious farm-fresh millets, straight to you!",
    // route: "/millets",
  },
  {
    id: 3,
    name: "Fruits",
    img: require("../assets/images/fruits.jpeg"),
    description: "Handpicked fresh fruits for a healthy life!",
    // route: "/fruits",
  },
  {
    id: 4,
    name: "Flowers",
    img: require("../assets/images/flowers.png"),
    description: "Beautiful and fresh flowers for all occasions!",
    // route: "/flowers",
  },
  {
    id: 5,
    name: "Green Leafy Veg",
    img: require("../assets/images/leafy.jpeg"),
    description: "Organic green leafy vegetables!",
    // route: "/leafy",
  },
  {
    id: 6,
    name: "Coconuts",
    img: require("../assets/images/coconut.png"),
    description: "Fresh and natural coconuts!",
    // route: "/coconuts",
  },
  {
    id: 7,
    name: "Spices",
    img: require("../assets/images/spices.jpeg"),
    description: "Authentic spices for a flavorful meal!",
    // route: "/spices",
  },
  {
    id: 8,
    name: "Pulses",
    img: require("../assets/images/pulses.jpg"),
    description: "Healthy and nutritious pulses!",
    // route: "/pulses",
  },
];

export const vegetables = [
  {
    id: "1",
    name: "Tomato",
    quantity: "20kg",
    price: 24,
    oldPrice: 30,
    discount: "20%",
    rating: 4.3,
    image: TomatoImage,
  },
  {
    id: "2",
    name: "Eggplant",
    quantity: "30kg",
    price: 40,
    oldPrice: 45,
    discount: "11%",
    rating: 4.2,
    image: EggplantImage,
  },
  {
    id: "3",
    name: "Potato",
    quantity: "32kg",
    price: 62,
    oldPrice: 70,
    discount: "12%",
    rating: 4.1,
    image: PotatoImage,
  },
  {
    id: "4",
    name: "Carrot",
    quantity: "25kg",
    price: 52,
    oldPrice: 55,
    discount: "5%",
    rating: 4.8,
    image: CarrotImage,
  },
  {
    id: "5",
    name: "Onion",
    quantity: "40kg",
    price: 65,
    oldPrice: 70,
    discount: "7%",
    rating: 4.5,
    image: OnionImage,
  },
  {
    id: "6",
    name: "Cabbage",
    quantity: "22kg",
    price: 32,
    oldPrice: 35,
    discount: "8%",
    rating: 4.7,
    image: CabbageImage,
  },
];

//  import FingerMilletImage from '../assets/images/finger.png';
//  import FoxtailMilletImage from '../assets/images/foxtail.png';
//  import KodoMilletImage from '../assets/images/kodo.png';
//  import PearlMilletImage from '../assets/images/pearl.png';
//  import BarnyardMilletImage from '../assets/images/barnyard.png';

//  export const millets = [
//      { id: '7', name: 'Finger Millet', quantity: '15kg', price: 50, oldPrice: 60, discount: '17%', rating: 4.6, image: FingerMilletImage },
//      { id: '8', name: 'Foxtail Millet', quantity: '18kg', price: 55, oldPrice: 65, discount: '15%', rating: 4.4, image: FoxtailMilletImage },
//      { id: '9', name: 'Kodo Millet', quantity: '12kg', price: 45, oldPrice: 55, discount: '18%', rating: 4.5, image: KodoMilletImage },
//      { id: '10', name: 'Pearl Millet', quantity: '20kg', price: 48, oldPrice: 58, discount: '17%', rating: 4.3, image: PearlMilletImage },
//      { id: '11', name: 'Barnyard Millet', quantity: '14kg', price: 52, oldPrice: 62, discount: '16%', rating: 4.7, image: BarnyardMilletImage },
//  ];
export const productData = [
  {
    id: 1,
    name: "Tomato",
    category: "Desi Varieties",
    marketPrice: 30,
    discount: 20,
    image: require("../assets/images/tomato.png"),
    description:
      "The tomato is a nutrient-rich fruit used as a vegetable, packed with vitamins and antioxidants. It’s versatile, eaten raw or cooked in various dishes worldwide.",
    deliveryLocation: "639110, Kulithalai",
    rating: 4.3,
    reviews: 1,
  },
  {
    id: 2,
    name: "Potato",
    category: "Organic",
    marketPrice: 40,
    discount: 15,
    image: require("../assets/images/potato.png"),
    description:
      "Potatoes are a staple in many diets worldwide, rich in carbohydrates and essential nutrients. They can be boiled, fried, or mashed for various delicious dishes.",
    deliveryLocation: "639110, Kulithalai",
    rating: 4.5,
    reviews: 2,
  },
  {
    id: 3,
    name: "Carrot",
    category: "Ooty Carrots",
    marketPrice: 50,
    discount: 10,
    image: require("../assets/images/carrot.png"),
    description:
      "Carrots are rich in beta-carotene, vitamins, and fiber. They are excellent for vision and overall health. Enjoy them raw, steamed, or in soups and salads.",
    deliveryLocation: "639110, Kulithalai",
    rating: 4.7,
    reviews: 2,
  },
  {
    id: 4,
    name: "Onion",
    category: "Red Onion",
    marketPrice: 45,
    discount: 12,
    image: require("../assets/images/onion.png"),
    description:
      "Red onions add a flavorful punch to any dish. Packed with antioxidants, they are great for health and enhance the taste of curries, salads, and more.",
    deliveryLocation: "639110, Kulithalai",
    rating: 4.4,
    reviews: 2,
  },
];

export const farmerData = [
  {
    id: 1,
    name: "Ramesh Kumar",
    location: "Thanjavur, Tamil Nadu",
    experience: "10 years",
    contact: "9876543210",
    products: [
      {
        id: 101,
        name: "Tomato",
        category: "Desi Varieties",
        marketPrice: 30,
        discount: 20,
        price: 24, // Price after discount
        quantity: "1 kg",
        image: require("../assets/images/tomato.png"),
        description:
          "The tomato is a nutrient-rich fruit used as a vegetable, packed with vitamins and antioxidants. It’s versatile, eaten raw or cooked in various dishes worldwide.",
        rating: 4.3,
      },
      {
        id: 102,
        name: "Potato",
        category: "Organic",
        marketPrice: 40,
        discount: 15,
        price: 34, // Price after discount
        quantity: "1 kg",
        image: require("../assets/images/potato.png"),
        description:
          "Potatoes are a staple in many diets worldwide, rich in carbohydrates and essential nutrients. They can be boiled, fried, or mashed for various delicious dishes.",
        rating: 4.5,
      },
    ],
  },
  {
    id: 2,
    name: "Lakshmi Narayanan",
    location: "Salem, Tamil Nadu",
    experience: "15 years",
    contact: "9876543211",
    products: [
      {
        id: 103,
        name: "Carrot",
        category: "Ooty Carrots",
        marketPrice: 50,
        discount: 10,
        price: 45, // Price after discount
        quantity: "1 kg",
        image: require("../assets/images/carrot.png"),
        description:
          "Carrots are rich in beta-carotene, vitamins, and fiber. They are excellent for vision and overall health. Enjoy them raw, steamed, or in soups and salads.",
        rating: 4.7,
      },
      {
        id: 104,
        name: "Onion",
        category: "Red Onion",
        marketPrice: 45,
        discount: 12,
        price: 39.6, // Price after discount
        quantity: "1 kg",
        image: require("../assets/images/onion.png"),
        description:
          "Red onions add a flavorful punch to any dish. Packed with antioxidants, they are great for health and enhance the taste of curries, salads, and more.",
        rating: 4.4,
      },
    ],
  },
  {
    id: 3,
    name: "Sundar Rajan",
    location: "Madurai, Tamil Nadu",
    experience: "8 years",
    contact: "9876543212",
    products: [
      {
        id: 105,
        name: "Cabbage",
        category: "Green Cabbage",
        marketPrice: 35,
        discount: 10,
        price: 31.5, // Price after discount
        quantity: "1 kg",
        image: require("../assets/images/cabbage.png"),
        description:
          "Cabbage is a leafy green vegetable packed with fiber and essential vitamins. It is commonly used in salads, stir-fries, and curries.",
        rating: 4.6,
      },
      {
        id: 106,
        name: "Brinjal",
        category: "Purple Brinjal",
        marketPrice: 25,
        discount: 5,
        price: 23.75, // Price after discount
        quantity: "1 kg",
        image: require("../assets/images/eggplant.png"),
        description:
          "Brinjal (Eggplant) is rich in antioxidants and fiber. It is widely used in Indian curries, stir-fries, and roasted dishes.",
        rating: 4.2,
      },
    ],
  },
];
