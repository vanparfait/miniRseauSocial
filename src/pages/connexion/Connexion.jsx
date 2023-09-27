import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Connexion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("utilisateur")) {
      navigate("/");
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .get(
        `http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}&motDePasse=${data.motDePasse}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
          navigate("/");
          toast.success("Connexion reussie");
        } else {
          toast.error("les identifiants sont incorrects");
        }
      });
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
        <Typography variant="h5">Connexion</Typography>
        <form
          style={{
            marginTop: 4,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={2}>
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
          </Stack>
          <Button type="submit" sx={{ marginTop: 2 }} variant="contained">
            Connexion
          </Button>
          <Typography paddingTop={2}>
            Voulez-vous creer un compte ?{" "}
            <Link to="/inscription">Cliquez ici</Link>{" "}
          </Typography>
        </form>
      </Box>
    </Stack>
  );
};

export default Connexion;
