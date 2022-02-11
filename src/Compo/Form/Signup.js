import TextInput from './TextInput';
import EmailInput from './EmailInput';
import PassInput from './PassInput';


export default function Signup(){
  const handleSubmit = (e) => {
    e.preventDefault();

    const value = {
      name: e.target["name"].value,
      last_name: e.target["lastName"].value,
      email: e.target["email"].value,
      password: e.target["password"].value,
    };
    const header = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    };
    fetch(process.env.REACT_APP_API_URL + "auth/signup", header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("error");
        } else {
          fetch(process.env.REACT_APP_API_URL + "auth/login", header)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              localStorage.setItem("userID", res.userID);
              localStorage.setItem("token", res.token);
              window.location = "/";
            })
            .catch((err) => {
              console.error(err.message);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form action="#" onSubmit={handleSubmit} className="formLog">
      <EmailInput />
      <div className="row">
        <TextInput valueInput={"name"} nameInput={"Prénom"} />
        <TextInput valueInput={"lastName"} nameInput={"Nom"} />
      </div>
      <PassInput />
      <input type="submit" className="submitButt" />
    </form>
  );
}

