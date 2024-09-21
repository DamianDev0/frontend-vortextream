import { useState } from "react";
import { useAuth } from "../../../../auth/auth.provider";
import LabelComponent from "../../../public/registerPage/components/label.component";
import ButtonMenuUserComponent from "./buttonMenuUser.component";
import useAlert from "./alert.component";

const EmailView = () => {
  const [newEmail, setNewEmail] = useState("");

  const auth = useAuth();
  const user = auth.getUser();
  const token = auth.getToken();

  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newEmail) {
      showAlert("error", "Email is required", "Please enter a valid email");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/changeemail/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: newEmail,
          }),
        }
      );

      const resToJson = await res.json();
      console.log(resToJson);

      if (!res.ok) throw new Error("Cannot change email");

      showAlert("success", "Success email sent", "The email has been changed successfully"); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="containerViews">
      <form onSubmit={handleSubmit} className="container-form-changeEmail-view">
        <h1 className="title-changeEmail-view">Change your Email</h1>
        <LabelComponent
          disable={true}
          className="input-menuUser-profileView"
          valueDefault={user.email}
          type="text"
          value={user.username}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          placeholder="New Email"
          type="text"
          onChange={(e) => setNewEmail(e.target.value)}
          value={newEmail}
        />

        <ButtonMenuUserComponent
          size="150"
          height="40"
          fontweight="1"
          text="Submit"
          type="submit"
        />
      </form>
    </div>
  );
};

export default EmailView;
