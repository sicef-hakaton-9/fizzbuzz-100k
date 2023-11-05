import { ChangeEvent, useState, FormEvent } from "react";
import styles from "./Sign-in.module.scss";
import Input from "../../components/html/input/Input";
import { useNavigate } from "react-router";
import { ApiService } from "../../services/api.service";
import { setAuthorizationHeader } from "../../common/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user.reducer";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { data, ok } = await ApiService.signInAsync({ email, password });

    if (ok) {
      localStorage.setItem(ApiService.IdentityKey, data.authorisation.token);
      setAuthorizationHeader();

      dispatch(setUser(data.user));

      navigator("/account")
    }
  };

  return (
    <main className={styles.sign_in}>
      <h1
        style={{
          fontSize: "2.4rem",
          fontWeight: "500",
          marginTop: "5rem",
          marginBottom: "2rem",
        }}
      >
        Dobrodošli u Smart Ride
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          onChange={handleEmailChange}
          value={email}
          placeholder="Unesite Vaš email"
        />
        <Input
          value={password}
          onChange={handlePasswordChange}
          bottom={true}
          type="password"
          placeholder="Unesite Vašu šifru"
        />
        <button type="submit" className={styles.sign_in__btn}>
          Login
        </button>
      </form>
      <span className={styles.sign_in__create}>
        Ukoliko nemate nalog, možete ga kreirati na{" "}
        <span
          style={{ color: "var(--purple)" }}
          onClick={() => {
            navigator("/create-acc");
          }}
        >
          kreiraj nalog
        </span>
        .
      </span>
    </main>
  );
};
export default SignIn;
