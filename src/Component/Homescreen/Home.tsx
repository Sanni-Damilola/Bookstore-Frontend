import React from "react";
import BookList from "../Books/Booklist";

import { Hero } from "../Hero/Hero";

interface Data {
  _id: string;
  author: string;
  authorImage: string;
  category: string;
  coverImage: string;
  title: string;
  views: string[];
}

const Home = () => {
  const [data, setdata] = React.useState<Data[]>([]);

  return (
    <div>
      <Hero setsearchdata={setdata} />
      <BookList searchdata={data} setsearchdata={setdata} />
    </div>
  );
};

export default Home;
