import { apiCallBegin } from "../../reduxstates/Auth/authActions";
import { addcartsAuthUser } from "../../reduxstates/Cart/cartReduer";

const createNewCart = (dispatch, userid) => {
  if (!localStorage.getItem("auth")) return;
  dispatch(
    apiCallBegin({
      url: "/store/cart/",
      method: "post",
      data: {
        condition: "ND",
        ordercondition: "NO",
        customer: userid,
        products: [],
      },
      headers: {
        Authorization: `JWT ${JSON.parse(localStorage.getItem("auth")).access}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      onSuccess: (response) => {
        if (response.status == 201) {
          dispatch(
            apiCallBegin({
              url: `store/cart/?customer=${userid}&date=&ordercondition=NO&ordering=-id`,
              onSuccess: (response) => {
                if (response?.data?.length > 0) {
                  dispatch(addcartsAuthUser(response.data[0]));
                }
              },
              headers: {
                Authorization: `JWT ${
                  JSON.parse(localStorage.getItem("auth")).access
                }`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              onError: "onError",
            })
          );
        }
      },
    })
  );
};

export default createNewCart;
