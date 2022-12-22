import React, { useState } from "react";
import styled from "styled-components";
import { BsImageFill } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";

const UploadPage = () => {
  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");
  const [show, setShow] = React.useState(false);

  const ImageOnchange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    console.log(url);
  };

  const UploadEbook = async () => {
    setShow(true);
    const formdata = new FormData();

    formdata.append("title", title);
    formdata.append("summary", summary);
    formdata.append("category", category);
    formdata.append("author", author);
    formdata.append("coverImage", image);

    await axios
      .post("https://bookstore-z52r.onrender.com/server/newBook", formdata)
      .then((res) => {
        console.log(res);
        setShow(false);
      })
      .catch(() => {
        setShow(false);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Card>
          <Circle>
            <Img src={previewImage} />
          </Circle>

          <Input onChange={ImageOnchange} id="pix" type="file" />
          <Button htmlFor="pix">Upload Cover Image</Button>

          <Inp
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter Title"
          />
          <TexArea
            onChange={(e) => {
              setSummary(e.target.value);
            }}
            placeholder="Summary..."
          />
          <Inp
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            placeholder="Enter Author name"
          />
          <Select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option>select a category</option>
            <option value="comedy">Comedy</option>
            <option value="music">Music</option>
            <option value="romance">Romance</option>
          </Select>

          {title !== "" &&
          category !== "" &&
          author !== "" &&
          summary !== "" &&
          image !== "" ? (
            <Link to={"/"}>
              <Button2 onClick={UploadEbook} cursor="pointer" bg="red">
                Submit
              </Button2>
            </Link>
          ) : (
            <Button2 cursor="not-allowed" bg="silver">
              Submit
            </Button2>
          )}
        </Card>
      </Wrapper>
    </Container>
  );
};

export default UploadPage;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Button2 = styled.button<{ bg: string; cursor: string }>`
  height: 40px;
  width: 150px;
  background-color: ${(props) => props.bg};
  color: white;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: all 350ms;
  cursor: ${(props) => props.cursor};
  margin-top: 10px;
  :hover {
    transform: scale(0.95);
  }
  @media screen and (max-width: 500px) {
    width: 120px;
  }
`;

const Select = styled.select`
  width: 370px;
  height: 30px;
  border-radius: 3px;
  border: 0.7px solid silver;
  outline-color: #f8cbe0;
  padding-left: 10px;
`;

const TexArea = styled.textarea`
  width: 350px;
  height: 70px;
  border-radius: 3px;
  border: 0.7px solid silver;
  outline-color: #f8cbe0;
  padding-left: 10px;
  resize: none;
`;

const Inp = styled.input`
  margin: 10px;
  width: 350px;
  height: 30px;
  border-radius: 3px;
  border: 0.7px solid silver;
  outline-color: #f8cbe0;
  padding-left: 10px;
`;

const Input = styled.input`
  display: none;
`;
const Button = styled.label`
  height: 40px;
  width: 200px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: all 350ms;
  margin-top: 10px;
  cursor: pointer;
  :hover {
    transform: scale(0.98);
  }
`;

const Circle = styled.div`
  height: 150px;
  width: 250px;
  border-radius: 5px;
  /* border-radius: 50%; */
  background-color: #e6e4e4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  flex-direction: column;
  font-size: 30px;
  span {
    font-size: 12px;
  }
`;

const Card = styled.div`
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  width: 600px;
  /* height: 300px; */
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
