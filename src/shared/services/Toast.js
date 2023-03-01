import { toast } from "react-toastify";

export const ToastMessageService = {

    errorNotification : (message) => {
        toast.error(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          icon: false,
          className: 'toast-message-error'
        });
    },
    
    successNotification : (message) => {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "toast-message-success",
            icon: false
        });
    }
}
