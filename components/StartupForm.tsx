"use client"
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validations'
import { z } from 'zod';

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("***hello world***");

    const handleFormSubmit = async (prevState, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get("link") as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);
            console.log('formvalue', formValues);

        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);
                return { ...prevState, error: 'validation failed', status: "ERROR" }
            }
            return {
                ...prevState,
                error: 'An unexpected error has occured',
                status: 'ERROR'
            }

        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" });


    return (
        <>
            <form action={formAction} className='startup-form' >
                <label htmlFor='title' className='start-form_label'>
                    Title
                </label>
                <Input
                    id='title'
                    name='title'
                    className='startup-form_input'
                    required
                    placeholder='Startup Title'
                />
                {errors.title && <p className='startup-form_error'>{errors.title}</p>}
                <label htmlFor='description' className='start-form_label'>
                    Description
                </label>
                <Input
                    id='description'
                    name='description'
                    className='startup-form_textarea'
                    required
                    placeholder='Startup Description'
                />
                {errors.description && <p className='startup-form_error'>{errors.description}</p>}
                <label htmlFor='category' className='start-form_label'>
                    Category
                </label>
                <Input
                    id='category'
                    name='category'
                    className='startup-form_input'
                    required
                    placeholder='Startup category'
                />
                {errors.category && <p className='startup-form_error'>{errors.category}</p>}
                <label htmlFor='link' className='start-form_label'>
                    Image URL
                </label>
                <Input
                    id='link'
                    name='link'
                    className='startup-form_input'
                    required
                    placeholder='Startup Image url'
                />
                {errors.link && <p className='startup-form_error'>{errors.link}</p>}
                <div data-color-mode='light'>
                    <label htmlFor='pitch' className='start-form_label'>
                        Pitch
                    </label>
                    <MDEditor
                        value={pitch}
                        onChange={(value) => setPitch(value as string)}
                        id='pitch'
                        preview='edit'
                        height={300}
                        style={{ borderRadius: 20, overflow: 'hidden' }}
                        textareaProps={{
                            placeholder: "Briefly describe your idea and what problem it solved"
                        }}
                    />
                    {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
                </div>
                <Button
                    type='submit'
                    className='startup-form_btn text-white'
                    disabled={isPending}
                >
                    {isPending ? "Submitting..." : "Submit your pitch"}
                    <Send className='size-6 ml-2' />
                </Button>
            </form>

        </>
    )
}

export default StartupForm