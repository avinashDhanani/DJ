import React from "react";
import djBanner from "../../Assets/SliderImages/dj_of_wek_background.png";
import {
  Box,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useToast,
  Modal,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import "./DjOfTheWeek.css";
import { useState, useEffect } from "react";
import Group_like from "../../Assets/SliderImages/Group_like.png";
import axios from "axios";

function DjOfTheWeek() {
  const myStyle = {
    backgroundImage: `url(${djBanner})`,
    height: "350px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const token = useSelector((store) => store.auth.token);
  const [dataFavorite, setDataFavorite] = useState([]);

  useEffect(() => {
    axios(config)
      .then(function (response) {
        if (response?.data?.data?.djOfWeek) {
          console.log(
            "response?.data?.data?.djOfWeek : ",
            response?.data?.data?.djOfWeek
          );
          setDataFavorite(response.data.data.djOfWeek);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  var config = {
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL}/api/djOfWeek/display-dj-of-week`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    <div style={myStyle}>
      {dataFavorite.length > 0 && (
        <div className="container-slider">
          <div>
            <img
              src={dataFavorite[0].image}
            />
          </div>
          <div>
            <div>DJ OF THE WEEK</div>
            <h1>{dataFavorite[0].djName}</h1>
            <div>
              <img src={Group_like} />
              <div>{dataFavorite[0].totalEventDuration}</div>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default DjOfTheWeek;
