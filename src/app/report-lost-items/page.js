"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from "next-auth/react";

const Page = () => {
    const { data: session } = useSession();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const today = new Date().toISOString().substring(0, 10);
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const timeNow = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
    });

    const validateFileType = (value) => {
        if (!value || value.length === 0) return true;
        const file = value[0];
        return file.type.startsWith('image/') || 'Only image files are allowed';
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            const formData = new FormData();
            
            // Append all form data
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('regno', data.regno);
            formData.append('date', data.date);
            formData.append('time', data.time);
            formData.append('description', data.description);
            
            // Append the image file
            if (data.image[0]) {
                formData.append('image', data.image[0]);
            }

            const response = await fetch('http://localhost:4200/api/report-lost', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Submission failed');
            }

            const result = await response.json();
            console.log('Submission successful:', result);
            setSubmitSuccess(true);
            // Reset form here if needed
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitError(error.message || 'Failed to submit report');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='text-black'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col w-[35vw] mx-auto mt-5 gap-2 bg-white rounded-lg px-6 py-4'>
                    <div className='text-2xl font-semibold text-center'>Report Lost Items</div>

                    {submitSuccess && (
                        <div className="bg-green-100 text-green-700 p-2 rounded-md">
                            Report submitted successfully!
                        </div>
                    )}

                    {submitError && (
                        <div className="bg-red-100 text-red-700 p-2 rounded-md">
                            {submitError}
                        </div>
                    )}

                    {/* Name */}
                    <div className='flex flex-col justify-center gap-0.5'>
                        <span className='text-sm'>Name </span>
                        <input
                            value={session?.user?.name || ''}
                            {...register("name")}
                            readOnly
                            className='border border-gray-500 cursor-not-allowed h-8 rounded-md px-2 bg-blue-50 text-[1rem]'
                        />
                    </div>

                    {/* Email */}
                    <div className='flex flex-col justify-center gap-0.5'>
                        <span className='text-sm'>Email </span>
                        <input
                            value={session?.user?.email || ''}
                            {...register("email")}
                            readOnly
                            className='border border-gray-500 cursor-not-allowed h-8 rounded-md px-2 bg-blue-50 text-[1rem]'
                        />
                    </div>

                    {/* Registration Number */}
                    <div className='flex flex-col justify-center gap-0.5'>
                        <span className='text-sm'>Registration Number 
                            <span className='text-red-500 text-lg'> *</span>
                        </span>
                        <input
                            {...register("regno", { required: true })}
                            className='border border-gray-500 h-8 rounded-md px-2 bg-blue-50 text-[1rem]'
                            placeholder='Enter Your Registration Number'
                        />
                        {errors.regno && <span className='text-red-500 text-sm'>This field is required</span>}
                    </div>

                    {/* Date of Lost */}
                    <div className='flex flex-col justify-center gap-0.5'>
                        <span className='text-sm'>
                            Lost Date
                            <span className='text-red-500 text-lg'> *</span>
                        </span>
                        <input
                            {...register("date", { required: true })}
                            value={today}
                            min={fifteenDaysAgo}
                            max={today}
                            className='border border-gray-500 h-8 rounded-md px-2 bg-blue-50 text-[1rem]'
                            type='date'
                        />
                        {errors.date && <span className='text-red-500 text-sm'>This field is required</span>}
                    </div>

                    {/* Time of Lost */}
                    <div className='flex flex-col justify-center gap-0.5'>
                        <span className='text-sm'>
                            Lost Time
                            <span className='text-red-500 text-lg'> *</span>
                        </span>
                        <input
                            {...register("time", { required: true })}
                            className='border border-gray-500 h-8 rounded-md px-2 bg-blue-50 text-[1rem]'
                            type='time'
                            defaultValue={timeNow}
                        />
                        {errors.time && <span className='text-red-500 text-sm'>This field is required</span>}
                    </div>

                    {/* Image Upload */}
                    <div className='flex flex-col justify-center gap-0.5'>
                        <span className='text-sm'>
                            Upload Image
                            <span className='text-red-500 text-lg'> *</span>
                        </span>
                        <input
                            {...register("image", {
                                required: true,
                                validate: validateFileType
                            })}
                            className='border border-gray-500 h-8 rounded-md px-2 bg-blue-50 text-[1rem]'
                            type='file'
                            accept='image/*'
                        />
                        {errors.image && (
                            <span className='text-red-500 text-sm'>
                                {errors.image.message || "Image is required"}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div className='flex flex-col justify-center gap-0.5'>
                        <span className='text-sm'>
                            Description 
                            <span className='text-red-500 text-lg'> *</span>
                        </span>
                        <textarea
                            {...register("description", {
                                required: "Description is required",
                                minLength: {
                                    value: 20,
                                    message: "Description should be at least 20 characters"
                                }
                            })}
                            className='border border-gray-500 rounded-md px-2 bg-blue-50 text-[1rem] p-2'
                            rows={2}
                            placeholder='Description about Lost Item'
                        />
                        {errors.description && (
                            <span className='text-red-500 text-sm'>
                                {errors.description.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`bg-blue-500 px-4 py-2 rounded-sm w-35 mx-auto font-medium text-white ${
                            submitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        }`}
                    >
                        {submitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;