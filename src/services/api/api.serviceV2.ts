import axios from "axios";
import { AddressObject } from "../../apiResponseType/apiResponse";
import axiosInstance from "../../utils/axiosInstance";

const URL = process.env.REACT_APP_API_URL;
export class ServiceAPIV2 {
  static async wakeUpServer() {
    try {
      await axios.get(`${URL}/v2/fetch/ping`, {
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
      const responseGetrate = await axiosInstance.post(
        `${URL}/v2/fetch/address`,
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

  static async fetchData(addressObject: AddressObject, enpoint: string) {
    try {
      // Try to get the information about the addresse if it as allready been searched
      console.log(`ratings : ${URL}/v2/fetch${enpoint}/`);
      let fetchedResponse = await axios.post(
        `${URL}/v2/fetch${enpoint}`,
        addressObject,
        { withCredentials: true }
      );
      return fetchedResponse.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
