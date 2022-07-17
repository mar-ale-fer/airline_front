import AppBar from "./access/AppBar";
import { useQuery } from "@apollo/client";
import { GET_USER_FROM_TOKEN_RV } from "./access/userSessionReactVarQuery";
const App = () => {
  const { data: user_from_token_data } = useQuery(
    GET_USER_FROM_TOKEN_RV
  );

  return(
  <div
    style={{
      backgroundColor: "#00000008",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <AppBar variant="temporary" user_from_token={user_from_token_data}/>
  </div>
)};

export default App;