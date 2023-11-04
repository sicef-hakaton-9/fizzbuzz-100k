import Header from "../components/AccountPage/Header/Header";
import Card from "../components/AccountPage/Card/Card";
import CurrentPlan from "../components/AccountPage/CurrentPlan/CurrentPlan";

const AccoutPage: React.FC = () => {
  return (
    <>
      <main>
        <Header />
        <Card />
        <CurrentPlan />
        {/* /plans */}
      </main>
    </>
  );
};
export default AccoutPage;
