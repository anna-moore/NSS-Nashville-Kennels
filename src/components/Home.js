import React from "react";
import { PropsAndState } from "./PropsAndState";
import { CustomerContext } from "./customer/CustomerProvider";

export const Home = () => {
  const { customers, getCustomers } = useContext(CustomerContext);
  let userName;

  useEffect(() => {
    getCustomers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const userId = localStorage.getItem("kennel_customer");
  const user = customers.find((c) => c.id === parseInt(userId));
  if (!user) {
    userName = "user";
  } else {
    userName = user.name;
  }

  return (
    <>
      <h2>Nashville Kennels</h2>
      <small>Loving care when you're not there.</small>

      <address>
        <div>Visit Us at the Nashville North Location</div>
        <div>500 Puppy Way</div>
      </address>
      <PropsAndState yourName={"Isabel"} />
    </>
  );
};
