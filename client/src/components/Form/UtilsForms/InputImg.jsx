import { Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import { showSuccess } from "../../../utils/Notifications";

const InputImg = ({ name, title, cb, values }) => {
  
  const handleImageChange = async (event, cb) => {
    const image = event.currentTarget.files[0];

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dynh9dt8");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/duy9efu8j/image/upload",
          formData
        );
        showSuccess("Imagen cargada con exito");
        cb(name, response.data.url);
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };
  return (
    <div className="mb-4">
      <div class="relative">
        <input
          type="file"
          accept="image/png, image/jpeg, image/svg+xml"
          id={name}
          name={name}
          class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          onChange={(event) => handleImageChange(event, cb, values)}
        />
        <label
          for="image"
          class="cursor-pointer bg-blue-500 text-white p-2 rounded-md"
        >
          {title}
        </label>
      </div>

      <br />
      <div>
        <img className="rounded-xl" src={values.image} alt="" />
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  );
};

export default InputImg;
