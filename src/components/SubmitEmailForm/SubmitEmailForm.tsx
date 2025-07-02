'use client'

import { useEffect} from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
};

const SubmitEmailForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>()

    useEffect(() => {

    }, []);

    const onSubmit = async (data: FormData) => {
        console.log("Отправка данных:", data);
        await fetch('/api/confirmation', { method: 'POST', body: JSON.stringify(data) });
        reset();
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm p-4 border rounded">
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                type="email"
                {...register("email", {
                    required: "Email обязателен",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Неверный формат email",
                    },
                })}
                className="w-full border px-2 py-1 rounded"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Отправить
            </button>
        </form>
    )
}

export default SubmitEmailForm;