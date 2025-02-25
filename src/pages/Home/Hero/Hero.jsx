import img from "../../../assets/images/hero.jpg";

const Hero = () => {
    return (
        <section>
            <img src={img} alt="" className="w-full block" />
        </section>
    );
};

export default Hero;