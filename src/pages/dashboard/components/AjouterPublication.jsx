import { Button, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AjouterPublication = () => {
  const user = JSON.parse(localStorage.getItem("utilisateur"));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const useQuery = useQueryClient();

  const mutation = useMutation({
    mutationFn: (pub) => {
      return axios.post("http://localhost:3000/publications", pub);
    },
    onError: (error) => toast.error("Une erreur est survenue:" + error),
    onSuccess: () => {
      reset();
      useQuery.invalidateQueries("publications");
      toast.success("Publication ajoutee avec succes");
    },
  });

  const onSubmit = (data) => {
    console.log(errors);
    // console.log(data);

    const publication = {
      ...data,
      idUtilsateur: user.id,
      datePublication: new Date(),
      likePublication: 0,
      auteur: user.nomUtilisateur,
    };
    mutation.mutate(publication);

    //   axios
    //     .post("http://localhost:3000/publications", publication)
    //     .then((res) => {
    //       console.log(res.data);
    //       toast.success("publication ajoutee");
    //       reset();
    //     })
    //     .catch((err) => console.log(`une erreur est survenue : ${err}`));
  };

  return (
    <Stack width={"60%"} margin={"auto"} marginTop={4}>
      <h1>Ajouter une publication</h1>
      <form style={{ marginTop: 6 }} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            id="filled-basic"
            label="Veuillez partager votre publication "
            variant="outlined"
            fullWidth
            // size="small"
            type="text"
            multiline
            rows={4}
            {...register("messagePublication", {
              required: "Veuillez saisir votre message",
              minLength: {
                value: 5,
                message: "Veuillez saisir une URL de plus de cinq caracteres",
              },
            })}
          />
          <TextField
            id="filled-basic"
            label="Veuillez saisir l'URL de votre image "
            variant="outlined"
            fullWidth
            //size="small"
            type="url"
            {...register("URLImage", {
              required: "Veuillez saisir votre URL",
              minLength: {
                value: 15,
                message: "Veuillez saisir une URL de plus de cinq caracteres",
              },
              maxLength: 2000,
            })}
          />
          <Button type="submit" variant="contained">
            Publier
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default AjouterPublication;
