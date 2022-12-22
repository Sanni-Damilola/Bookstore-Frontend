import React from "react";
import styled from "styled-components";
import img from "../Asset/logo.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

interface datas {
  _id: string;
  category: string;
  authorImage: string;
  author: string;
  coverImage: string;
  title: string;
  views: string[];
  summary: string;
}

const Singlebook = () => {
  const [book, setbook] = React.useState<datas>();

  const { id } = useParams();
  const single = async () => {
    await axios
      .get(`https://bookstore-z52r.onrender.com/server/getone/${id}`)
      .then((res) => {
        setbook(res.data.data);
        console.log(res.data);
      });
  };

  // random background-color
  const arr = ["purple", "orange", "green", "blue", "black"];

  React.useEffect(() => {
    single();
  });

  return (
    <Container>
      <Wrap>
        <Autname>{book?.authorImage}</Autname>
        <Name>{book?.author}</Name>
      </Wrap>
      <Authorimage src={book?.coverImage} />
      <Span></Span>
      <Wrapper>
        <P>{book?.summary}</P>
      </Wrapper>
    </Container>
  );
};

export default Singlebook;

const Wrapper = styled.div`
  width: 90%;
  text-align: left;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 17px;
  margin-left: 15px;
  font-size: 20px;
`;

const Span = styled.span`
  font-size: 20px;
  font-weight: 700;
  width: 90%;
`;
const P = styled.p`
  text-align: left;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Container = styled.div`
  height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
`;
const Authorimage = styled.img`
  width: 90%;
  height: 600px;
  background-color: gray;
  object-fit: cover;
  margin-bottom: 20px;
`;
const Autname = styled.div`
  width: 50px;
  height: 50px;
  font-size: 30px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: purple;
  border-radius: 50%;
`;
