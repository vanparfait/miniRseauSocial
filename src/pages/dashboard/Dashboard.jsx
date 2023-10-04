import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Box } from "@mui/material";
//import { DeleteIcon } from "@mui/icons-material/Delete";
import AjouterPublication from "./components/AjouterPublication";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "./components/CardPub";

const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion");
    }
  }, [navigate]);

  const {
    data: publications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["publications"],
    queryFn: () =>
      axios.get("http://localhost:3000/publications").then((res) => res.data),
    onError: (error) => console.log(error),
  });

  // Vérifiez si isLoading est vrai (chargement en cours)
  if (isLoading) {
    return <div>...Chargement</div>;
  }

  // Vérifiez si data est défini avant de l'utiliser
  if (!publications) {
    return <div>Les données ne sont pas disponibles.</div>;
  }

  // Triez les publications ici
  let publicationTrier = publications.sort((a, b) => {
    return new Date(b.datePublication) - new Date(a.datePublication);
  });

  return (
    <Box bgcolor={"#eef4ff"}>
      <NavBar />
      <AjouterPublication />

      <Box width={"60%"} margin={"auto"} marginTop={4}>
        {publicationTrier.map((publication) => (
          <Card key={publication.id} publication={publication} />
        ))}
      </Box>
    </Box>
  );
};
export default Dashboard;

// const Dashboard = () => {
//   const navigate = useNavigate();

//   //const [publications, setPublications] = useState([]);

//   useEffect(() => {
//     if (!localStorage.getItem("utilisateur")) {
//       navigate("/connexion");
//     }
//   });

//   const queryClient = useQueryClient();
//   const {
//     data: publications,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["publications"],
//     queryFn: () =>
//       axios.get("http://localhost:3000/publications").then((res) => res.data),
//     onerror: (error) => console.log(error),
//   });

//   //console.log(query);
//   console.log(publications);

//   if (isLoading) <div>...Chargement</div>;

//   let publicationTrier = publications.sort((a, b) => {
//     return new Date(b.datePublication) - new Date(a.datePublication);
//   });

//   return (
//     <Box bgcolor={"#eef4ff"}>
//       <NavBar />
//       <AjouterPublication />

//       <Box width={"60%"} margin={"auto"} marginTop={4}>
//         {publications &&
//           publicationTrier.map((publication) => (
//             <Card key={publication.id} publication={publication} />
//           ))}
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;
// else {
//   axios.get("http://localhost:3000/publications").then((res) => {
//     //console.log(res.data);
//     setPublications(res.data);
//     //console.log(publications);
//   });
// }
