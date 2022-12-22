import React from "react";
import styled from "styled-components";
import img from "../Asset/logo.jpg";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios"

const Header = () => {

  const fetch = async () => {
    await axios.get(`http://localhost:2001/api`)
  }

  return (
    <Container>
      <Text to={"/"}>
        <Logo src={img} />
        <span>bookstore</span>
      </Text>
      <Buttonwrap>
        <Search>
          <BiSearch />
        </Search>
        <Link to={"/uploads"}>
          <Button>uploads books</Button>
        </Link>
      </Buttonwrap>
    </Container>
  );
};

export default Header;

const Text = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 50px;
  text-decoration: none;
  @media screen and (max-width: 500px) {
    margin-left: 0;
  }
  span {
    margin-left: 10px;
    font-weight: bold;
    font-size: 25px;
    font-family: sans-serif;
    text-transform: capitalize;
    cursor: pointer;
    color: black;

    @media screen and (max-width: 500px) {
      font-size: 15px;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 80px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  @media screen and (max-width: 500px) {
    justify-content: space-around;
  }
`;
const Logo = styled.img`
  height: 35px;
  cursor: pointer;
  object-fit: cover;

  @media screen and (max-width: 500px) {
    height: 25px;
  }
`;
const Buttonwrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;

  @media screen and (max-width: 500px) {
    margin-right: 0;
  }
`;
const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  margin-right: 10px;
  cursor: pointer;
  color: silver;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const Button = styled.button`
  width: 150px;
  border: none;
  border-radius: 5px;
  color: white;
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 500;
  transition: all 360ms;

  @media screen and (max-width: 500px) {
    width: 120px;
    font-size: 14px;
  }

  cursor: pointer;
  :hover {
    background-color: #e73b7d;
  }
  height: 40px;
  background-color: #ea4c89;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
