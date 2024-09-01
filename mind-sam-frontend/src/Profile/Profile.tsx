  import { useParams } from "react-router";
import Navigation from "../navigation/Navigation";
  export default  function Profile() {
let username=useParams();
  return (
 <>
 <Navigation/>
 <h1>Welcome {username.username}</h1>
 </>
  );
}