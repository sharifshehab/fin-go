import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { TbLoader3 } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const { handleRegister, setUserNameAndPhoto } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        setLoading(true);

        let balance;
        formData.accountType === "user" ? balance = 40 : balance = 100000;

        const data = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            nid: formData.nid,
            pin: formData.pin,
            accountType: formData.accountType,
            initialBalance: balance
        }
        console.log(data);

        try {
            const userCredential = await handleRegister(formData.email, formData.pin + "!");
            const user = userCredential.user;
            console.log(user);
            await setUserNameAndPhoto(formData.name);
            const res = await axiosPublic.post("/users", data);
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
                                placeholder="Your name"
                                className="peer outline-none px-4 py-3 w-full bg-white text-black transition-colors duration-300"
                                {...register("name", {
                                    required: "Name is required",
                                    maxLength: {
                                        value: 15,
                                        message: "maximum character length is 15",
                                    },
                                })}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="email"
                                placeholder="Your Email"
                                className="peer outline-none px-4 py-3 w-full bg-white text-black transition-colors duration-300"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                    </div>{/* first-row */}

                    <div className="flex sm:flex-row flex-col items-center gap-[20px]">
                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="tel"
                                placeholder="Phone Number"
                                className="peer outline-none px-4 py-3 w-full bg-white text-black transition-colors duration-300"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\+\d{1,4}\d{6,12}$/,
                                        message: "Enter a valid phone number with country code (e.g., +8801709370961)",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <span className="text-red-500 text-sm">
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="nid"
                                placeholder="NID Number"
                                className="peer outline-none px-4 py-3 w-full bg-white text-black transition-colors duration-300"
                                {...register("nid", {
                                    required: "NID is required",
                                })}
                            />
                            {errors.nid && (
                                <span className="text-red-500 text-sm">
                                    {errors.nid.message}
                                </span>
                            )}
                        </div>
                    </div>{/* second-row */}


                    <div className="flex sm:flex-row flex-col items-center gap-[20px]">

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

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <select
                                className="peer outline-none px-4 py-3 w-full bg-white text-black transition-colors duration-300"
                                {...register("accountType", {
                                    required: "Account type is required",
                                })}
                            >
                                <option value="" disabled selected>
                                    Select Account Type
                                </option>
                                <option value="agent">Agent</option>
                                <option value="user">User</option>
                            </select>
                            {errors.accountType && (
                                <span className="text-red-500 text-sm">
                                    {errors.accountType.message}
                                </span>
                            )}
                        </div>
                        
                    </div>{/* third-row */}

                    <button type="submit"
                        className={`py-2.5 px-6 bg-white text-[#2176ff] mt-[10px] w-full`}>{loading ? (
                            <TbLoader3
                                size={22}
                                className="animate-spin text-[#2176ff]"
                            />
                        ) : (
                            "Register"
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

export default Register;