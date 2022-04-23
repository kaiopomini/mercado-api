import { createConnection } from "typeorm";

const reconnectTimeSeconds = 0;
const reconnectTimeMinutes = 5;
const reconnectTimeHours = 0;
const reconnectTime =
  1000 *
  (reconnectTimeSeconds +
    reconnectTimeMinutes * 60 +
    reconnectTimeHours * 60 * 60);

let counter = 1;

const connect = async () => {
  try {
    await createConnection();
    console.log("Db connection has been established.");
  } catch (e) {
    console.log("Failed to connect to db!");
    console.log(
      `trying to reconnect in ${reconnectTimeHours}h ${reconnectTimeMinutes}min ${reconnectTimeSeconds}sec... ${counter}`
    );
    counter++;
    
    setTimeout(() => connect(), reconnectTime);
  }
};

connect();
