import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Calendar as CalendarLucide, Eye, EyeOff, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "../../lib/schema";
import { useCreateUserMutation } from "../../features/api/apiSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function RegisterForm() {
  const [CreateUser] = useCreateUserMutation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const watchRole = form.watch("role");

  // const {
  //   register,
  //   formState: { errors, isLoading },
  // } = useForm<z.infer<typeof RegisterSchema>>({
  //   mode: "onBlur",
  //   resolver: zodResolver(RegisterSchema),
  // });

  // console.log({ errors });

  // async function onSubmit(body: z.infer<typeof RegisterSchema>) {
  //   try {
  //     const response = await CreateUser(body);
  //     if (response.error) {
  //     } else {
  //       alert(response.data.message);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    console.log({ data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Are you a teacher, student or parent?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* <SelectLabel>Roles</SelectLabel> */}
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {watchRole == "parent" && (
          <FormField
            control={form.control}
            name="neurodiversity"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel>Neurodiversity</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Does your child belong to any of the below" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <SelectLabel>Roles</SelectLabel> */}
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Autism">Autism</SelectItem>
                    <SelectItem value="ADHD">
                      Attention Deficit Hyperactivity Disorder (ADHD)
                    </SelectItem>
                    <SelectItem value="Dyscalculia">Dyscalculia</SelectItem>
                    <SelectItem value="Dyslexia">Dyslexia</SelectItem>
                    <SelectItem value="Dyspraxia">
                      Dyspraxia, or Developmental Coordination Disorder (DCD)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-0.5">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarLucide className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1940-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* {parent && disabilities} */}
        {/* <select
            aria-required="true"
            {...register("license")}
            aria-invalid={!!errors?.license}
            aria-errormessage="License key"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue={""}
          >
            <option value="" disabled>
              --Select License key--
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select> */}
        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>License key</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0.5 relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type={showPassword ? "text" : "password"}
                />
              </FormControl>
              <button
                className={`absolute right-2 bottom-2.5 ${
                  isLoading && "text-border"
                }`}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={16} className="h-4 w-4 opacity-50" />
                ) : (
                  <Eye size={16} className="h-4 w-4 opacity-50" />
                )}
              </button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-0.5 relative">
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type={showPassword ? "text" : "password"}
                />
              </FormControl>
              <button
                className={`absolute right-2 bottom-2.5 ${
                  isLoading && "text-border"
                }`}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={16} className="h-4 w-4 opacity-50" />
                ) : (
                  <Eye size={16} className="h-4 w-4 opacity-50" />
                )}
              </button>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full">
          {isLoading && (
            <span className="mr-2 animate-spin">
              <Loader />
            </span>
          )}
          Register
        </Button>
      </form>
    </Form>
  );
}
