import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries"

// Home page
const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const info = data || [];
  const users = info.users;

  return (
    <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {users.map((user) => (<li key={user._id}>{user.name}</li>))}
            </ul>
          )}
    </div>
  );
};

export default Home;
