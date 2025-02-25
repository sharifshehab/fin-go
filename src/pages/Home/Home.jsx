import ApprovalRequests from "./ApprovalRequests/ApprovalRequests";
import Hero from "./Hero/Hero";
import SendMoney from "./SendMoney/SendMoney";

const Home = () => {
    return (
        <main>
            <Hero></Hero>
            <SendMoney></SendMoney>
            <ApprovalRequests></ApprovalRequests>
        </main>
    );
};

export default Home;