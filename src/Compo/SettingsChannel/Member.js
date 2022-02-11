import React, {useState,useEffect} from 'react';

export default function Member({acces,refreshAcces}){
  const [member, setMember] = useState({});

  useEffect(() => {
    getMember(acces.id_user);
  }, []);

  const getMember = (idMember) => {
    const header = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          localStorage.getItem("token") +
          " " +
          localStorage.getItem("userID"),
      },
    };
    fetch(process.env.REACT_APP_API_URL + "auth/" + idMember, header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setMember(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const removeAcces = () => {
    const header = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          localStorage.getItem("token") +
          " " +
          localStorage.getItem("userID"),
      },
      body: JSON.stringify({idUser: acces.id_user}),
    };
    fetch(process.env.REACT_APP_API_URL + "acces/force/" + acces.id_channel, header)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        refreshAcces();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const addAdmin = () => {
    const header = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("token") +
            " " +
            localStorage.getItem("userID"),
        },
        body: JSON.stringify({idUser: acces.id_user}),
      };
      fetch(process.env.REACT_APP_API_URL + "acces/op/" + acces.id_channel, header)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
            refreshAcces();
        })
        .catch((err) => {
          console.error(err);
        });
  }
  const removeAdmin = () => {
    const header = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("token") +
            " " +
            localStorage.getItem("userID"),
        },
        body: JSON.stringify({idUser: acces.id_user}),
      };
      fetch(process.env.REACT_APP_API_URL + "acces/deop/" + acces.id_channel, header)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
            refreshAcces();
        })
        .catch((err) => {
          console.error(err);
        });
  }

  return (
    <div>
      <p>{member.name}</p>
      <input type="submit" className="submitButt" value="Kick du channel" onClick={removeAcces}/>
      {acces.op === 0 ? (
        <input type="submit" className="submitButt" value="Op" onClick={addAdmin}/>
      ) : (
        <input type="submit" className="submitButt" value="DeOP" onClick={removeAdmin} />
      )}
    </div>
  );
}