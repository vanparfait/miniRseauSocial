import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { DeleteIcon } from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const Card = ({ publication }) => {
  const useQuery = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.get(`http://localhost:3000/publications/${id}`);
    },
    onError: (error) => toast.error("Une erreur est survenue:" + error),
    onSuccess: () => {
      useQuery.invalidateQueries("publications");
      toast.success("Publication supprimee avec succes");
    },
  });

  const supprimerPublication = (id) => {
    mutation.mutate(id);
  };

  return (
    <Box
      // key={publication.id}
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
      <IconButton
        arial-aria-label="delete"
        onClick={() => supprimerPublication(publication.id)}
      >
        <DeleteIcon />
      </IconButton>
      <img
        src={publication.URLImage}
        style={{ width: "100%", borderRadius: 5 }}
      />
    </Box>
  );
};

export default Card;
