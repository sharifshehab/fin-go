import { useState } from "react";
import { TbLoader3 } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const { handleEmailLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        setLoading(true);
        
        const res = await axiosPublic.get(`/users?info=${encodeURIComponent(formData.info)}`);
        const userInfo = res.data.email;

        try {
            const userCredential = await handleEmailLogin(userInfo, formData.pin + "!");
            const user = userCredential.user;
            reset();
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section
            className="w-full h-screen lg:flex-row flex items-center gap-[30px] flex-col justify-between bg-[#2176ff] p-[40px]">

            {/* form area */}
            <form className="lg:w-[60%] w-full" onSubmit={handleSubmit(onSubmit)}>

                <div className="lg:w-[80%] w-full mx-auto space-y-5">
                    <div className="text-white">
                        <h1 className="text-[1.7rem] font-[600] leading-[35px]">Logo with slogan</h1>
                    </div>

                    <div className="flex sm:flex-row flex-col items-center gap-[20px]">
                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="text"
                                placeholder="Mobile Number/Email"
                                className="peer outline-none px-4 py-3 w-full bg-white text-black transition-colors duration-300"
                                {...register("info", {
                                    required: "Mobile Number/Email is required",
                                })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="password"
                                placeholder="Pin"
                                className="peer outline-none px-4 py-3 w-full bg-white text-black transition-colors duration-300"
                                {...register("pin", {
                                    required: "Pin is required",
                                    maxLength: {
                                        value: 5,
                                        message: "Pin must be exactly 5 digits",
                                    },
                                    minLength: {
                                        value: 5,
                                        message: "Pin must be exactly 5 digits",
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Pin must be a number",
                                    },
                                })}
                            />
                            {errors.pin && (
                                <span className="text-red-500 text-sm">
                                    {errors.pin.message}
                                </span>
                            )}
                        </div>
                    </div>{/* first-row */}

                    <button type="submit"
                        className={`py-2.5 px-6 bg-white text-[#2176ff] mt-[10px] w-full`}>{loading ? (
                            <TbLoader3
                                size={22}
                                className="animate-spin text-[#2176ff]"
                            />
                        ) : (
                            "Login"
                        )}
                    </button>
                </div>
            </form>

            {/*  image  */}
            <div className="">
                <img src="https://i.ibb.co/h7rjVJS/Image.png" alt="image" className="w-full" />
            </div>
        </section>
    );
};

export default Login;