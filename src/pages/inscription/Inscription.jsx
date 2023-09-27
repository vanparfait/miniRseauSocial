import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Inscription = () => {
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(errors);
    if (data.motDePasse != data.motDePasseConfirmation)
      toast.error("Les mots de passe ne correspondent pas");
    else {
      axios
        .get(
          `http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            toast.error("Ce mot de passe existe deja");
          } else {
            axios
              .post("http://localhost:3000/utilisateurs", data)
              .then((res) => {
                console.log(res);
                toast.success("Inscription reussie");
                reset();
                navigate("/connexion");
              })
              .catch((err) => {
                console.log(err);
                toast.error("une erreur est survenue");
              });
          }
        });
    }
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      backgroundColor={"#f5f5f5"}
      //   backgroundColor={"red"}
    >
      <Box
        width={400}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
        }}
      >
        <Typography variant="h5">Inscription</Typography>
        <form
          style={{
            marginTop: 4,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre nom"
              variant="outlined"
              fullWidth
              size="small"
              {...register("nomUtilisateur", {
                required: "Veuillez saisir un nom",
                minLength: {
                  value: 5,
                  message: "Veuillez saisir un nom de plus de 5 caracteres",
                },
                maxLength: 14,
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre adresse email"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              {...register("mailUtilisateur", {
                required: "Veuillez saisir votre adresse email",
                // pattern: /^[A-Za-z]+$/i,
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("motDePasse", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 5,
                  message:
                    "Veuillez saisir un mot de passe  de plus de 5 caracteres",
                },
                maxLength: 14,
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez confirmer votre mot de passe"
              variant="outlined"
              fullWidth
              type="password"
              size="small"
              {...register("motDePasseConfirmation", {
                required: "Veuillez confirmer votre mot de passe",
                minLength: {
                  value: 5,
                  message: "Veuillez saisir un nom de plus de 5 caracteres",
                },
                maxLength: 14,
              })}
            />
          </Stack>
          <Button type="submit" sx={{ marginTop: 2 }} variant="contained">
            Inscription
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default Inscription;
