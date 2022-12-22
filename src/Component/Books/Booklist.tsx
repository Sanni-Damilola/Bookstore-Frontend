import React from "react";
import styled from "styled-components";
import pic from "../Asset/img.webp";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";

interface data {
  _id: string;
  category: string;
  authorImage: string;
  author: string;
  coverImage: string;
  title: string;
  views: string[];
}

interface Props {
  searchdata: data[];
  setsearchdata: React.Dispatch<React.SetStateAction<data[]>>;
}

const BookList: React.FC<Props> = ({ searchdata, setsearchdata }) => {
  const [books, setbooks] = React.useState<data[]>([]);

  const [loading, setloading] = React.useState<boolean>(true);
  // get all data
  const getalldata = async () => {
    await axios
      .get("https://bookstore-z52r.onrender.com/server/getall")
      .then((res) => {
        setloading(false);
        setbooks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // views
  const [ip, setip] = React.useState("");
  const getip = async () => {
    await axios
      .get(
        "https://geolocation-db.com/json/67273a00-5c4b-11ed-9204-d161c2da74ce"
      )
      .then((res) => {
        setip(res.data.Ipv4);
      });
  };

  const useip = async (id: string) => {
    await axios
      .patch(`https://bookstore-z52r.onrender.com/server/views/${id}`, {
        ip: ip,
      })
      .then((res) => {
        return null;
      });
  };

  // random background-color
  const arr = [ "purple", "orange", "green", "blue", "black"];

  React.useEffect(() => {
    getalldata();
  });

  return (
    <Container>
      {loading ? <p>Loading Books...</p> : null}

      {searchdata.length >= 1 ? (
        <>
          {/* search */}
          {searchdata.map((data) => (
            <Card to={`/book/${data._id}/details`}>
              <ImageHolder>
                <Image src={data.coverImage} />
                <Cont>
                  <Button>{data.category}</Button>

                  <TitleHold>
                    <Title>{data.title}</Title>
                  </TitleHold>
                </Cont>
              </ImageHolder>

              <DownPart>
                <Hold>
                  <AuthorImage bg={arr[1]}>{data.authorImage}</AuthorImage>
                  <AuthName>{data.author}</AuthName>
                </Hold>
                <ViewIcon>
                  <AiOutlineEye />
                  <span>{data.views.length}</span>
                </ViewIcon>
              </DownPart>
              <Hovercard>
                <Up>
                  <Hoverimage></Hoverimage>
                  <span></span>
                  <Midtext>+ View</Midtext>
                </Up>
                <Down>
                  <Hoverimagecard />
                  <Hoverimagecard />
                  <Hoverimagecard />
                </Down>
              </Hovercard>
            </Card>
          ))}
        </>
      ) : (
        <>
          {/* get all books */}
          {books.map((data) => (
            <Card
              onClick={() => {
                if (data.views.includes(ip)) {
                  return null;
                } else {
                  useip(data._id);
                }
              }}
              to={`/book/${data._id}/details`}
            >
              <ImageHolder>
                <Image src={data.coverImage} />
                <Cont>
                  <Button>{data.category}</Button>

                  <TitleHold>
                    <Title>{data.title}</Title>
                  </TitleHold>
                </Cont>
              </ImageHolder>

              <DownPart>
                <Hold>
                  <AuthorImage bg={arr[Math.floor(Math.random() * arr.length)]}>
                    {data.authorImage}
                  </AuthorImage>
                  <AuthName>{data.author}</AuthName>
                </Hold>
                <ViewIcon>
                  <AiOutlineEye />
                  <span>{data.views.length}</span>
                </ViewIcon>
              </DownPart>
              <Hovercard>
                <Up>
                  <Hoverimage>{data.authorImage}</Hoverimage>
                  <span>{data.author}</span>
                  <Midtext>{data.views.length} views</Midtext>
                </Up>
                <Down>
                  <Hoverimagecard src={data.coverImage} />
                  <Hoverimagecard src={data.coverImage} />
                  <Hoverimagecard src={data.coverImage} />
                </Down>
              </Hovercard>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default BookList;

const Hoverimage = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: purple;
  border-radius: 50%;
`;

const Up = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
const Midtext = styled.div`
  padding: 15px 26px;
  background-color: gray;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  color: white;
  font-size: 16px;
`;

const Hovercard = styled.div`
  height: 200px;
  width: 450px;
  border-radius: 5px;
  z-index: 1;
  position: absolute;
  display: none;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: all 360ms;
`;

const DownPart = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  :hover ~ ${Hovercard} {
    display: flex;
  }
  margin-top: 15px;
`;
const Down = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: black;
`;
const Hoverimagecard = styled.img`
  width: 100px;
  border-radius: 7px;
  margin-right: 10px;
  height: 100px;
  background-color: gray;
`;

const P = styled.p``;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  margin-top: 30px;
  padding-bottom: 30px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Card = styled(Link)`
  text-decoration: none;
  width: 300px;
  position: relative;
  margin: 15px;
`;

const Title = styled.div`
  position: absolute;
  bottom: 10px;
  margin-left: 10px;
`;
const TitleHold = styled.div`
  height: 145px;
  width: 100%;
  position: relative;
  opacity: 0;
  color: white;
  transition: all 360ms;
  background-image: linear-gradient(
    0deg,
    rgba(65, 73, 73, 1) 0%,
    rgba(253, 187, 45, 0) 100%
  );

  :hover {
    opacity: 1;
  }
`;
const ImageHolder = styled.div`
  height: 200px;
  width: 100%;
  background-color: silver;
  position: relative;
  cursor: pointer;
`;

const Cont = styled.div`
  position: absolute;
  height: 200px;
  width: 100%;
  top: 0;
  cursor: pointer;
`;
const Button = styled.div`
  margin: 10px;
  background-color: #302f3e;
  width: 130px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  border-radius: 20px;
`;

const Hold = styled.div`
  display: flex;
  align-items: center;
`;
const AuthorImage = styled.div<{ bg: string }>`
  background-color: ${(bg) => bg.bg};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 50%;
`;
const AuthName = styled.div`
  margin-left: 6px;
  font-weight: 600;
  font-size: 16px;
`;
const ViewIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
`;
