import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  Switch,
  HStack,
  VStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Center,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { BsBrightnessHighFill } from "react-icons/bs";
import { ImBrightnessContrast } from "react-icons/im";
import {
  FiHome,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";
import { BsPersonPlusFill } from "react-icons/bs";
import { GiLaurelsTrophy } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

import { RiMap2Fill } from "react-icons/ri";
import { MdHomeFilled } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DJMenuChanger,
  UserMenuChanger,
  themeChanger,
} from "../Redux/AppReducer/Action";
import { logout } from "../Redux/AuthReducer/Action";
import "./UserNav.css";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import axios from "axios";

const LinkItems = [
  { name: "Home", icon: FiHome, url: "/user" },
  { name: "My Dj Bookings", icon: BsPersonPlusFill, url: "/user/book" },
  {
    name: "Search",
    icon: BsPersonPlusFill,
    url: "/user/mydjbookings",
  },
  { name: "Messages", icon: FiUser, url: "/user/messages" },
  { name: "Booking Request", icon: GiLaurelsTrophy, url: "" },
  { name: "Dj's", icon: FaHandshake, url: "/user/alldjs" },
  { name: "Favourite", icon: FiSettings, url: "/user/favourites" },
];
const dropdownImages = [
  {
    img: "/assets/profile/profile.png",
    name: "Avinash Dhanani",
    date: "15 February at 02:50 AM",
  },
  {
    img: "/assets/profile/profile.png",
    name: "Avinash Dhanani",
    date: "15 February at 02:50 AM",
  },
  {
    img: "/assets/profile/profile.png",
    name: "Avinash Dhanani",
    date: "15 February at 02:50 AM",
  },
  {
    img: "/assets/profile/profile.png",
    name: "Avinash Dhanani",
    date: "15 February at 02:50 AM",
  },
];
export function UserNav({ children, tabName }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useSelector((store) => store.app.theme);
  return (
    <Box
      h={window.innerHeight}
      bgColor={theme === "light" ? "white" : "#0A0F1B"}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box bgColor={theme === "light" ? "white" : "#0A0F1B"}>
        <MobileNav onOpen={onOpen} tabName={tabName} />
        <Box
          pl={{ base: 0, md: 60 }}
          p="4"
          bgColor={theme === "light" ? "white" : "#0A0F1B"}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout(toast));
    navigate("/login");
  };
  const theme = useSelector((store) => store.app.theme);
  const menu = useSelector((store) => store.app.userMenu);
  const dispatch = useDispatch();

  const updateNav = (pos) => {
    dispatch(UserMenuChanger({ name: pos }));
  };

  const handleTheme = () => {
    if (theme === "light") {
      dispatch(themeChanger({ theme: "dark" }));
    } else {
      dispatch(themeChanger({ theme: "light" }));
    }
  };
  return (
    <Box
      position={"fixed"}
      top={"0"}
      left={"0"}
      bgColor={theme === "light" ? "#F6F6F6" : "#111823"}
      w={{ base: "full", md: 60 }}
      h={"100%"}
      zIndex={"99999"}
      {...rest}
    >
      <Flex
        mb={"10px"}
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <SimpleGrid
          ml={"40px"}
          mt={"10px"}
          fontSize={"20px"}
          borderRadius={"50%"}
          bgColor={"#007AFF"}
          columns={"2"}
          color={"white"}
          p={"10px 25px"}
          pl={"27px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text>S</Text>
          <Text>P</Text>
          <Text>O</Text>
          <Text>T</Text>
        </SimpleGrid>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex
        h={window.innerHeight - 100}
        justifyContent={"space-between"}
        direction={"column"}
      >
        <Box>
          {[
            { name: "Home", icon: MdHomeFilled, url: "/user" },
            {
              name: "My Dj Bookings",
              icon: BsPersonPlusFill,
              url: "/user/book",
            },
            {
              name: "Search",
              icon: RiMap2Fill,
              url: "/user/mydjbookings",
            },
            { name: "Messages", icon: FiUser, url: "/user/messages" },
            { name: "Booking Request", icon: GiLaurelsTrophy, url: "" },
            { name: "Dj's", icon: FaHandshake, url: "/user/alldjs" },
            { name: "Favourite", icon: FiSettings, url: "/user/favourites" },
          ].map((link) => (
            <Link to={link.url}>
              <Box
                key={link.name}
                p={"7px 0px"}
                fontSize={"16px"}
                w={"100%"}
                bgColor={menu === link.name ? "rgba(0, 134, 255, 0.05)" : ""}
                onClick={() => updateNav(link.name)}
                pl={"20px"}
                color={
                  menu === link.name
                    ? "#0086FF"
                    : theme === "light"
                    ? "#787878"
                    : "#B9B9B9"
                }
                _hover={{
                  color: "#0086FF",
                  bgColor: "rgba(0, 134, 255, 0.05)",
                }}
              >
                <Flex justifyContent={"space-between"}>
                  <Flex gap={"20px"}>
                    <Center>
                      <link.icon />
                    </Center>
                    <Center>{link.name}</Center>
                  </Flex>
                  {menu === link.name ? (
                    <Box
                      roundedLeft={"xl"}
                      w={"10px"}
                      h={"50px"}
                      bgColor={"#0086FF"}
                    ></Box>
                  ) : (
                    <Box h={"50px"}></Box>
                  )}
                </Flex>
              </Box>
            </Link>
          ))}
        </Box>
        <Box>
          <Flex
            pl={"20px"}
            gap={"20px"}
            alignItems={"center"}
            color={theme === "light" ? "#787878" : "#B9B9B9"}
            cursor={"pointer"}
          >
            <Center fontSize={"20px"}>
              <IoLogOut />
            </Center>
            <Text cursor={"pointer"} onClick={handleLogout}>
              Logout
            </Text>
          </Flex>
          <Box
            cursor={"pointer"}
            w={"max-content"}
            mt={"15px"}
            ml={"20px"}
            mb={"40px"}
            p={"5px 8px"}
            border={"1px solid white"}
            bgColor={theme === "light" ? "#ededed" : "#0A0F1B"}
            borderRadius={"20px"}
            onClick={() => handleTheme()}
          >
            <Flex
              gap={"5px"}
              direction={theme === "light" ? "row-reverse" : "row"}
            >
              <Text color={theme === "light" ? "black" : "white"}>
                {theme === "light" ? "Light " : "Dark"} Mode
              </Text>
              <Box p={"4px"} borderRadius={"50%"} bgColor={"white"}>
                {theme === "light" ? (
                  <BsBrightnessHighFill />
                ) : (
                  <ImBrightnessContrast />
                )}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, tabName, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const token = useSelector((store) => store.auth.token);
  const [dataFavorite, setDataFavorite] = useState([]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/user/user-favourite-dj`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("avinash dhanani");
    axios(config)
      .then(function (response) {
        if (response?.data?.data?.djData) {
          console.log(response.data);
          let tmpData = response.data.data.djData.map((item) => {
            let date = new Date(item.updatedAt);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? "0" + minutes : minutes;
            let strTime = hours + ":" + minutes + " " + ampm;
            let monthString =
              date.getDate() +
              " " +
              monthNames[date.getMonth()] +
              " at " +
              strTime;
            item.createdAt = monthString;
            return item;
          });
          setDataFavorite(tmpData);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const fetchFavDjs = () => {};
  const handleProfile = () => {
    navigate("/user/profile");
  };
  const user = useSelector((store) => store.auth.user);
  const theme = useSelector((store) => store.app.theme);

  return (
    <Flex
      position={"sticky"}
      top={"0"}
      zIndex={"999"}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bgColor={theme === "light" ? "white" : "#0A0F1B"}
      color={theme === "light" ? "black" : "white"}
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      {tabName == "UserNearbyDJS" && (
        <div>
          <Dropdown>
            <Dropdown.Toggle
              style={{ width: "250px", border: "none" }}
              className={
                theme === "light"
                  ? "light-theme-favorites "
                  : "dark-theme-favorites"
              }
            >
              Favorites
            </Dropdown.Toggle>

            <Dropdown.Menu
              className={
                theme === "light"
                  ? "light-theme-favorites favorites-dropdown"
                  : "dark-theme-favorites favorites-dropdown"
              }
              style={{
                maxHeight: "500px",
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              {dataFavorite.map((dropdownImage, index) => (
                <Dropdown.Item
                  href="#"
                  key={index}
                  style={{
                    minWidth: "300px",
                  }}
                  className={
                    theme == "light"
                      ? "light-theme-favorites dropdown-dj-usernav"
                      : "dark-theme-favorites dropdown-dj-usernav"
                  }
                >
                  <div
                    style={{
                      width: "50px",
                      overflow: "hideen",
                      borderRadius: "50px",
                    }}
                  >
                    <img
                      src={dropdownImage.djId.profileImage}
                      style={{ borderRadius: "100px" }}
                    />
                  </div>
                  <div className="name-dd-usernav">
                    <h1 style={{ fontWeight: "20px" }}>
                      {dropdownImage.djId.djName + "  "}
                    </h1>
                    <p>{dropdownImage.createdAt}</p>
                  </div>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user.profileImage} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.djName}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              zIndex={"999"}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              {/* <MenuDivider /> */}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default UserNav;
