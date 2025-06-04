import { useForm } from "react-hook-form";
import "./../styles/Note.form.css";

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string }) => void;
}

const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const submitHandler = handleSubmit((data) => {
    onSubmit(data);
    reset();
  });

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="inputGroup">
        <label htmlFor="title" className="label">
          Заголовок
        </label>
        <input
          id="title"
          {...register("title", {
            required: "Заголовок обовʼязковий",
            minLength: {
              value: 3,
              message: "Мінімум 3 символи",
            },
          })}
          className="input"
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div className="inputGroup">
        <label htmlFor="content" className="label">
          Текст нотатки
        </label>
        <textarea
          id="content"
          {...register("content", {
            required: "Текст обовʼязковий",
            minLength: {
              value: 5,
              message: "Мінімум 5 символів",
            },
          })}
          className="textarea"
        />
        {errors.content && <p className="error">{errors.content.message}</p>}
      </div>

      <button type="submit" className="submitButton">
        Додати нотатку
      </button>
    </form>
  );
};

export default NoteForm;
