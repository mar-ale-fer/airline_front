import { getLoggedUser } from "./getLoggedUser";
import { Typography } from "@mui/material";
import oxigent_logo from "../../images/oxigent_logo.png";

export const UserProfile = (props: any) => {
  return (
    <div>
      <Typography>
        <img src={oxigent_logo} width="200px" alt="Logo Instituto" />
      </Typography>
    </div>
  );
};
