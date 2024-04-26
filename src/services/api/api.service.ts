import axios from "axios";
import { AddressObject } from "../../apiResponseType/apiResponse";
import { FrontGroupDataValue } from "../../pages/typeResultJson/ResultRespons";
import axiosInstance from "../../utils/axiosInstance";

const URL = process.env.REACT_APP_API_URL;
export class ServiceAPI {
  static async wakeUpServer() {
    try {
      await axios.get(`${URL}/frontdata/ping`, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  static async initiateCycle(address: string): Promise<AddressObject> {
    try {
      const jsonData = { address };
      console.log(`${URL}/ratingcontroller/getrate`);
      // Initiate the DB request, associate user with addresse ID, return address object
      const responseGetrate = await axiosInstance.post(
        `${URL}/ratingcontroller/getrate`,
        jsonData,
        {
          withCredentials: true,
        }
      );
      const addressObject: AddressObject = responseGetrate.data;

      return addressObject;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async initialFetchData(addressObject: AddressObject, enpoint: string) {
    try {
      // Try to get the information about the addresse if it as allready been searched
      console.log(
        `${URL}/ratingcontroller${enpoint}/${addressObject.properties.id}`
      );
      let fetchGeorisqueResponse = await axios.get(
        `${URL}/ratingcontroller${enpoint}/${addressObject.properties.id}`,
        { withCredentials: true }
      );

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
  }

  static async fetchGroupNotation(
    addressObject: AddressObject
  ): Promise<FrontGroupDataValue> {
    try {
      console.log(
        "URL :",
        `${URL}/frontdata/getrates/${addressObject.properties.id}`
      );
      const response = await axios.get(
        `${URL}/frontdata/getrates/${addressObject.properties.id}`,

        { withCredentials: true }
      );
      console.log("response.data", response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async fetchGroupJson(addressObject: AddressObject, endpoint: string) {
    try {
      console.log(
        `${URL}/frontdata/${endpoint}/${addressObject.properties.id}`
      );
      const response = await axios.get(
        `${URL}/frontdata/${endpoint}/${addressObject.properties.id}`,

        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
