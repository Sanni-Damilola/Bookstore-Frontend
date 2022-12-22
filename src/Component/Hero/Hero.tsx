import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import { useParams } from "react-router-dom";

interface data {
  _id: string;
  category: string;
  authorImage: string;
  author: string;
  coverImage: string;
  title: string;
  views: string[];
}

interface category {
  category: string;
}

interface Props {
  setsearchdata: React.Dispatch<React.SetStateAction<data[]>>;
}

export const Hero: React.FC<Props> = ({ setsearchdata }) => {
  const [input, setinput] = React.useState("");
  const inputroute = async () => {
    await axios
      .get(`https://bookstore-z52r.onrender.com/server/search?author=${input}`)
      .then((res) => {
        setsearchdata(res.data.data);
      });
  };

  // category
  const [categorydata, setcategory] = React.useState<category[]>([]);
  const category = async () => {
    await axios
      .get(`https://bookstore-z52r.onrender.com/server/getall`)
      .then((res) => {
        setcategory(res.data.data);
      });
  };

  // slider button
  const [button, setbutton] = React.useState("");
  const getvalue = async () => {
    await axios
      .get(`https://bookstore-z52r.onrender.com/server/search?category=Romance`)
      .then((res) => {
        console.log(res.data.data);
        setbutton(res.data.data);
      });
  };

  // const check = () => {};

  React.useEffect(() => {
    category();
    getvalue();
  });

  return (
    <Container>
      <Video
        loop
        muted
        autoPlay
        playsInline
        src="https://cdn.dribbble.com/uploads/39417/original/49dbf46eae15d227fc95a69cee31251e.mp4?1657824906"
      />
      <Content>
        <Buttonwrap>
          <>
            {categorydata.map((category) => (
              <Button onClick={getvalue} bg="" color="">
                {category.category}
              </Button>
            ))}
          </>
        </Buttonwrap>
        <h2>
          Explore the world’s leading Books <br /> and Autors
        </h2>
        <p>
          Millions of designers and agencies around the world showcase their
          portfolio work on Dribbble - the home to the world’s best design and
          creative professionals.
        </p>
        <Inputwrapper>
          <Icon>
            <BiSearch />
          </Icon>
          <Input
            onKeyPress={inputroute}
            onChange={(e) => {
              setinput(e.target.value);
            }}
            placeholder="Search By Author Name"
          />
        </Inputwrapper>
      </Content>
    </Container>
  );
};

const Button = styled.button<{ bg: string; color: string }>`
  border: none;
  padding: 15px 20px;
  margin: 8px;
  border-radius: 50px;
  color: ${({ color }) => (color ? "black" : "white")};
  background-color: ${({ bg }) => (bg ? "white" : "rgba(0, 0, 0, 0.6)")};

  text-transform: capitalize;
  font-size: 18px;
  font-weight: 500;
  transition: all 360ms;
  margin-top: 50px;
  @media screen and (max-width: 500px) {
    font-size: 14px;
    padding: 15px 20px;
    display: flex;
  }

  cursor: pointer;
  :hover {
    background-color: white;
    color: black;
    transform: scale(0.9);
    font-weight: 500;
  }
  background-color: ${({ bg }) => (bg ? "white" : "rgba(0, 0, 0, 0.6)")};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const Inputwrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  height: 55px;
  width: 350px;
  border-radius: 25px;

  @media screen and (max-width: 500px) {
    width: 280px;
  }
`;
const Input = styled.input`
  border: 0;
  outline: none;
  background-color: transparent;
  flex: 1;
  font-size: 20px;

  @media screen and (max-width: 500px) {
    font-size: 17px;
  }
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  font-size: 25px;
  cursor: pointer;
  color: #000000bc;
  margin-right: 10px;
`;

const Buttonwrap = styled.div`
  overflow-x: scroll;
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  ::-webkit-scrollbar {
    width: 0;
  }

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const Content = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;

  h2 {
    font-size: 30px;
    margin: 0;
    margin-top: 30px;
  }
  p {
    width: 600px;

    @media screen and (max-width: 600px) {
      width: 300px;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 600px;

  ::before {
    content: "";
    background-color: black;
    opacity: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
