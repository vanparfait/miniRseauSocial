import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import AjouterPublication from "./components/AjouterPublication";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [publications, setPublications] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion");
    } else {
      axios.get("http://localhost:3000/publications").then((res) => {
        //console.log(res.data);
        setPublications(res.data);
        //console.log(publications);
      });
    }
  }, []);

  return (
    <Box bgcolor={"#eef4ff"}>
      <NavBar />
      <AjouterPublication />

      <Box width={"60%"} margin={"auto"}>
        {publications.map((publication) => (
          <Box
            key={publication.id}
            width={"100%"}
            bgcolor={"#fff"}
            borderRadius={"4px"}
            marginBottom={3}
            padding={2}
          >
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Avatar src={publication.photoUtilisateur} />
              <Typography color={"red"}>{publication.auteur}</Typography>
            </Stack>
            <Typography>{publication.messagePublication}</Typography>
            <img
              src={publication.URLImage}
              style={{ width: "100%", borderRadius: 5 }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
