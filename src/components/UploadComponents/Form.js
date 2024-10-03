// FormDialog.js
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

const FormDialog = ({
  triggerLabel,
  title,
  onSubmit,
  fields,
  register,
  handleFileInput,
  buttonText = "Create",
}) => {
  return (
    <Dialog>
      <DialogTrigger className="border p-2 rounded-lg">
        {triggerLabel}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          {fields.map((field, idx) => (
            <div
              key={idx}
              className={`flex  max-md:flex-col justify-between gap-5 mb-4 items-center'}`}
            >
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "textarea" ? (
                <Textarea {...register(field.name)} required={field.required} />
              ) : field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="bg-black w-full rounded-sm border-opacity-60"
                  required={field.required}
                >
                  {field?.options?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  type={field.type}
                  {...register(field.name)}
                  accept={field.accept}
                  onChange={
                    field.type === "file"
                      ? (e) => handleFileInput(e.target.files)
                      : undefined
                  }
                  required={field.required}
                />
              )}
            </div>
          ))}
          <Button className="bg-[#4b99e6] hover:bg-[#4a8bed]" type="submit">
            {buttonText}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
