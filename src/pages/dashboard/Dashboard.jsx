import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import AjouterPublication from "./components/AjouterPublication";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const navigate = useNavigate();

  const [publications, setPublications] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion");
    }
  }, []);

  const queryClient = useQueryClient();
  const {
    publications: data,
    onerror,
    isLoading,
  } = useQuery({
    queryKey: ["publications"],
    queryFn: () =>
      axios.get("http://localhost:3000/publications").then((res) => res.data),
    onerror: (error) => console.log(error),
  });

  //console.log(query);
  if (isLoading) <div>...Chargement</div>;

  let publicationTrier = publications.sort(
    (a, b) => new Date(b.datePublication) - new Date(a.datePublication)
  );

  return (
    <Box bgcolor={"#eef4ff"}>
      <NavBar />
      <AjouterPublication />

      <Box width={"60%"} margin={"auto"} marginTop={4}>
        {publications &&
          publicationTrier.map((publication) => (
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
// else {
//   axios.get("http://localhost:3000/publications").then((res) => {
//     //console.log(res.data);
//     setPublications(res.data);
//     //console.log(publications);
//   });
// }
