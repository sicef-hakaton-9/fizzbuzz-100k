import { ChangeEvent, useState, FormEvent } from "react";
import styles from "./CreateAcc.module.scss";
import Input from "../../components/html/input/Input";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {
  BsFill1CircleFill,
  BsFill2CircleFill,
  BsFill3CircleFill,
} from "react-icons/bs";

const CreateAcc: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("+381 ");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [privacy, setPrivacy] = useState<boolean>(false);
  const navigator = useNavigate();

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePrivacyChange = () => {
    setPrivacy((prev) => !prev);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigator("/choose-subscription");
  };

  return (
    <main>
      <h1
        className="choose-plan"
        style={{
          textAlign: "center",
          marginTop: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        Registracija korisnika
      </h1>

      <div className="status-bar">
        <div className="status">
          <BsFill1CircleFill color="#d70466" size={25} />
          <p>Registracija</p>
        </div>
        <div className="status">
          <BsFill2CircleFill color="#444" size={25} />
          <p>Odabir plana</p>
        </div>
        <div className="status">
          <BsFill3CircleFill color="#444" size={25} />
          <p>Plaćanje</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.createAcc}>
        <Input
          type="text"
          top={true}
          onChange={handleFirstNameChange}
          value={firstName}
          placeholder="Unesite Vaše ime"
        />
        <Input
          type="text"
          onChange={handleLastNameChange}
          value={lastName}
          placeholder="Unesite Vaše prezime"
        />
        <Input
          type="email"
          onChange={handleEmailChange}
          value={email}
          placeholder="Unesite Vaš email"
        />
        <Input
          type="text"
          onChange={handlePhoneNumberChange}
          value={phoneNumber}
          placeholder="Unesite Vaš broj telefona"
        />
        <Input
          value={password}
          onChange={handlePasswordChange}
          bottom={true}
          type="password"
          placeholder="Unesite Vašu šifru"
        />
        <div className={styles.createAcc__checkboxGroup}>
          <Input
            type="checkbox"
            checked={privacy}
            onChange={handlePrivacyChange}
            className={styles.createAcc__checkBox}
          />
          <span>
            Klikom na ovo dugme, prihvatate naše{" "}
            <span style={{ color: "var(--purple)" }}>uslove korišćenja</span>.
          </span>
        </div>
        <button type="submit" className={styles.createAcc__btn}>
          Kreiraj nalog
        </button>
      </form>
    </main>
  );
};
export default CreateAcc;
