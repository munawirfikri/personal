import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '../schemas/contactSchema';
import { useLoading } from '../hooks/useLoading';
import Spinner from './Spinner';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  submitLabel?: string;
}

const ContactForm = ({ onSubmit, submitLabel = 'Send Message' }: ContactFormProps) => {
  const { isLoading, withLoading } = useLoading();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    await withLoading(async () => {
      await onSubmit(data);
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <input
          {...register('name')}
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-primary transition-colors"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-primary transition-colors"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Your Message"
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-primary transition-colors resize-none"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Spinner size="sm" />
            <span>Sending...</span>
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};

export default ContactForm;
