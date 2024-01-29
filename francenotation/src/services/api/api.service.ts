import axios from "axios";
import { AddressObject } from "../../apiResponseType/apiResponse";

const URL = "http://localhost:3001";

export const initiateCycle = async (
  address: string,
): Promise<AddressObject> => {
  const jsonData = { address };
  // Initiate the DB request, associate user with addresse ID, return address object
  const responseGetrate = await axios.post(
    `${URL}/ratingcontroller/getrate`,
    jsonData,
    {
      withCredentials: true,
    }
  );
  const addressObject: AddressObject = responseGetrate.data;
  return addressObject;
};
export const fetchData = async (
  addressObject: AddressObject,
  enpoint: string
) => {
  try {
    // Try to get the information about the addresse if it as allready been searched
    console.log(
      `${URL}ratingcontroller${enpoint}/${addressObject.properties.id}`
    );
    let fetchGeorisqueResponse = await axios.get(
      `${URL}/ratingcontroller${enpoint}/${addressObject.properties.id}`,
      { withCredentials: true }
    );
    console.log(fetchGeorisqueResponse.data);

    // If it's a new addresse fetch the data to this specific address
    if (!fetchGeorisqueResponse.data) {
      fetchGeorisqueResponse = await axios.post(
        `${URL}/ratingcontroller${enpoint}`,
        addressObject,
        { withCredentials: true }
      );
    }
    return fetchGeorisqueResponse.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const testAPI = async (): Promise<AddressObject> => {
  const responseGetrate = await axios.get(`${URL}/ratingcontroller/testnewapi`);
  const addressObject: AddressObject = responseGetrate.data;
  return addressObject;
};

