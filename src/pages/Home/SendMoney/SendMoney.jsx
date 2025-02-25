import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import useBalance from "../../../API/useBalance";

const SendMoney = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [credentials, , refetch] = useBalance();

    const onSubmit = async (formData) => {
        const intAmount = parseInt(formData.amount);

        const data = {
            senderEmail: user.email,
            receiverNumber: formData.phone,
            amount: intAmount,
            transactionFee: intAmount > 100 ? 5 : 0,
            date: new Date().toISOString().replace('T', ' ').slice(0, 19)
        }


        if (credentials.initialBalance < intAmount) {
            return console.log('Insufficient balance');
        }
        
        try {
            const res = await axiosPublic.patch(`/users?phone=${encodeURIComponent(formData.phone)}&amount=${intAmount}&user=${user.email}`);

            if (res.data.receiverUpdate.modifiedCount > 0 && res.data.senderUpdate.modifiedCount > 0) {
        
                const transactionRes = await axiosPublic.post('/transactions', data);

                if (transactionRes.data.insertedId) {
                    const transactionNote = await axiosPublic.get(`/transactions/${transactionRes.data.insertedId}`);

                    console.log(transactionNote.data);
                }

                refetch();
                reset();
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    return (
        <div className="my-20">
            <form className="lg:w-[60%] w-full" onSubmit={handleSubmit(onSubmit)}>

                <div className="lg:w-[80%] w-full mx-auto space-y-5">
                    <div className="text-white">
                        <h1 className="text-[1.7rem] font-[600] leading-[35px]">Logo with slogan</h1>
                    </div>

                    <div className="flex sm:flex-row flex-col items-center gap-[20px]">
                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="text"
                                placeholder="Phone number"
                                className="peer outline-none px-4 py-3 w-full bg-white text-black transition-colors duration-300"
                                {...register("phone", {
                                    required: "Receiver phone number is required",
                                })}
                            />
                            {errors.phone && (
                                <span className="text-red-500 text-sm">
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="number"
                                placeholder="Amount"
                                className="peer outline-none px-4 py-3 w-full bg-white text-black transition-colors duration-300"
                                {...register("amount", {
                                    required: "Amount is required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 50,
                                        message: "Minimum sending money is 50 taka",
                                    },
                                })}
                            />
                            {errors.amount && (
                                <span className="text-red-500 text-sm">
                                    {errors.amount.message}
                                </span>
                            )}
                        </div>
                    </div>{/* first-row */}

                    <button type="submit"
                        className={`py-2.5 px-6 bg-white text-[#2176ff] mt-[10px] w-full`}>Send Mony
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendMoney;